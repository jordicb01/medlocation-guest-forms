import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware, customSession } from "better-auth/plugins";
import { db } from "@/src/db";
import * as schema from "@/src/db/schema"
import { eq } from 'drizzle-orm';


export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema
    }),
    emailAndPassword: {
        enabled: true
    },
    hooks: {
        after: createAuthMiddleware(async (ctx) => {
            if (ctx.path === "/sign-up/email") {
                const newSession = ctx.context.newSession;
                const body = ctx.body;

                if (!newSession?.user?.id || !body?.metadata) return;

                const { firstName, lastName } = body.metadata;

                await db.update(schema.user)
                    .set({
                        firstName,
                        lastName,
                    })
                    .where(eq(schema.user.id, newSession.user.id));
            }
        })
    },
    plugins: [
        customSession(async ({ session, user }) => {
            if (!session?.userId) {
                return { session, user };
            }

            // Fetch the user from your database using Drizzle
            const dbUser = await db.query.user.findFirst({
                where: eq(schema.user.id, session.userId),
            });

            // If the user isn't found in the DB, return the default session
            if (!dbUser) {
                return { session, user };
            }

            // Return the session with the user object now containing your database fields
            return {
                session,
                user: {
                    ...user,
                    firstName: dbUser.firstName,
                    lastName: dbUser.lastName,
                },
            };
        }),
    ],
});
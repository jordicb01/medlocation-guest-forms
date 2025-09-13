import { db } from "@/src/db";
import { booking } from "@/src/db/schema";
import { createTRPCRouter, baseProcedure } from "@/src/trpc/init";

export const bookingsRouter = createTRPCRouter({
    getMany: baseProcedure.query(async () => {
        const data = await db
            .select()
            .from(booking);

        return data
    })
})
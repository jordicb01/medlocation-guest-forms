import {
    pgTable,
    text,
    timestamp,
    boolean,
    integer,
    uuid
} from "drizzle-orm/pg-core";

/* ──────────────────────────────────────────────
   AUTH (Better-Auth defaults – unchanged)
   ────────────────────────────────────────────── */

export const user = pgTable("user", {
    id: text("id").primaryKey(),
    firstName: text("first_name"),
    lastName: text("last_name"),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").$defaultFn(() => false).notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
    updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull()
});

export const session = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" })
});

export const account = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull()
});

/* ──────────────────────────────────────────────
   ORGANIZATION / MULTI-USER
   ────────────────────────────────────────────── */

export const company = pgTable("company", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});

export const companyMember = pgTable("company_member", {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id")
        .notNull()
        .references(() => company.id, { onDelete: "cascade" }),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    role: text("role").default("member"), // owner, admin, member
    invitedAt: timestamp("invited_at").defaultNow(),
    joinedAt: timestamp("joined_at")
});

/* ──────────────────────────────────────────────
   STRIPE BILLING
   ────────────────────────────────────────────── */

export const plan = pgTable("plan", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),                      // Starter, Pro...
    description: text("description"),
    priceMonthly: integer("price_monthly").notNull(),  // cents
    priceYearly: integer("price_yearly").notNull(),
    stripePriceIdMonthly: text("stripe_price_id_monthly").notNull(),
    stripePriceIdYearly: text("stripe_price_id_yearly").notNull(),
    createdAt: timestamp("created_at").defaultNow()
});

export const subscription = pgTable("subscription", {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id")
        .notNull()
        .references(() => company.id, { onDelete: "cascade" }),
    planId: uuid("plan_id").references(() => plan.id),
    stripeCustomerId: text("stripe_customer_id").notNull(),
    stripeSubscriptionId: text("stripe_subscription_id").notNull(),
    status: text("status").notNull().default("active"), // active, canceled, past_due
    currentPeriodStart: timestamp("current_period_start"),
    currentPeriodEnd: timestamp("current_period_end"),
    cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});

/* ──────────────────────────────────────────────
   PMS CORE
   ────────────────────────────────────────────── */

export const property = pgTable("property", {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id")
        .notNull()
        .references(() => company.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    address: text("address"),
    mossosCode: text("mossos_code"),                  // Mossos establishment code
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});

export const icalLink = pgTable("ical_link", {
    id: uuid("id").defaultRandom().primaryKey(),
    propertyId: uuid("property_id")
        .notNull()
        .references(() => property.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    createdAt: timestamp("created_at").defaultNow()
});

/* ──────────────────────────────────────────────
   BOOKINGS & GUESTS
   ────────────────────────────────────────────── */

export const booking = pgTable("booking", {
    id: uuid("id").defaultRandom().primaryKey(),
    propertyId: uuid("property_id")
        .notNull()
        .references(() => property.id, { onDelete: "cascade" }),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date").notNull(),
    source: text("source"),                           // airbnb, manual, etc.
    contactPhone: text("contact_phone").notNull(),
    contactEmail: text("contact_email").notNull(),
    contactAddress: text("contact_address").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});

export const guest = pgTable("guest", {
    id: uuid("id").defaultRandom().primaryKey(),
    bookingId: uuid("booking_id")
        .notNull()
        .references(() => booking.id, { onDelete: "cascade" }),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    nationality: text("nationality"),
    documentType: text("document_type"),              // passport, DNI…
    documentNumber: text("document_number"),
    dateOfBirth: timestamp("date_of_birth"),
    createdAt: timestamp("created_at").defaultNow()
});

/* ──────────────────────────────────────────────
   MOSSOS SUBMISSIONS
   ────────────────────────────────────────────── */

export const mossosSubmission = pgTable("mossos_submission", {
    id: uuid("id").defaultRandom().primaryKey(),
    bookingId: uuid("booking_id")
        .notNull()
        .references(() => booking.id, { onDelete: "cascade" }),
    submittedAt: timestamp("submitted_at"),
    status: text("status").default("pending"),        // pending, success, failed
    confirmationNumber: text("confirmation_number"),
    receiptUrl: text("receipt_url"),                 // link to PDF/screenshot
    createdAt: timestamp("created_at").defaultNow()
});


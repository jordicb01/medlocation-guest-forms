import type { auth } from "@/src/lib/auth";

// Infer the Session type from your main auth configuration
export type Session = typeof auth.$Infer.Session;

// It's also handy to export the User type separately
export type User = Session["user"];

// export interface AuthenticatedData {
//     session: Session;
//     user: User;
// }
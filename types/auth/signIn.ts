import { z } from "zod";

// Sign In form fields
export interface SignInFormFields {
    email: string;
    password: string;
}

// Sign In validation schema
export const signInSchema = z.object({
    email: z.string()
        .min(1, { message: "Email is required" })
        .min(5, { message: "Email is too short" })
        .max(100, { message: "Email is too long" })
        .email({ message: "Please enter a valid email" })
        .trim()
        .toLowerCase(),
    password: z.string()
        .min(1, { message: "Password is required" })
        .max(100, { message: "Password is too long" }),
});

// Schema type for form validation
export type SignInSchema = typeof signInSchema;
import { z } from "zod";

const capitalizeFirstChar = (input: string) => {
    return input
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

// Sign Up form fields
export interface SignUpFormFields {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// Sign Up validation schema
export const signUpSchema = z.object({
    firstName: z.string()
        .min(2, { message: "Your First Name must be at least 2 characters long" })
        .max(100, { message: "Your First Name is too long" })
        .transform((str) => capitalizeFirstChar(str)),
    lastName: z.string()
        .min(2, { message: "Your Last Name must be at least 2 characters long" })
        .max(100, { message: "Your Last Name is too long" })
        .transform((str) => capitalizeFirstChar(str)),
    phoneNumber: z.string()
        .regex(/^[0-9]{10}$/, { message: "Phone number must be 10 digits" }),
    email: z.string()
        .min(5, { message: "Email is too short" })
        .max(100, { message: "Email is too long" })
        .email({ message: "Please enter a valid email" })
        .trim()
        .toLowerCase(),
    password: z.string()
        .min(1, { message: "Password is required" })
        .max(100, { message: "Password is too long" }),
    confirmPassword: z.string()
        .min(1, { message: "Password is required" })
        .max(100, { message: "Password is too long" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

// Schema type for form validation
export type SignUpSchema = typeof signUpSchema;
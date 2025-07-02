import { z } from "zod";

// Email validation (used in both Login and ResetP)
export const emailSchema = z.object({
    email: z.string()
        .email({ message: "Invalid email address" })
        .max(43, { message: "Invalid email address" }),
});

// Password validation (used in Login and ResetP)
export const passwordSchema = z.object({
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(50, { message: "Password is too long" })
        .refine((val) => /[a-z]/.test(val), {
            message: "Password must contain at least one lowercase letter",
        })
        .refine((val) => /[A-Z]/.test(val), {
            message: "Password must contain at least one uppercase letter",
        })
        .refine((val) => /[0-9]/.test(val), {
            message: "Password must contain at least one number",
        })
        .refine((val) => /[^\w\s]/.test(val), {
            message: "Password must contain at least one special character",
        }),
});

// Login schema
export const loginSchema = emailSchema.merge(passwordSchema);

// Reset password schema (OTP + new password + confirm password)
export const resetPasswordSchema = emailSchema.extend({
    otp: z.string()
        .length(6, { message: "OTP must be 6 digits" }),
    resetPass: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(50, { message: "Password is too long" })
        .refine((val) => /[a-z]/.test(val), {
            message: "Must contain at least one lowercase letter",
        })
        .refine((val) => /[A-Z]/.test(val), {
            message: "Must contain at least one uppercase letter",
        })
        .refine((val) => /[0-9]/.test(val), {
            message: "Must contain at least one number",
        })
        .refine((val) => /[^\w\s]/.test(val), {
            message: "Must contain at least one special character",
        }),
    confPass: z.string(),
}).refine((data) => data.resetPass === data.confPass, {
    path: ["confPass"],
    message: "Passwords do not match",
});


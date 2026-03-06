import * as z from "zod"

export const appointmentSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name must be at most 50 characters."),
  
  email: z
    .string()
    .email("Invalid email address."),
    
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number.")
    // The tutorial uses a regex to ensure international format (e.g., +1234567890)
});
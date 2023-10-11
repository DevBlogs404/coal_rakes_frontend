import * as z from "zod";

export const validationSchema = z
  .object({
    firstName: z.string().min(1, "First Name is Required").max(20),
    lastName: z.string().min(1, "Last Name is Required").max(20),
    email: z.string().email("Invalid E-mail").min(1, "E-mail is required"),
    password: z
      .string()
      .min(1, "Password is Required")
      .min(8, "Password must be 8 characters"),
    phone: z.string().min(1, "Phone Number is Required").max(10),
    confirmPassword: z.string().min(1, "Password is Required"),
    role: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not macth",
  });

export const loginValidation = z.object({
  email: z.string().email("Invalid E-mail").min(1, "E-mail is required"),
  password: z
    .string()
    .min(1, "Password is Required")
    .min(8, "Password must be 8 characters"),
});

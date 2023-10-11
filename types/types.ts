import { validationSchema, loginValidation } from "@/utils/validationScehma";
import * as z from "zod";

export type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: string;
};

export type formSchema = z.infer<typeof validationSchema>;

export type loginSchema = z.infer<typeof loginValidation>;

// enum Role {
//   admin = "admin",
//   user = "user",
// }

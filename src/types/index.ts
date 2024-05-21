import { z } from "zod";
import { getImageValidator } from "@/utils/helper";
import { message } from "@/database/schema";

const imageValidator = getImageValidator();

// signin schema form
export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }).max(20),
});

// signup schema form
export const signUpFormSchema = z
  .object({
    email: z.string().email(),
    firstName: z.string().min(1, { message: "First Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    studentNumber: z.string().min(1, { message: "CrewIPN is required" }).max(7),
    dept: z.string().min(1, { message: "Your nationality is required" }).max(15),
    address: z.string().min(1, { message: "Please input your address" }).max(50),
    password: z
      .string()
      .min(8, {
        message: "Confirm Password must be at least 8 characters long",
      })
      .max(20, {
        message: "Confirm Password must be at most 20 characters long",
      })
      .refine((password) => /[A-Z]/.test(password), {
        message: "Password must contain at least one uppercase letter.",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "Password must contain at least one lowercase letter.",
      })
      .refine((password) => /[0-9]/.test(password), {
        message: "Password must contain at least one number.",
      })
      .refine(
        (password) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password),
        {
          message: "Password must contain a least one special character.",
        }
      ),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm Password is required" })
      .max(20),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const errandSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  payment: z.string().min(1, ("You must include an amount"))
    .refine((payment) => /[0-9]/.test(payment), {
      message: "Payment is only valid in numbers",
    }),
});

export const transactionSchema = z.object({
  errandId: z.string().min(1),
  receiverAccountNumber: z.string().min(1, { message: "This is a required field" }),
  senderAccountNumber: z.string().min(1, { message: "This is a required field" }),
  amount: z.string().min(1, { message: "This is a required field" })
    .refine((amount) => /[0-9]/.test(amount), {
      message: "Payment is only valid in numbers",
    }),
})
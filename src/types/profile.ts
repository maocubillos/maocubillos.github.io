import { z } from "zod";

export const contactSchema = z.object({
  label: z.string().min(1, "Label is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email").or(z.literal("")).optional(),
});

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  contacts: z.array(contactSchema).min(1, "At least one contact is required"),
});

export type Contact = z.infer<typeof contactSchema>;
export type Profile = z.infer<typeof profileSchema>;

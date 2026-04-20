import { z } from "zod";

export const adminSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.enum(["admin", "user"], { required_error: "Role is required" }),
  // Optional fields for showcasing UI controls
  permissions: z.array(z.string()).optional(),
  startDate: z.date().nullable().optional(),
  isActive: z.boolean().optional(),
  contactMethod: z.enum(["email", "sms", "phone"]).optional(),
  department: z.string().optional(),
  lastLogin: z.string().optional(),
});

export type AdminFormData = z.infer<typeof adminSchema>;

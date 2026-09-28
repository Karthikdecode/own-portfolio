import { z } from "zod";

/**
 * Contact form schema — single source of truth for both the client form and
 * the POST /api/contact route handler.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name is too long."),
  email: z.email("Please enter a valid email address.").max(160),
  subject: z.string().trim().max(120, "Subject is too long.").optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least a few words.")
    .max(2000, "Message is too long."),
  /**
   * Honeypot field — hidden from real users. A filled value marks a bot; the
   * route handler validates the payload, then silently accepts + drops it (so
   * bots get a normal 200 rather than a revealing error). Kept permissive on
   * purpose so a filled value passes validation and reaches that branch.
   */
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

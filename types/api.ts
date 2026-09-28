import type { ContactInput } from "@/lib/validations";

/** Discriminated result shape returned by all internal API routes. */
export type ApiResponse<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: ApiError };

export interface ApiError {
  message: string;
  /** Machine-readable code, e.g. "VALIDATION_ERROR". */
  code?: string;
  /** Field-level validation messages, keyed by field name. */
  fields?: Record<string, string[] | undefined>;
}

/** Payload accepted by POST /api/contact (single source of truth: zod schema). */
export type ContactRequest = ContactInput;

export interface ContactResponseData {
  received: true;
}

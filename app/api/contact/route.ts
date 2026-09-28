import { NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema } from "@/lib/validations";
import type { ApiResponse, ContactResponseData } from "@/types/api";

/**
 * POST /api/contact
 *
 * Validates the contact payload and acknowledges receipt. Delivery (email, DB,
 * queue) is intentionally not wired yet — see .env.example for the future
 * provider keys and the TODO below.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: { message: "Invalid JSON body.", code: "BAD_REQUEST" } },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json<ApiResponse<never>>(
      {
        success: false,
        error: {
          message: "Validation failed.",
          code: "VALIDATION_ERROR",
          fields: z.flattenError(parsed.error).fieldErrors,
        },
      },
      { status: 422 },
    );
  }

  // Honeypot: silently accept but drop suspected bots.
  if (parsed.data.company) {
    return NextResponse.json<ApiResponse<ContactResponseData>>(
      { success: true, data: { received: true } },
      { status: 200 },
    );
  }

  // TODO (feature phase): deliver the message (e.g. Resend / Nodemailer),
  // add rate limiting, and keep all secrets in env (see .env.example).

  return NextResponse.json<ApiResponse<ContactResponseData>>(
    { success: true, data: { received: true } },
    { status: 200 },
  );
}

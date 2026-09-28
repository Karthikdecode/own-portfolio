"use client";

import { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";
import { contactSchema } from "@/lib/validations";
import type { ApiResponse } from "@/types/api";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const EMPTY = { name: "", email: "", message: "", company: "" };

export function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const update =
    (field: keyof typeof EMPTY) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((current) => ({ ...current, [field]: event.target.value }));

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setServerError(null);

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "");
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("error");
      return;
    }

    setErrors({});
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data: ApiResponse<{ received: true }> = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setValues(EMPTY);
        return;
      }

      setStatus("error");
      if (!data.success) {
        setServerError(data.error.message);
        if (data.error.fields) {
          const fieldErrors: Record<string, string> = {};
          for (const [key, msgs] of Object.entries(data.error.fields)) {
            if (msgs && msgs[0]) fieldErrors[key] = msgs[0];
          }
          setErrors(fieldErrors);
        }
      }
    } catch {
      setStatus("error");
      setServerError("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-surface/50 p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Check className="h-5 w-5" aria-hidden />
        </span>
        <h3 className="text-xl font-semibold">Message sent</h3>
        <p className="text-sm text-muted-foreground">
          Thanks for reaching out — I&apos;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 font-mono text-xs uppercase tracking-widest text-accent hover:underline"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot — hidden from real users. */}
      <div className="sr-only" aria-hidden>
        <label>
          Company
          <input
            tabIndex={-1}
            autoComplete="off"
            value={values.company}
            onChange={update("company")}
          />
        </label>
      </div>

      <FormField
        id="contact-name"
        label="Name"
        error={errors.name}
      >
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={update("name")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={inputClass(Boolean(errors.name))}
          placeholder="Your name"
        />
      </FormField>

      <FormField id="contact-email" label="Email" error={errors.email}>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={update("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={inputClass(Boolean(errors.email))}
          placeholder="you@example.com"
        />
      </FormField>

      <FormField id="contact-message" label="Message" error={errors.message}>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={update("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={cn(inputClass(Boolean(errors.message)), "resize-y")}
          placeholder="Tell me about your idea or project…"
        />
      </FormField>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 font-mono text-xs uppercase tracking-widest text-background transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Sending
          </>
        ) : (
          <>
            Send message
            <Send className="h-4 w-4" aria-hidden />
          </>
        )}
      </button>

      {serverError && (
        <p role="alert" className="text-sm text-red-500">
          {serverError}
        </p>
      )}
      <p aria-live="polite" className="sr-only">
        {status === "loading" ? "Sending your message" : ""}
      </p>
    </form>
  );
}

function inputClass(invalid: boolean): string {
  return cn(
    "w-full rounded-lg border bg-surface/50 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent",
    invalid ? "border-red-500" : "border-border",
  );
}

function FormField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

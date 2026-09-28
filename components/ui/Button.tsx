import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-foreground text-background hover:opacity-90",
  outline:
    "border border-border text-foreground hover:border-foreground/50 hover:bg-surface-strong",
  ghost: "text-foreground hover:bg-surface-strong",
};

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
  download?: boolean | string;
  disabled?: boolean;
  icon?: ReactNode;
  "aria-label"?: string;
}

const BASE =
  "group inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-40";

/** Consistent CTA: renders a Link, external anchor, download anchor, or button. */
export function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  className,
  external,
  download,
  disabled,
  icon,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(BASE, VARIANTS[variant], className);
  const content = (
    <>
      {children}
      {icon}
    </>
  );

  if (disabled || !href) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        className={classes}
      >
        {content}
      </button>
    );
  }

  if (external || download) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        download={download}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={classes}>
      {content}
    </Link>
  );
}

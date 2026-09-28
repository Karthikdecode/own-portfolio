"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { PERSONAL } from "@/data/portfolio";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useScrollTo } from "@/hooks/useScrollTo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const INLINE_LINKS = NAV_LINKS.filter((link) => link.sectionId !== "contact");

/**
 * Fixed top navigation. Scroll-aware backdrop, theme toggle, "Let's talk" CTA,
 * and a fully accessible mobile menu (focus trap, Escape/selection/backdrop
 * close, scroll lock, auto-release on resize to desktop).
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const scrollTo = useScrollTo();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    const raf = requestAnimationFrame(onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!open || isDesktop) return;
    const { body } = document;
    const panel = panelRef.current;
    const toggle = toggleRef.current;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    panel?.querySelector<HTMLElement>("button, a[href]")?.focus();

    return () => {
      body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      toggle?.focus();
    };
  }, [open, isDesktop]);

  const handleNav = (href: string) => {
    setOpen(false);
    scrollTo(href);
  };

  return (
    <header
      className={cn(
        "pt-safe fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="container-px mx-auto flex max-w-6xl items-center justify-between py-4"
      >
        <Link
          href="#hero"
          onClick={(event) => {
            event.preventDefault();
            handleNav("#hero");
          }}
          className="font-mono text-sm font-semibold tracking-[0.2em] text-foreground"
        >
          {PERSONAL.brand}
        </Link>

        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          <ul className="flex items-center gap-6 lg:gap-8">
            {INLINE_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNav(link.href);
                  }}
                  className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <Button
            href="#contact"
            variant="outline"
            className="h-10 px-5"
            onClick={undefined}
          >
            Let&apos;s talk
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center"
          >
            <span className="relative block h-4 w-6" aria-hidden>
              <span className="absolute left-0 top-0 block h-px w-6 bg-foreground" />
              <span className="absolute left-0 top-1/2 block h-px w-6 -translate-y-1/2 bg-foreground" />
              <span className="absolute bottom-0 left-0 block h-px w-6 bg-foreground" />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={cn(
          "fixed inset-0 z-[60] md:hidden",
          open ? "" : "pointer-events-none",
        )}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          ref={panelRef}
          className={cn(
            "pt-safe container-px absolute inset-x-0 top-0 border-b border-border/60 bg-surface/95 pb-10 shadow-2xl transition-transform duration-300",
            open ? "translate-y-0" : "-translate-y-full",
          )}
        >
          <div className="flex h-16 items-center justify-between">
            <span className="font-mono text-sm font-semibold tracking-[0.2em] text-foreground">
              {PERSONAL.brand}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center text-foreground"
            >
              <span className="relative block h-4 w-4" aria-hidden>
                <span className="absolute left-0 top-1/2 block h-px w-4 -translate-y-1/2 rotate-45 bg-foreground" />
                <span className="absolute left-0 top-1/2 block h-px w-4 -translate-y-1/2 -rotate-45 bg-foreground" />
              </span>
            </button>
          </div>
          <ul className="mt-2 flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNav(link.href);
                  }}
                  className="block py-3 font-mono text-lg uppercase tracking-widest text-foreground transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

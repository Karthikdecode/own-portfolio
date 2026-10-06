"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/60 transition-colors hover:border-foreground/40"
          >
            {/*
              Bars share one transform function list (translate → rotate) so the
              browser interpolates them smoothly instead of snapping via matrix.
            */}
            <span className="relative block h-4 w-5" aria-hidden>
              <span
                className="absolute left-0 top-1/2 block h-[1.5px] w-5 rounded-full bg-foreground transition-transform duration-300 ease-out"
                style={{
                  transform: `translateY(-50%) translateY(${open ? 0 : -5}px) rotate(${open ? 45 : 0}deg)`,
                }}
              />
              <span
                className="absolute left-0 top-1/2 block h-[1.5px] w-5 -translate-y-1/2 rounded-full bg-foreground transition-all duration-300 ease-out"
                style={{
                  opacity: open ? 0 : 1,
                  transform: `translateY(-50%) scaleX(${open ? 0 : 1})`,
                }}
              />
              <span
                className="absolute left-0 top-1/2 block h-[1.5px] w-5 rounded-full bg-foreground transition-transform duration-300 ease-out"
                style={{
                  transform: `translateY(-50%) translateY(${open ? 0 : 5}px) rotate(${open ? -45 : 0}deg)`,
                }}
              />
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
            // Opaque surface: the old bg-surface/95 let page content bleed
            // through and made the links hard to read.
            "pt-safe container-px absolute inset-x-0 top-0 overflow-hidden rounded-b-[2rem] border-b border-border bg-surface pb-8 shadow-2xl transition-transform duration-500 ease-out",
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
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-foreground/40"
            >
              <span className="relative block h-4 w-4" aria-hidden>
                <span className="absolute left-0 top-1/2 block h-[1.5px] w-4 -translate-y-1/2 rotate-45 rounded-full bg-foreground" />
                <span className="absolute left-0 top-1/2 block h-[1.5px] w-4 -translate-y-1/2 -rotate-45 rounded-full bg-foreground" />
              </span>
            </button>
          </div>

          {/* Links stagger in from the right; delays reset to 0 on close so the
              panel retracts as one piece instead of unravelling. */}
          <ul className="mt-4 flex flex-col">
            {NAV_LINKS.map((link, index) => (
              <li
                key={link.href}
                style={{
                  transitionDelay: open ? `${160 + index * 60}ms` : "0ms",
                }}
                className={cn(
                  "border-b border-border/50 transition-all duration-500 ease-out last:border-b-0",
                  open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0",
                )}
              >
                <Link
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNav(link.href);
                  }}
                  className="group flex items-center justify-between py-4 font-mono text-xl uppercase tracking-widest text-foreground transition-colors hover:text-accent"
                >
                  {link.label}
                  <ArrowUpRight
                    className="h-4 w-4 -translate-x-2 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div
            style={{
              transitionDelay: open
                ? `${160 + NAV_LINKS.length * 60}ms`
                : "0ms",
            }}
            className={cn(
              "mt-7 transition-all duration-500 ease-out",
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            <Button
              href="#contact"
              variant="primary"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Let&apos;s talk
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

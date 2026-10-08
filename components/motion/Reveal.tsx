"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  amount?: number;
  once?: boolean;
}

/**
 * Fade-and-rise on scroll into view.
 * A low `amount` triggers as soon as a sliver is visible — on a phone a tall
 * block may never reach 30% in view, which would leave it waiting.
 */
export function Reveal({
  children,
  className,
  variants,
  delay = 0,
  amount = 0.15,
  once = true,
}: RevealProps) {
  const resolved: Variants = variants ?? {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASE_OUT, delay },
    },
  };

  return (
    <motion.div
      className={className}
      variants={resolved}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

interface RevealLinesProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
  once?: boolean;
}

/** Line-by-line clip/slide reveal for large editorial headings. */
export function RevealLines({
  lines,
  className,
  lineClassName,
  stagger = 0.07,
  once = true,
}: RevealLinesProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25 }}
    >
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="block overflow-hidden">
          <motion.span
            className={cn("block", lineClassName)}
            variants={{
              hidden: { y: "115%" },
              visible: {
                y: "0%",
                transition: {
                  duration: 0.6,
                  ease: EASE_OUT,
                  delay: index * stagger,
                },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

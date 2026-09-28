"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

/** Vertical timeline line that draws itself as it scrolls into view. */
export function TimelineLine({ className }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={className}
      style={{ transformOrigin: "top" }}
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.2, ease: EASE_OUT }}
    />
  );
}

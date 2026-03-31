"use client";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollExpandMediaProps {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
}

export function ScrollExpandMedia({ children, title, subtitle }: ScrollExpandMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const width = useTransform(scrollYProgress, [0.05, 0.4], ["60%", "100%"]);
  const borderRadius = useTransform(scrollYProgress, [0.05, 0.4], [24, 0]);
  const scale = useTransform(scrollYProgress, [0.05, 0.3], [0.92, 1]);
  const labelOpacity = useTransform(scrollYProgress, [0.05, 0.2], [1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  return (
    <div ref={containerRef} className="relative min-h-[160vh]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden bg-vi-bg">
        {/* Title above */}
        <motion.div
          style={{ opacity: labelOpacity }}
          className="absolute top-24 left-0 right-0 z-20 text-center pointer-events-none px-6"
        >
          {title && <p className="text-label text-vi-green mb-3">{title}</p>}
          {subtitle && <h2 className="text-display-sm text-white">{subtitle}</h2>}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="mx-auto mt-6 w-px h-8 bg-gradient-to-b from-vi-muted to-transparent"
          />
        </motion.div>

        {/* Expanding container */}
        <motion.div
          style={{ width, borderRadius, scale }}
          className="relative bg-vi-surface1 border border-vi-border overflow-hidden shadow-2xl"
        >
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-vi-bg/80 via-transparent to-vi-bg/40 z-10 pointer-events-none" />

          {/* Content */}
          <motion.div style={{ opacity: contentOpacity }} className="relative z-20">
            {children}
          </motion.div>

          {/* Fallback dark bg when no children */}
          {!children && (
            <div className="w-full h-[70vh] bg-vi-surface2 flex items-center justify-center">
              <span className="text-vi-body text-sm">Trailer preview</span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

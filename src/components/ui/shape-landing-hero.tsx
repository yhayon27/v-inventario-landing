"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ElegantShapeProps {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}

export function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-vi-green/[0.08]",
}: ElegantShapeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn("absolute pointer-events-none", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width, height, willChange: "transform" }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "blur-[2px]"
          )}
        />
        <div
          className={cn(
            "absolute inset-[1px] rounded-full",
            "bg-gradient-to-r from-vi-green/[0.03] to-transparent",
            "backdrop-blur-[2px]",
            "border border-vi-green/[0.08]"
          )}
        />
        {/* Inner glow line */}
        <div
          className={cn(
            "absolute inset-[2px] rounded-full",
            "bg-gradient-to-br from-vi-green/[0.04] via-transparent to-vi-green/[0.02]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

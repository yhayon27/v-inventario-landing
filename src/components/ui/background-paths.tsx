"use client";
import { motion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 12 * position} -${189 + i * 15}C-${380 - i * 12 * position} -${189 + i * 15} -${312 - i * 12 * position} ${216 - i * 15} ${152 - i * 12 * position} ${343 - i * 15}C${616 - i * 12 * position} ${470 - i * 15} ${684 - i * 12 * position} ${875 - i * 15} ${684 - i * 12 * position} ${875 - i * 15}`,
    width: 0.4 + i * 0.05,
    opacity: 0.03 + i * 0.015,
    duration: 20 + i * 2,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full text-vi-green" viewBox="0 0 696 316" fill="none">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            initial={{ opacity: 0 }}
            animate={{ opacity: [path.opacity * 0.4, path.opacity, path.opacity * 0.4] }}
            transition={{ duration: path.duration, repeat: Infinity, ease: "easeInOut", delay: path.id * 0.4 }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}

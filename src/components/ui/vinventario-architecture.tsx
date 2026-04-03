"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  width?: string;
  height?: string;
  className?: string;
  animateLines?: boolean;
  animateMarkers?: boolean;
  animateText?: boolean;
  showCpuConnections?: boolean;
}

export default function VInventarioArchitecture({ className, ...props }: Props) {
  return (
    <div className={cn("relative", className)}>
      <svg viewBox="0 0 200 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Connection paths */}
        <path d="M10 20 h80 q5 0 5 5 v30" stroke="#1a1a1d" strokeWidth="0.5" />
        <path d="M180 10 h-70 q-5 0-5 5 v40" stroke="#1a1a1d" strokeWidth="0.5" />
        <path d="M130 20 v22 q0 5-5 5 h-25" stroke="#1a1a1d" strokeWidth="0.5" />
        <path d="M170 80 v-22 q0-5-5-5 h-65" stroke="#1a1a1d" strokeWidth="0.5" />
        <path d="M95 95 v-46" stroke="#1a1a1d" strokeWidth="0.5" />
        <path d="M30 30 h25 q5 0 5 5 v7 q0 5 5 5 h35" stroke="#1a1a1d" strokeWidth="0.5" />

        {/* Animated line dots */}
        <circle r="3" fill="#00D26A" opacity="0.8" className="cpu-architecture cpu-line-1" />
        <circle r="3" fill="#00FF7F" opacity="0.8" className="cpu-architecture cpu-line-2" />
        <circle r="3" fill="#39FF14" opacity="0.6" className="cpu-architecture cpu-line-3" />
        <circle r="3" fill="#00D26A" opacity="0.8" className="cpu-architecture cpu-line-4" />
        <circle r="3" fill="#20C997" opacity="0.7" className="cpu-architecture cpu-line-5" />
        <circle r="3" fill="#00FF7F" opacity="0.8" className="cpu-architecture cpu-line-6" />
        <circle r="3" fill="#7FFFD4" opacity="0.6" className="cpu-architecture cpu-line-7" />
        <circle r="3" fill="#00D26A" opacity="0.8" className="cpu-architecture cpu-line-8" />

        {/* Central CPU */}
        <rect x="70" y="35" width="60" height="40" rx="6" fill="#0A0A0A" stroke="#00D26A" strokeWidth="0.5" />
        <text x="100" y="58" textAnchor="middle" fill="#00D26A" fontSize="8" fontWeight="700" fontFamily="Syne, system-ui">V·IA</text>

        {/* Node labels */}
        <g fill="#00D26A" fontSize="4.5" fontFamily="monospace" fontWeight="500" letterSpacing="0.03em">
          <text x="1" y="17">Ventas</text>
          <text x="155" y="8">Inventario</text>
          <text x="121" y="17">BCV Auto</text>
          <text x="161" y="84">Reportes</text>
          <text x="126" y="70">Alertas</text>
          <text x="85" y="100">IGTF</text>
          <text x="62" y="91">WhatsApp</text>
          <text x="12" y="34">Fiados</text>
        </g>
      </svg>

      {/* Glow behind CPU */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-14 rounded-full bg-vi-green/10 blur-[20px] pointer-events-none"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

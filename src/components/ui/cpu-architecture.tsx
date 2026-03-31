'use client';
import { motion } from 'framer-motion';

function Line({ className }: { className: string }) {
  return <div className={`cpu-architecture absolute w-[10px] h-[10px] rounded-full bg-vi-green shadow-[0_0_8px_rgba(34,197,94,0.6)] ${className}`} />;
}

export function CpuArchitecture() {
  return (
    <div className="relative w-[200px] h-[110px] mx-auto">
      {/* Lines animated via CSS offset-path */}
      <Line className="cpu-line-1" />
      <Line className="cpu-line-2" />
      <Line className="cpu-line-3" />
      <Line className="cpu-line-4" />
      <Line className="cpu-line-5" />
      <Line className="cpu-line-6" />
      <Line className="cpu-line-7" />
      <Line className="cpu-line-8" />

      {/* Central CPU chip */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[40px] bg-vi-surface2 border border-vi-green-border rounded-lg flex items-center justify-center"
        animate={{ boxShadow: ['0 0 12px rgba(34,197,94,0.15)', '0 0 24px rgba(34,197,94,0.3)', '0 0 12px rgba(34,197,94,0.15)'] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <span className="text-vi-green text-[10px] font-display font-bold">IA</span>
      </motion.div>

      {/* Connectors */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 110" fill="none">
        <path d="M10 20 h80 q5 0 5 5 v30" stroke="#1c1c1f" strokeWidth="1" fill="none" />
        <path d="M180 10 h-70 q-5 0-5 5 v40" stroke="#1c1c1f" strokeWidth="1" fill="none" />
        <path d="M130 20 v22 q0 5-5 5 h-25" stroke="#1c1c1f" strokeWidth="1" fill="none" />
        <path d="M170 80 v-22 q0-5-5-5 h-65" stroke="#1c1c1f" strokeWidth="1" fill="none" />
        <path d="M95 95 v-46" stroke="#1c1c1f" strokeWidth="1" fill="none" />
        <path d="M30 30 h25 q5 0 5 5 v7 q0 5 5 5 h35" stroke="#1c1c1f" strokeWidth="1" fill="none" />
      </svg>

      {/* Corner nodes */}
      {[
        { x: 5, y: 15, label: 'INV' },
        { x: 170, y: 5, label: 'BCV' },
        { x: 125, y: 15, label: 'POS' },
        { x: 165, y: 75, label: 'WA' },
        { x: 25, y: 25, label: 'FEFO' },
        { x: 88, y: 90, label: 'LOG' },
      ].map((n, i) => (
        <div key={i} className="absolute w-[30px] h-[18px] bg-vi-surface1 border border-vi-border rounded text-[7px] text-vi-body font-display flex items-center justify-center"
          style={{ left: n.x, top: n.y }}>
          {n.label}
        </div>
      ))}
    </div>
  );
}

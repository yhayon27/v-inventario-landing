"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const E = [0.16, 1, 0.3, 1] as const;

const METRICS = [
  { value: 8, suffix: "%", label: "Menos merma", desc: "Con alertas FEFO automáticas" },
  { value: 3, suffix: "seg", label: "Respuesta IA", desc: "Consulta → dato concreto" },
  { value: 24, suffix: "/7", label: "Disponibilidad", desc: "Tu negocio nunca duerme" },
  { value: 22, suffix: "+", label: "Funciones", desc: "En un solo sistema" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function MetricsSection() {
  return (
    <section className="py-20 relative bg-vi-surface1 border-y border-vi-border overflow-hidden">
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]">
        <defs>
          <pattern id="mg" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mg)" />
      </svg>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: E }}
            >
              <p className="font-display font-extrabold text-5xl md:text-6xl text-vi-green tracking-tight leading-none mb-2">
                <Counter target={m.value} suffix={m.suffix} />
              </p>
              <p className="text-white font-semibold text-sm mb-1">{m.label}</p>
              <p className="text-vi-muted text-xs">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

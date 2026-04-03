"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { Badge } from "@/components/ui/badge";

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
    const step = Math.max(1, Math.ceil(target / 75));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* Simple SVG area chart — no external deps */
const CHART_DATA = [8200, 9400, 8800, 11200, 10500, 12800, 11900, 14200, 13600, 15800, 14900, 16500, 15200, 17800, 16900, 18200, 17500, 19800, 18900, 20500, 19200, 21800, 20900, 22500, 21200, 23000, 22800, 24200, 23500, 24800];
const LABELS = ["Día 1", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "Día 30"];

function AreaChart() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true });
  const max = Math.max(...CHART_DATA);
  const w = 600, h = 160, px = 0;
  const points = CHART_DATA.map((v, i) => {
    const x = px + (i / (CHART_DATA.length - 1)) * (w - px * 2);
    const y = h - (v / max) * (h - 20) - 10;
    return `${x},${y}`;
  });
  const linePath = `M${points.join(" L")}`;
  const areaPath = `${linePath} L${w - px},${h} L${px},${h} Z`;

  return (
    <div className="bg-vi-surface1 border border-vi-border rounded-2xl p-6">
      <p className="text-vi-muted text-[10px] tracking-[0.15em] uppercase mb-4">Crecimiento en los últimos 30 días</p>
      <svg ref={ref} viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 160 }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((p) => (
          <line key={p} x1={0} y1={h * p} x2={w} y2={h * p} stroke="#2e2e32" strokeWidth="0.5" strokeDasharray="4 4" />
        ))}
        {/* Area */}
        <path d={areaPath} fill="url(#areaGrad)" style={{ opacity: inView ? 1 : 0, transition: "opacity 1s ease" }} />
        {/* Line */}
        <path d={linePath} fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"
          style={{
            strokeDasharray: inView ? "none" : "2000",
            strokeDashoffset: inView ? 0 : 2000,
            transition: "stroke-dashoffset 1.5s ease",
          }}
        />
        {/* End dot */}
        {inView && (
          <>
            <circle cx={w - px} cy={h - (CHART_DATA[CHART_DATA.length - 1] / max) * (h - 20) - 10} r="4" fill="#22c55e" />
            <circle cx={w - px} cy={h - (CHART_DATA[CHART_DATA.length - 1] / max) * (h - 20) - 10} r="8" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.3" />
          </>
        )}
      </svg>
      <div className="flex justify-between mt-2">
        {LABELS.map((l, i) => (
          <span key={i} className={`text-[9px] ${l ? "text-vi-muted" : "text-transparent"}`}>{l || "."}</span>
        ))}
      </div>
    </div>
  );
}

export default function MetricsSection() {
  return (
    <section className="section-pad relative bg-vi-bg overflow-hidden">
      <div className="hr-fade absolute top-0 inset-x-0" />

      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]">
        <defs>
          <pattern id="mg" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mg)" />
      </svg>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: E }}
          className="text-center mb-12"
        >
          <Badge variant="secondary">Impacto real</Badge>
          <h2 className="text-display-sm text-white mt-4">Números que importan.</h2>
        </motion.div>

        <AnimatedGroup preset="blur-slide" stagger={0.08}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {METRICS.map((m) => (
              <div key={m.label}>
                <p className="font-display font-extrabold text-5xl md:text-6xl text-vi-green tracking-tight leading-none mb-2">
                  <Counter target={m.value} suffix={m.suffix} />
                </p>
                <p className="text-white font-semibold text-sm mb-1">{m.label}</p>
                <p className="text-vi-body text-xs">{m.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedGroup>

        {/* Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: E }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <AreaChart />
        </motion.div>
      </div>

      <div className="hr-fade absolute bottom-0 inset-x-0" />
    </section>
  );
}

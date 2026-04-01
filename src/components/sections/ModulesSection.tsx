"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, TrendingUp, MessageCircle, Bell, AlertTriangle, Package, DollarSign } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Badge } from "@/components/ui/badge";

const E = [0.16, 1, 0.3, 1] as const;

function Counter({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.max(1, Math.ceil(target / 45));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

const ALERTS = [
  { dot: "#f97316", title: "Stock crítico", sub: "Arroz Mary · 2 días" },
  { dot: "#22c55e", title: "BCV actualizado", sub: "Bs. 36.54 / $ · hace 2 min" },
  { dot: "#60a5fa", title: "Fiado registrado", sub: "Carlos M. · $12.50" },
  { dot: "#22c55e", title: "Meta diaria 94%", sub: "$47 para completar" },
];

const STOCK = [
  { name: "Arroz Mary", pct: 15, days: "2 días", color: "#f97316" },
  { name: "Aceite Mazeite", pct: 35, days: "4 días", color: "#facc15" },
  { name: "Harina Pan", pct: 60, days: "8 días", color: "#22c55e" },
];

const SIDE_CARDS = [
  { icon: Zap, title: "IA activa 24/7", desc: "Tu agente nunca duerme" },
  { icon: TrendingUp, title: "BCV automático", desc: "Tasa siempre al día" },
  { icon: MessageCircle, title: "Solo WhatsApp", desc: "Sin apps ni instalaciones" },
  { icon: Bell, title: "Alertas inteligentes", desc: "Antes de que sea tarde" },
];

const BADGES = [
  { code: "WA", name: "WhatsApp", sub: "Business" },
  { code: "BCV", name: "Banco Central", sub: "Venezuela" },
  { code: "GS", name: "Google Sheets", sub: "Integración" },
  { code: "ZL", name: "Zelle", sub: "Pagos" },
  { code: "PM", name: "Pago Móvil", sub: "Venezuela" },
  { code: "BB", name: "Banesco", sub: "Banco" },
  { code: "MC", name: "Mercantil", sub: "Banco" },
  { code: "BM", name: "Bancamiga", sub: "Banco" },
];

function StockBar({ pct, color }: { pct: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="flex-1 h-1.5 bg-[#2e2e32] rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: inView ? `${pct}%` : "0%", backgroundColor: color }} />
    </div>
  );
}

export default function ModulesSection() {
  return (
    <section className="section-pad relative bg-vi-bg overflow-hidden" id="modulos">
      <div className="hr-fade absolute top-0 inset-x-0" />
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: E }} className="text-center mb-14">
          <Badge variant="secondary" className="mb-4">Panel de control</Badge>
          <h2 className="text-display text-white mb-4">Tu negocio. En tiempo real.</h2>
          <p className="text-vi-sub text-base max-w-lg mx-auto">Métricas actualizadas al instante. Sin esperar reportes.</p>
        </motion.div>

        {/* Main grid: dashboard left + feature cards right */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: E }} className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
          {/* LEFT — Dashboard */}
          <div className="bg-vi-surface1 border border-vi-border rounded-2xl overflow-hidden" style={{ boxShadow: "0 0 0 1px #2e2e32, 0 40px 80px rgba(0,0,0,0.6), 0 0 80px rgba(34,197,94,0.04)" }}>
            {/* Topbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-vi-surface2 border-b border-vi-border">
              <div className="flex items-center gap-4">
                <span className="font-display text-xs font-bold text-white"><span className="text-vi-green">V·</span>Inventario IA</span>
                <div className="hidden md:flex items-center gap-3 text-[10px]">
                  <span className="text-vi-green font-medium">Dashboard</span>
                  <span className="text-vi-placeholder hover:text-vi-sub cursor-pointer transition-colors">Inventario</span>
                  <span className="text-vi-placeholder hover:text-vi-sub cursor-pointer transition-colors">Ventas</span>
                  <span className="text-vi-placeholder hover:text-vi-sub cursor-pointer transition-colors">Fiados</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-2 py-0.5 bg-vi-green-dim border border-vi-green-border rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-vi-green animate-pulse" />
                  <span className="text-[9px] text-vi-green font-semibold">EN VIVO</span>
                </span>
                <span className="px-2 py-0.5 bg-vi-green-dim border border-vi-green-border rounded-full text-[10px] text-vi-green">Bs. 36.54/$</span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Main content area */}
              <div className="flex-1 p-4">
                {/* Metric cards */}
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {[
                    { label: "Ventas hoy", value: 847, prefix: "$", tag: "+12% vs ayer", tagGreen: true },
                    { label: "Transacciones", value: 127, prefix: "", tag: "hoy", tagGreen: false },
                    { label: "IGTF cobrado", value: 25, prefix: "$", suffix: ".41", tag: "3% auto", tagGreen: true },
                  ].map((m, i) => (
                    <SpotlightCard key={i}>
                      <div className="p-3">
                        <p className="text-[9px] text-vi-muted uppercase tracking-wider mb-1">{m.label}</p>
                        <p className="text-white text-[22px] font-extrabold font-display leading-none mb-1.5">
                          <Counter target={m.value} prefix={m.prefix} suffix={m.suffix || ""} />
                        </p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${m.tagGreen ? "bg-vi-green-dim text-vi-green" : "bg-vi-surface2 text-vi-sub"}`}>{m.tag}</span>
                      </div>
                    </SpotlightCard>
                  ))}
                </div>

                {/* BCV ticker */}
                <div className="flex items-center gap-2 px-3 py-2 bg-vi-surface2 border border-vi-border rounded-lg mb-3 text-[10px]">
                  <span className="text-vi-green font-semibold">Bs. 36.54 / $</span>
                  <span className="w-px h-3 bg-vi-border" />
                  <span className="text-vi-placeholder">Actualizado hace 2 min</span>
                  <span className="ml-auto text-vi-muted">IGTF 3% incluido</span>
                </div>

                {/* Chart */}
                <div className="bg-vi-surface2 border border-vi-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] text-vi-muted uppercase tracking-wider">Ventas — últimos 7 días</span>
                    <span className="text-[10px] text-vi-green cursor-pointer">Ver reporte →</span>
                  </div>
                  <svg className="w-full h-20" viewBox="0 0 300 80" fill="none">
                    <defs>
                      <linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="20" x2="300" y2="20" stroke="#2e2e32" strokeWidth="0.5" strokeDasharray="4 4" />
                    <line x1="0" y1="40" x2="300" y2="40" stroke="#2e2e32" strokeWidth="0.5" strokeDasharray="4 4" />
                    <line x1="0" y1="60" x2="300" y2="60" stroke="#2e2e32" strokeWidth="0.5" strokeDasharray="4 4" />
                    <path d="M0 65 C40 60, 60 50, 90 52 S140 35, 170 30 S220 20, 260 15 L300 8 L300 80 L0 80 Z" fill="url(#cg2)" />
                    <path d="M0 65 C40 60, 60 50, 90 52 S140 35, 170 30 S220 20, 260 15 L300 8" stroke="#22c55e" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <circle cx="300" cy="8" r="3" fill="#22c55e" />
                    <circle cx="300" cy="8" r="6" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.3" />
                  </svg>
                  <div className="flex justify-between mt-2 text-[9px]">
                    {["Lun","Mar","Mié","Jue","Vie","Sáb","Hoy"].map((d,i) => (
                      <span key={d} className={i >= 5 ? "text-vi-green" : "text-vi-placeholder"}>{d}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Alerts sidebar */}
              <div className="lg:w-[240px] border-t lg:border-t-0 lg:border-l border-vi-border bg-vi-surface2 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[9px] text-vi-muted uppercase tracking-wider">Alertas IA</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-vi-green animate-pulse" />
                </div>
                <div className="flex flex-col gap-2">
                  {ALERTS.map((a, i) => (
                    <div key={i} className="bg-vi-surface1 border border-vi-border rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: a.dot }} />
                        <span className="text-[11px] text-[#e0e0e4] font-medium">{a.title}</span>
                      </div>
                      <p className="text-[10px] text-vi-muted pl-3.5">{a.sub}</p>
                    </div>
                  ))}
                </div>
                {/* Stock mini-list */}
                <div className="bg-vi-surface1 border border-vi-border rounded-lg p-3 mt-3">
                  <p className="text-[9px] text-vi-muted uppercase tracking-wider mb-2">Stock crítico</p>
                  <div className="flex flex-col gap-2">
                    {STOCK.map((s, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-[11px] text-vi-body w-24 shrink-0">{s.name}</span>
                        <StockBar pct={s.pct} color={s.color} />
                        <span className="text-[10px] shrink-0 font-medium" style={{ color: s.color }}>{s.days}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Feature cards */}
          <div className="flex flex-col gap-3">
            {SIDE_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08, ease: E }}
                  className="relative bg-vi-surface1 border border-vi-border rounded-xl p-4">
                  {/* Corner brackets */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-vi-green/40" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-vi-green/40" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-vi-green/40" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-vi-green/40" />
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-vi-green-dim border border-vi-green-border rounded-lg flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-vi-green" />
                    </div>
                    <div>
                      <p className="text-white text-[13px] font-semibold mb-0.5">{card.title}</p>
                      <p className="text-vi-sub text-[11px] leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom — Compatibility badges */}
        <div className="flex gap-2 mt-4 pb-2 overflow-x-auto scrollbar-none">
          {BADGES.map((b) => (
            <div key={b.code} className="flex items-center gap-2 bg-vi-surface2 border border-vi-border rounded-lg px-3 py-2 shrink-0">
              <div className="w-8 h-8 bg-vi-green-dim border border-vi-green-border rounded-lg flex items-center justify-center">
                <span className="text-vi-green text-xs font-extrabold">{b.code}</span>
              </div>
              <div>
                <p className="text-vi-body text-xs font-medium whitespace-nowrap">{b.name}</p>
                <p className="text-vi-placeholder text-[10px]">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hr-fade absolute bottom-0 inset-x-0" />
    </section>
  );
}

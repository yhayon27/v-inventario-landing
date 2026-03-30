"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const E = [0.16, 1, 0.3, 1] as const;

/* ─── Scenario 1: Dueño pregunta ─────────────────────────────── */
function ScenarioDueno() {
  return (
    <div className="relative w-[260px] mx-auto select-none">
      {/* iPhone shell */}
      <div className="relative bg-[#1C1C1E] rounded-[40px] overflow-hidden border border-white/10"
        style={{ boxShadow: "0 50px 100px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.07)" }}>
        {/* Dynamic Island */}
        <div className="flex justify-center pt-2.5 pb-1 bg-[#1C1C1E]">
          <div className="w-20 h-[22px] bg-black rounded-full"/>
        </div>
        {/* Header */}
        <div className="flex justify-between px-5 py-1 text-white/50" style={{ fontSize: 10 }}>
          <span className="font-semibold">9:41</span>
          <div className="flex gap-1 items-center">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor">
              <rect x="0" y="3" width="2" height="5" rx="0.5"/><rect x="3.5" y="1.5" width="2" height="6.5" rx="0.5"/>
              <rect x="7" y="0" width="2" height="8" rx="0.5"/><rect x="10.5" y="0" width="1.5" height="8" rx="0.5"/>
            </svg>
            <svg width="13" height="9" viewBox="0 0 13 9" fill="currentColor">
              <path d="M6.5 1.5C8.8 1.5 10.8 2.4 12.2 3.9L13 3.1C11.3 1.2 8.9 0 6.5 0 4.1 0 1.7 1.2 0 3.1L.8 3.9C2.2 2.4 4.2 1.5 6.5 1.5Z"/>
              <path d="M6.5 4C7.9 4 9.1 4.6 10 5.5L10.8 4.7C9.6 3.6 8.1 3 6.5 3 4.9 3 3.4 3.6 2.2 4.7L3 5.5C3.9 4.6 5.1 4 6.5 4Z"/>
              <circle cx="6.5" cy="7.5" r="1.5"/>
            </svg>
            <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
              <rect x=".5" y=".5" width="18" height="10" rx="2.5" stroke="currentColor" strokeOpacity=".4"/>
              <rect x="1.5" y="1.5" width="14" height="8" rx="1.5" fill="currentColor"/>
              <path d="M20 3.5C20.8 3.5 21.5 4.2 21.5 5V6C21.5 6.8 20.8 7.5 20 7.5V3.5Z" fill="currentColor" fillOpacity=".4"/>
            </svg>
          </div>
        </div>
        {/* WA header */}
        <div className="bg-[#1F2C34] flex items-center gap-3 px-4 py-2.5">
          <div className="w-8 h-8 rounded-full bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center">
            <span className="text-[9px] font-black text-brand-accent">VI</span>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-white">V-Inventario IA</div>
            <div className="text-[9px] text-brand-accent">en línea</div>
          </div>
        </div>
        {/* Chat */}
        <div className="bg-[#0D1418] px-3 py-3 space-y-2" style={{ minHeight: 200 }}>
          {/* User msg */}
          <div className="flex justify-end">
            <div className="bg-[#005C4B] rounded-2xl rounded-tr-sm px-3 py-2 max-w-[80%]">
              <p className="text-[10px] text-white">¿Cuánto ganamos hoy?</p>
              <p className="text-[8px] text-white/40 text-right mt-0.5">9:41 ✓✓</p>
            </div>
          </div>
          {/* AI response */}
          <div className="flex justify-start">
            <div className="bg-[#1F2C34] rounded-2xl rounded-tl-sm px-3 py-2 max-w-[88%]">
              <p className="text-[10px] text-white leading-relaxed">
                <strong>📊 Resumen de hoy:</strong><br/>
                <span className="text-brand-accent font-mono font-bold">$247.80 USD</span> | Bs 9,044.70<br/>
                <br/>
                Efectivo USD: $89.20<br/>
                Transferencia: $104.60<br/>
                <br/>
                <span className="text-green-400">↑ +12.4%</span> vs. ayer
              </p>
              <p className="text-[8px] text-white/30 mt-0.5">9:41</p>
            </div>
          </div>
        </div>
        {/* Input */}
        <div className="bg-[#1F2C34] px-3 py-2 flex items-center gap-2 border-t border-white/5">
          <div className="flex-1 bg-[#2A3942] rounded-full px-3 py-1.5">
            <span className="text-[9px] text-white/25">Escribe un mensaje...</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-[#00A884] flex items-center justify-center">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M2 21L23 12 2 3V10L17 12 2 14V21Z"/></svg>
          </div>
        </div>
        {/* Home bar */}
        <div className="flex justify-center py-2 bg-[#1F2C34]">
          <div className="w-20 h-[3px] bg-white/15 rounded-full"/>
        </div>
      </div>
    </div>
  );
}

/* ─── Scenario 2: Stock bajo ──────────────────────────────────── */
function ScenarioStock() {
  return (
    <div className="relative w-[260px] mx-auto select-none">
      <div className="relative bg-[#1C1C1E] rounded-[40px] overflow-hidden border border-white/10"
        style={{ boxShadow: "0 50px 100px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.07)" }}>
        <div className="flex justify-center pt-2.5 pb-1 bg-[#1C1C1E]">
          <div className="w-20 h-[22px] bg-black rounded-full"/>
        </div>
        <div className="flex justify-between px-5 py-1 text-white/50 text-[10px]">
          <span className="font-semibold">9:41</span>
          <span>...</span>
        </div>

        {/* Lock screen */}
        <div className="bg-black px-4 py-6" style={{ minHeight: 320 }}>
          <div className="text-center mb-6">
            <div className="text-3xl font-light text-white/90">9:41</div>
            <div className="text-xs text-white/40 mt-1">Domingo, 29 de Marzo</div>
          </div>

          {/* Notification */}
          <div className="notif-bubble px-4 py-3 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center">
                <span className="text-[7px] font-black text-brand-accent">VI</span>
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-semibold text-white">V-Inventario IA</span>
                <span className="text-[9px] text-white/40 ml-2">ahora</span>
              </div>
            </div>
            <p className="text-[11px] text-white/90 leading-relaxed">
              ⚠️ <strong>Stock crítico:</strong> Harina PAN 1kg<br/>
              Quedan <strong>3 días</strong> de inventario según tu velocidad actual de ventas.<br/>
              <span className="text-brand-accent">Realiza el pedido hoy →</span>
            </p>
          </div>

          <div className="notif-bubble px-4 py-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center">
                <span className="text-[7px] font-black text-brand-accent">VI</span>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-white">V-Inventario IA</span>
                <span className="text-[9px] text-white/40 ml-2">hace 2h</span>
              </div>
            </div>
            <p className="text-[11px] text-white/90 leading-relaxed">
              📦 <strong>Arroz Mary 1kg</strong> — Lote L-023<br/>
              Vence en <strong>2 días</strong>. 24 unidades afectadas.
            </p>
          </div>
        </div>

        <div className="flex justify-center py-2 bg-black">
          <div className="w-20 h-[3px] bg-white/15 rounded-full"/>
        </div>
      </div>
    </div>
  );
}

/* ─── Scenario 3: BCV update ─────────────────────────────────── */
function ScenarioBCV() {
  return (
    <div className="relative w-[260px] mx-auto select-none">
      <div className="relative bg-[#1C1C1E] rounded-[40px] overflow-hidden border border-white/10"
        style={{ boxShadow: "0 50px 100px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.07)" }}>
        <div className="flex justify-center pt-2.5 pb-1 bg-[#1C1C1E]">
          <div className="w-20 h-[22px] bg-black rounded-full"/>
        </div>
        <div className="flex justify-between px-5 py-1 text-white/50 text-[10px]">
          <span className="font-semibold">9:41</span>
          <span>...</span>
        </div>

        {/* Dashboard panel */}
        <div className="bg-[#060606] px-4 py-4" style={{ minHeight: 320 }}>
          <div className="text-[10px] font-semibold text-white mb-4">Actualización BCV en curso</div>

          {/* Rate card */}
          <div className="bg-brand-accent/10 border border-brand-accent/30 rounded-xl p-4 mb-4">
            <div className="text-[9px] text-brand-accent uppercase tracking-wider mb-2 font-mono">NUEVA TASA BCV OFICIAL</div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-brand-accent font-mono">36.50</span>
              <span className="text-brand-muted text-xs">Bs/$</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[9px] text-brand-muted line-through font-mono">35.87</span>
              <span className="text-[9px] text-green-400 font-mono">▲ +0.63</span>
            </div>
          </div>

          {/* Recalculation progress */}
          <div className="text-[9px] text-brand-muted mb-2 font-mono">Actualizando precios en Bs...</div>
          <div className="space-y-2">
            {[
              { name: "Arroz Mary 1kg", old: "Bs 30.12", nuevo: "Bs 30.67" },
              { name: "Harina PAN 1kg", old: "Bs 14.35", nuevo: "Bs 14.62" },
              { name: "Aceite Mazeite", old: "Bs 25.80", nuevo: "Bs 26.27" },
            ].map((p) => (
              <div key={p.name} className="flex justify-between items-center py-1.5 border-b border-white/[0.04] last:border-0">
                <span className="text-[9px] text-brand-muted truncate">{p.name}</span>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-[9px] text-white/25 line-through font-mono">{p.old}</span>
                  <span className="text-[9px] text-brand-accent font-mono font-bold">{p.nuevo}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-accent"/>
            <span className="text-[9px] text-brand-accent font-mono">523 precios actualizados</span>
          </div>
        </div>

        <div className="flex justify-center py-2 bg-[#060606]">
          <div className="w-20 h-[3px] bg-white/15 rounded-full"/>
        </div>
      </div>
    </div>
  );
}

/* ─── Sticky scenario item ──────────────────────────────────── */
const SCENARIOS = [
  {
    id: "pregunta",
    label: "Escenario 01",
    title: "El dueño pregunta, la IA responde",
    body: "A cualquier hora, desde donde estés, le preguntas a tu negocio en WhatsApp. ¿Cuánto vendimos hoy? ¿Qué producto se está acabando? Respuestas en segundos, con datos reales de tu inventario.",
    phone: <ScenarioDueno />,
  },
  {
    id: "stock",
    label: "Escenario 02",
    title: "Stock bajo. Notificación inmediata.",
    body: "Cuando un producto llega a niveles críticos según tu velocidad de ventas real, recibes una notificación directa. Sin revisar el sistema. Sin esperar a que el cajero se dé cuenta. Solo una alerta clara y accionable.",
    phone: <ScenarioStock />,
  },
  {
    id: "bcv",
    label: "Escenario 03",
    title: "La tasa BCV cambia. Los precios se actualizan solos.",
    body: "Cuando el BCV publica la nueva tasa oficial, V-Inventario la detecta y recalcula automáticamente todos los precios en bolívares de todos tus productos. Sin tocar nada. Sin errores. En segundos.",
    phone: <ScenarioBCV />,
  },
];

/* ─── Main component ─────────────────────────────────────────── */
function ScenarioBlock({ scenario, index }: { scenario: typeof SCENARIOS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [40, 0, 0, -40]);
  const phoneY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [30, 0, 0, -30]);
  const phoneOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="min-h-screen flex items-center py-24 relative">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center ${isEven ? "" : "lg:[&>*:first-child]:order-2"}`}>
          {/* Text */}
          <motion.div style={{ opacity, y }}>
            <p className="text-label text-brand-muted mb-5">{scenario.label}</p>
            <h3 className="text-display-md text-white mb-6">{scenario.title}</h3>
            <p className="text-lg text-brand-subtle font-light leading-relaxed max-w-lg">{scenario.body}</p>
          </motion.div>

          {/* Phone */}
          <motion.div style={{ opacity: phoneOpacity, y: phoneY }}
            className="flex justify-center items-center">
            {scenario.phone}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function ScenariosSection() {
  return (
    <section id="escenarios" className="relative bg-black overflow-hidden">
      <div className="hr-fade"/>

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: E }}
        >
          <p className="text-label text-brand-muted mb-5">Escenarios reales</p>
          <h2 className="text-display-md text-white max-w-3xl">
            Así se ve V-Inventario en la vida real de un dueño
          </h2>
        </motion.div>
      </div>

      {/* Scenarios */}
      {SCENARIOS.map((s, i) => (
        <ScenarioBlock key={s.id} scenario={s} index={i} />
      ))}

      <div className="hr-fade"/>
    </section>
  );
}

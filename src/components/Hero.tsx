"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const E = [0.16, 1, 0.3, 1] as const;

const WORDS = ["Control", "total", "de", "tu", "minimarket."];

const KPI = [
  { v: "$247.80", l: "Ventas hoy", s: "Bs 9,044.70" },
  { v: "36.50", l: "Tasa BCV", s: "Actualizada hace 8 min" },
  { v: "3", l: "Alertas stock", s: "productos < 7 días" },
];

const BARS = [40, 62, 48, 78, 55, 70, 100];
const ALERTS = [
  { n: "Arroz Mary 1kg", d: "2 días", hot: true },
  { n: "Leche Completa 1L", d: "5 días", hot: false },
  { n: "Harina PAN 1kg", d: "9 días", hot: false },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  const { scrollY } = useScroll();
  const imgScale = useTransform(scrollY, [0, 600], [1, 1.08]);
  const imgOpacity = useTransform(scrollY, [0, 500], [0.55, 0.2]);
  const mockY = useTransform(scrollY, [0, 500], [0, 50]);
  const mockOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Word-by-word reveal on mount
  useEffect(() => {
    const els = wordsRef.current;
    els.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => el.classList.add("visible"), 200 + i * 110);
    });
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      {/* ── Background photo ───────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <motion.div style={{ scale: imgScale }} className="absolute inset-0">
          <motion.div style={{ opacity: imgOpacity }} className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1600&q=90"
              alt="Minimarket moderno"
              fill
              className="object-cover"
              style={{ objectPosition: "center 40%" }}
              priority
            />
          </motion.div>
        </motion.div>
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
        {/* Top fade */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black to-transparent" />
      </div>

      {/* ── Hero text — centered over photo ───────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20 pb-12 px-6 text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: E, delay: 0.05 }}
          className="text-label text-brand-muted mb-8"
        >
          Software de gestión · Venezuela 2025
        </motion.p>

        {/* Giant word-reveal headline */}
        <h1 className="text-display text-white mb-8 max-w-5xl mx-auto" aria-label="Control total de tu minimarket">
          {WORDS.map((word, i) => (
            <span key={i} className="inline-block mr-[0.22em] last:mr-0">
              <span
                ref={(el) => { if (el) wordsRef.current[i] = el; }}
                className="reveal-word"
              >
                {word === "total" || word === "minimarket." ? (
                  <span className="text-brand-accent">{word}</span>
                ) : word}
              </span>
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: E, delay: 0.75 }}
          className="text-lg text-brand-subtle max-w-2xl mx-auto mb-10 font-light"
        >
          Tasa BCV automática. IGTF sin errores. Fiados con control real.
          Tu negocio entero disponible en WhatsApp — las 24 horas.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: E, delay: 0.9 }}
          className="flex flex-wrap gap-3 justify-center mb-16"
        >
          <a href="#precios"
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-accent text-black text-sm font-semibold hover:bg-cyan-300 transition-colors duration-200">
            Empezar gratis
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a href="#escenarios"
            className="px-6 py-3 rounded-xl border border-white/10 text-brand-subtle hover:text-white hover:border-white/20 text-sm font-medium transition-all duration-200">
            Ver cómo funciona
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: E, delay: 1.1 }}
          className="flex flex-wrap justify-center gap-10"
        >
          {[
            { v: "3%", l: "IGTF automático" },
            { v: "−8%", l: "Menos mermas" },
            { v: "< 1h", l: "BCV actualizada" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-3xl font-black text-white leading-none mb-1">{s.v}</div>
              <div className="text-xs text-brand-muted">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Dashboard mockup below fold ────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: E, delay: 0.5 }}
        style={{ y: mockY, opacity: mockOpacity }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-0"
      >
        {/* Bottom fade over mockup */}
        <div className="absolute bottom-0 inset-x-6 h-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #000)" }} />

        <div className="rounded-2xl overflow-hidden border border-white/[0.06]"
          style={{ boxShadow: "0 40px 120px rgba(0,0,0,1)" }}>
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-5 py-3 bg-[#0A0A0A] border-b border-white/[0.05]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"/>
            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"/>
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]"/>
            <span className="ml-4 text-xs text-brand-muted font-medium">V-Inventario IA — Dashboard</span>
            <div className="ml-auto flex items-center gap-1.5 text-xs text-brand-accent font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent inline-block"
                style={{ animation: "glow-pulse 3s ease-in-out infinite" }}/>
              BCV: Bs 36.50/$
            </div>
          </div>

          <div className="p-6 bg-[#060606]">
            {/* KPIs */}
            <div className="grid grid-cols-3 gap-4 mb-5">
              {KPI.map((k, i) => (
                <motion.div key={k.l}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.4, ease: E }}
                  className="bg-black rounded-xl p-4 border border-white/[0.05]">
                  <div className="text-xs text-brand-muted mb-1.5 font-medium">{k.l}</div>
                  <div className={`text-xl font-black ${i === 0 ? "text-brand-accent" : "text-white"}`}>{k.v}</div>
                  <div className="text-[10px] text-brand-muted/50 mt-0.5">{k.s}</div>
                </motion.div>
              ))}
            </div>

            {/* Chart */}
            <div className="bg-black rounded-xl p-4 border border-white/[0.05] mb-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-semibold text-white">Ventas · últimos 7 días</span>
                <span className="text-xs font-mono text-brand-accent">+12.4%</span>
              </div>
              <div className="flex items-end gap-2 h-20">
                {BARS.map((h, i) => (
                  <motion.div key={i}
                    initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                    transition={{ delay: 1 + i * 0.07, duration: 0.4, ease: E }}
                    style={{ height: `${h}%`, transformOrigin: "bottom" }}
                    className={`flex-1 rounded-sm transition-colors ${i === 6 ? "bg-brand-accent" : "bg-white/[0.07]"}`}/>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {["L","M","M","J","V","S","D"].map((d, i) => (
                  <span key={i} className="flex-1 text-center text-[9px] text-brand-muted/40 font-mono">{d}</span>
                ))}
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-black rounded-xl p-4 border border-white/[0.05]">
              <div className="text-xs font-semibold text-white mb-3">Alertas de inventario</div>
              {ALERTS.map((a) => (
                <div key={a.n} className="flex justify-between items-center py-1.5 border-b border-white/[0.04] last:border-0">
                  <span className="text-[11px] text-brand-muted">{a.n}</span>
                  <span className={`text-[11px] font-mono font-bold ${a.hot ? "text-white" : "text-brand-muted"}`}>{a.d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

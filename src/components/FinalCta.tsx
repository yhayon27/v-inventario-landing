"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function FinalCta() {
  return (
    <section className="py-section relative overflow-hidden noise" id="contacto">
      <div className="absolute inset-0 grid-subtle opacity-60" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(6,182,212,0.04) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-6"
        >
          <div className="w-8 h-8 rounded-lg border border-brand-accent flex items-center justify-center mx-auto mb-8">
            <span className="text-[10px] font-black text-brand-accent">VI</span>
          </div>

          <blockquote className="mb-8">
            <p className="text-lg text-brand-secondary italic leading-relaxed" style={{ fontWeight: 300 }}>
              "El que tiene información, tiene poder.
              El que tiene poder, controla su negocio."
            </p>
          </blockquote>

          <h2
            className="font-black text-white leading-[1.0] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", letterSpacing: "-0.04em" }}
          >
            V-Inventario IA
            <br />
            <span className="text-brand-accent">te da ese poder</span>
          </h2>

          <p className="text-lg text-brand-secondary leading-relaxed max-w-2xl mx-auto mb-10" style={{ fontWeight: 300 }}>
            Desde el momento que lo activas, tu negocio tiene un cerebro digital que trabaja
            para ti las 24 horas — que nunca olvida un precio, nunca deja pasar un vencimiento
            y siempre está listo en tu WhatsApp.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          <a
            href="#precios"
            className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-accent text-black font-bold hover:bg-cyan-300 transition-colors duration-200"
          >
            Activar mi V-Inventario
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#contacto"
            className="px-8 py-4 rounded-xl border border-brand-border text-brand-secondary hover:text-white hover:border-brand-tertiary font-medium transition-colors duration-200"
          >
            Hablar con ventas
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-6 text-xs text-brand-secondary"
          style={{ fontWeight: 300 }}
        >
          {["14 días gratis", "Sin tarjeta de crédito", "Cancela cuando quieras", "Soporte en español"].map((b) => (
            <span key={b} className="flex items-center gap-1.5">
              <span className="text-brand-accent">✓</span>
              {b}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const plans = [
  {
    name: "Básico",
    monthlyUSD: 19,
    annualUSD: 15,
    description: "Para minimarkets que están empezando a organizarse.",
    featured: false,
    cta: "Empezar gratis",
    features: [
      "Inventario con lotes y FEFO",
      "Punto de Venta (POS)",
      "Tasa BCV automática",
      "IGTF 3% automático",
      "1 usuario — 1 sucursal",
      "Reportes básicos",
      "Soporte por email",
    ],
  },
  {
    name: "Pro",
    monthlyUSD: 39,
    annualUSD: 32,
    description: "El sistema completo para el dueño que quiere control total.",
    featured: true,
    cta: "Activar Pro",
    features: [
      "Todo lo del plan Básico",
      "Fiados con score de crédito",
      "Control de mermas",
      "Gastos operativos",
      "Cuentas con proveedores",
      "WhatsApp IA 24/7",
      "Hasta 5 usuarios",
      "Alertas inteligentes",
      "Reportes avanzados",
      "Soporte prioritario",
    ],
  },
  {
    name: "Multi-tienda",
    monthlyUSD: 79,
    annualUSD: 65,
    description: "Para cadenas de 2 o más sucursales con gestión centralizada.",
    featured: false,
    cta: "Contactar ventas",
    features: [
      "Todo lo del plan Pro",
      "Hasta 5 sucursales",
      "Dashboard multi-tienda",
      "Usuarios ilimitados",
      "Transferencias entre sucursales",
      "Análisis comparativo",
      "API para integraciones",
      "Gerente de cuenta",
    ],
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section className="py-section relative overflow-hidden" id="precios">
      <div className="divider absolute top-0 left-0 right-0" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-12"
        >
          <p className="text-xs font-medium text-brand-secondary tracking-widest uppercase mb-4">Precios</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="font-black text-white leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}
            >
              Planes para cada tamaño de negocio
            </h2>

            {/* Toggle */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className={`text-sm transition-colors ${!annual ? "text-white" : "text-brand-secondary"}`}>
                Mensual
              </span>
              <button
                onClick={() => setAnnual(!annual)}
                className={`relative w-10 h-5 rounded-full transition-colors duration-300 border ${
                  annual ? "bg-brand-accent/10 border-brand-accent" : "bg-brand-base border-brand-border"
                }`}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 600, damping: 40 }}
                  className="absolute top-0.5 w-4 h-4 rounded-full"
                  style={{
                    left: annual ? "22px" : "2px",
                    backgroundColor: annual ? "#06B6D4" : "#ffffff",
                  }}
                />
              </button>
              <span className={`text-sm transition-colors ${annual ? "text-white" : "text-brand-secondary"}`}>
                Anual
                <span className="ml-1.5 text-[10px] font-mono text-brand-accent">−18%</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              className={`rounded-2xl overflow-hidden border ${
                plan.featured
                  ? "border-brand-accent bg-brand-surface"
                  : "border-brand-border bg-brand-surface"
              }`}
            >
              {plan.featured && (
                <div className="bg-brand-accent text-black text-[10px] font-black text-center py-1.5 tracking-widest uppercase">
                  Más popular
                </div>
              )}

              <div className="p-7">
                <div className="mb-6">
                  <div className="text-sm font-semibold text-white mb-1">{plan.name}</div>
                  <div className="text-xs text-brand-secondary" style={{ fontWeight: 300 }}>{plan.description}</div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-xs text-brand-secondary">$</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={annual ? "a" : "m"}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="text-4xl font-black text-white tabular-nums"
                    >
                      {annual ? plan.annualUSD : plan.monthlyUSD}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-xs text-brand-secondary">/mes USD</span>
                </div>

                {/* CTA */}
                <a
                  href="#contacto"
                  className={`block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 mb-6 ${
                    plan.featured
                      ? "bg-brand-accent text-black hover:bg-cyan-300"
                      : "bg-brand-elevated text-white hover:bg-brand-border border border-brand-border"
                  }`}
                >
                  {plan.cta}
                </a>

                {/* Features */}
                <div className="space-y-2.5">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5">
                      <span className="text-brand-accent text-xs flex-shrink-0 mt-0.5">—</span>
                      <span className="text-xs text-brand-secondary leading-relaxed" style={{ fontWeight: 300 }}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-brand-secondary mt-8"
          style={{ fontWeight: 300 }}
        >
          14 días de prueba gratuita · Sin tarjeta de crédito · Cancela en cualquier momento
        </motion.p>
      </div>

      <div className="divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}

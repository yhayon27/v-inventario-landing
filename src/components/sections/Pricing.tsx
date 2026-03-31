"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const E = [0.16, 1, 0.3, 1] as const;

const PLANES = [
  {
    nombre: "Básico",
    mensual: 19, anual: 15,
    desc: "Para negocios que están empezando a organizarse.",
    destacado: false,
    cta: "Empezar gratis",
    funciones: ["Inventario FEFO", "POS multi-pago", "Tasa BCV auto", "IGTF 3% auto", "1 usuario · 1 local", "WhatsApp básico"],
  },
  {
    nombre: "Profesional",
    mensual: 39, anual: 32,
    desc: "Control total para el dueño que quiere datos reales.",
    destacado: true,
    cta: "Activar Pro",
    funciones: ["Todo lo de Básico", "Fiados con score IA", "Control de mermas", "Gastos operativos", "WhatsApp IA completo", "5 usuarios", "Alertas inteligentes", "Reportes avanzados"],
  },
  {
    nombre: "Multi-local",
    mensual: 79, anual: 65,
    desc: "Para cadenas de 2+ sucursales.",
    destacado: false,
    cta: "Contactar ventas",
    funciones: ["Todo lo de Pro", "Hasta 5 sucursales", "Dashboard consolidado", "Usuarios ilimitados", "Transferencias", "API integraciones"],
  },
];

export default function Pricing() {
  const [anual, setAnual] = useState(true);

  return (
    <section className="section-pad relative bg-vi-bg overflow-hidden" id="precios">
      <div className="hr-fade absolute top-0 inset-x-0" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: E }}
          className="text-center mb-12"
        >
          <p className="text-label text-vi-green mb-4">Precios</p>
          <h2 className="text-display-sm text-white mb-8">Simple. Sin sorpresas.</h2>

          <div className="inline-flex items-center gap-1 bg-vi-surface1 border border-vi-border rounded-full p-1">
            <button onClick={() => setAnual(false)} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${!anual ? 'bg-white text-black' : 'text-vi-muted hover:text-white'}`}>
              Mensual
            </button>
            <button onClick={() => setAnual(true)} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${anual ? 'bg-white text-black' : 'text-vi-muted hover:text-white'}`}>
              Anual
              <span className="text-[9px] font-bold bg-vi-green text-black px-1.5 py-0.5 rounded-full">-2 meses</span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 items-start">
          {PLANES.map((plan, i) => (
            <motion.div key={plan.nombre}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: E }}
              className={`relative rounded-2xl p-6 flex flex-col gap-5 ${
                plan.destacado
                  ? 'bg-vi-surface1 border-2 border-vi-green/40 shadow-[0_0_30px_rgba(34,197,94,0.1)]'
                  : 'bg-vi-surface1 border border-vi-border'
              }`}>
              {plan.destacado && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-vi-green text-black text-[10px] font-bold px-3 py-1 rounded-full">Más popular</span>
                </div>
              )}
              <div>
                <h3 className="font-display text-white font-bold text-lg mb-1">{plan.nombre}</h3>
                <p className="text-vi-muted text-xs">{plan.desc}</p>
              </div>
              <div className="flex items-end gap-1">
                <AnimatePresence mode="wait">
                  <motion.span key={anual ? 'a' : 'm'} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ type: 'spring', stiffness: 500, damping: 35 }} className="font-display text-4xl font-extrabold text-white">
                    ${anual ? plan.anual : plan.mensual}
                  </motion.span>
                </AnimatePresence>
                <span className="text-vi-muted text-xs mb-1.5">/mes</span>
              </div>
              <button className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                plan.destacado ? 'bg-vi-green text-black hover:bg-green-400' : 'border border-vi-border text-vi-muted hover:text-white hover:border-vi-muted'
              }`}>{plan.cta}</button>
              <ul className="flex flex-col gap-2">
                {plan.funciones.map((fn) => (
                  <li key={fn} className="flex items-start gap-2 text-xs text-vi-muted">
                    <Check size={12} className="text-vi-green mt-0.5 shrink-0" />
                    {fn}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-vi-subtle text-[10px] mt-6">Precios en USD. IGTF incluido.</p>
      </div>
      <div className="hr-fade absolute bottom-0 inset-x-0" />
    </section>
  );
}

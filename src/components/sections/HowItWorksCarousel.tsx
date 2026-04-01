"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList, Cpu, Bell, BarChart3 } from "lucide-react";
import { E } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";

const STEPS = [
  { id: "1", name: "Paso 1", icon: ClipboardList, title: "Tu equipo registra por WhatsApp", desc: "Ventas, entradas y pagos — solo mensajes de texto. Sin apps, sin capacitacion. Cualquiera lo usa desde el primer dia." },
  { id: "2", name: "Paso 2", icon: Cpu, title: "La IA analiza todo en tiempo real", desc: "Procesa cada registro al instante. Detecta patrones, calcula IGTF, actualiza BCV y alerta stock critico automaticamente." },
  { id: "3", name: "Paso 3", icon: Bell, title: "Recibe alertas inteligentes", desc: "Notificaciones antes de que los problemas ocurran: producto por vencer, fiado vencido, precio desactualizado, merma detectada." },
  { id: "4", name: "Paso 4", icon: BarChart3, title: "Toma decisiones con datos reales", desc: "Consulta ventas, ganancias y tendencias desde WhatsApp o el dashboard. Informacion que tardaba dias, ahora en segundos." },
];

export default function HowItWorksCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % STEPS.length), 5000);
    return () => clearInterval(timer);
  }, [active]);

  const step = STEPS[active];
  const Icon = step.icon;

  return (
    <section className="section-pad relative bg-vi-bg overflow-hidden" id="como-funciona">
      <div className="hr-fade absolute top-0 inset-x-0" />
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: E }} className="text-center mb-14">
          <Badge variant="secondary" className="mb-4">Cómo funciona</Badge>
          <h2 className="text-display-sm text-white">4 pasos. Cero friccion.</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Step nav */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {STEPS.map((s, i) => (
              <button key={s.id} onClick={() => setActive(i)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left shrink-0 transition-all cursor-pointer ${
                  i === active
                    ? "bg-vi-green text-black"
                    : "bg-vi-surface1 border border-vi-border text-vi-body hover:border-vi-green/30"
                }`}>
                <s.icon size={16} className={i === active ? "text-black" : "text-vi-green"} />
                <div>
                  <p className={`text-[10px] uppercase tracking-wider ${i === active ? "text-black/60" : "text-vi-green"}`}>{s.name}</p>
                  <p className={`text-xs font-medium ${i === active ? "text-black" : "text-white"}`}>{s.title.split(" ").slice(0, 3).join(" ")}...</p>
                </div>
              </button>
            ))}
          </div>

          {/* Content area */}
          <div className="bg-vi-surface1 border border-vi-border rounded-2xl p-8 min-h-[280px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div key={step.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4, ease: E }}
                className="w-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-vi-green-dim border border-vi-green-border rounded-xl flex items-center justify-center">
                    <Icon size={18} className="text-vi-green" />
                  </div>
                  <span className="text-vi-green text-[10px] uppercase tracking-widest font-medium">{step.name}</span>
                </div>
                <h3 className="font-display text-white text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-vi-body text-sm leading-relaxed max-w-lg">{step.desc}</p>
                {/* Progress bar for auto-cycle */}
                <div className="mt-6 h-0.5 bg-vi-border rounded-full overflow-hidden">
                  <motion.div key={`bar-${step.id}`} className="h-full bg-vi-green rounded-full" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 5, ease: "linear" }} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="hr-fade absolute bottom-0 inset-x-0" />
    </section>
  );
}

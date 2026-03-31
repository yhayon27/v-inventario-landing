"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const E = [0.16, 1, 0.3, 1] as const;

const FAQS = [
  { q: "¿Tengo que instalar alguna app?", a: "No. Todo funciona por WhatsApp. Solo necesitas un número activo y acceso a internet." },
  { q: "¿Funciona sin internet?", a: "Sí. El Venezuela Mode permite operar offline. Cuando vuelve la conexión, todo se sincroniza automáticamente." },
  { q: "¿La tasa BCV se actualiza sola?", a: "Sí, cada hora. Los precios en bolívares se recalculan sin que tengas que tocar nada." },
  { q: "¿Cuántos usuarios puedo tener?", a: "Depende del plan: Básico (1), Profesional (5), Multi-local (ilimitados). Cada uno con permisos configurables." },
  { q: "¿Mis datos están seguros?", a: "Sí. Encriptación de extremo a extremo, servidores redundantes y backups diarios automáticos." },
  { q: "¿Cuánto tarda la activación?", a: "Menos de 5 minutos. Registras tu número, confirmas el negocio y empiezas a usar el sistema inmediatamente." },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-pad relative bg-vi-bg overflow-hidden">
      <div className="hr-fade absolute top-0 inset-x-0" />
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: E }}
          className="text-center mb-12"
        >
          <p className="text-label text-vi-green mb-4">FAQ</p>
          <h2 className="text-display-sm text-white">Preguntas frecuentes</h2>
        </motion.div>

        <div className="flex flex-col gap-2">
          {FAQS.map((faq, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: E }}
              className="bg-vi-surface1 border border-vi-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 cursor-pointer"
              >
                <span className="text-sm text-white font-medium text-left">{faq.q}</span>
                <span className="text-vi-green shrink-0 ml-3">
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: E }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm text-vi-body leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="hr-fade absolute bottom-0 inset-x-0" />
    </section>
  );
}

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

const E = [0.16, 1, 0.3, 1] as const;

const TIPOS = ["Abasto", "Farmacia", "Ferretería", "Restaurante", "Mayorista", "Tienda de ropa", "Papelería", "Otro"];

export default function FinalCta() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    console.log("Lead:", Object.fromEntries(data));
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <section className="section-pad-lg relative bg-vi-bg overflow-hidden grain" id="contacto">
      <div className="hr-fade absolute top-0 inset-x-0" />
      {/* Green glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-vi-green/5 blur-[150px] pointer-events-none" />

      <div className="max-w-lg mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: E }}
          className="text-center mb-10"
        >
          <h2 className="text-display-sm text-white mb-3">Tu negocio merece datos reales.</h2>
          <p className="text-vi-sub text-sm">Sin tarjeta. Sin contrato. Activo en 5 minutos.</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: E }}
              className="flex flex-col gap-3 bg-vi-surface1 border border-vi-border rounded-2xl p-6"
            >
              <input name="nombre" required placeholder="Tu nombre"
                className="w-full bg-vi-surface2 border border-vi-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-vi-placeholder focus:outline-none focus:border-vi-green-border transition-colors" />
              <div className="flex items-center gap-2">
                <span className="text-vi-body text-xs bg-vi-surface2 border border-vi-border rounded-xl px-3 py-3 shrink-0">+58</span>
                <input name="whatsapp" required placeholder="Número de WhatsApp" type="tel"
                  className="w-full bg-vi-surface2 border border-vi-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-vi-placeholder focus:outline-none focus:border-vi-green-border transition-colors" />
              </div>
              <select name="tipo" required
                className="w-full bg-vi-surface2 border border-vi-border rounded-xl px-4 py-3 text-sm text-vi-body focus:outline-none focus:border-vi-green-border transition-colors appearance-none cursor-pointer">
                <option value="">Tipo de negocio</option>
                {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl bg-vi-green hover:bg-green-400 text-black font-semibold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 animate-glow-pulse">
                {loading ? <><Loader2 size={16} className="animate-spin" /> Enviando...</> : "Empezar gratis →"}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: E }}
              className="flex flex-col items-center gap-4 bg-vi-surface1 border border-vi-green-border rounded-2xl p-8"
            >
              <div className="w-14 h-14 bg-vi-green-dim border border-vi-green-border rounded-full flex items-center justify-center">
                <Check size={24} className="text-vi-green" />
              </div>
              <div className="text-center">
                <p className="text-white font-display font-bold text-lg mb-1">¡Listo!</p>
                <p className="text-vi-body text-sm">Te contactamos por WhatsApp en las próximas horas.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="hr-fade absolute bottom-0 inset-x-0" />
    </section>
  );
}

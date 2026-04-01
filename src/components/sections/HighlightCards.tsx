"use client";
import { motion } from "framer-motion";
import { MessageCircle, TrendingUp, Globe } from "lucide-react";
import { E } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";

const CARDS = [
  { icon: MessageCircle, title: "WhatsApp IA", desc: "Tu agente inteligente que nunca duerme. Consultas, registros y alertas directamente desde tu chat.", span: "" },
  { icon: TrendingUp, title: "Dashboard en tiempo real", desc: "Todas tus metricas en un solo lugar. Ventas, inventario, fiados y tendencias actualizados al instante.", span: "" },
  { icon: Globe, title: "Modo Venezuela + BCV + IGTF", desc: "Todo calculado automaticamente para la realidad venezolana. Tasa oficial, impuestos y fiados en un solo sistema.", span: "md:col-span-2" },
];

export default function HighlightCards() {
  return (
    <section className="section-pad relative bg-vi-bg overflow-hidden">
      <div className="hr-fade absolute top-0 inset-x-0" />
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: E }} className="text-center mb-14">
          <Badge variant="secondary" className="mb-4">Funciones destacadas</Badge>
          <h2 className="text-display-sm text-white">Lo que marca la diferencia.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1, ease: E }}
                className={`relative bg-vi-surface1 border border-vi-border rounded-2xl p-8 ${card.span}`}>
                {/* Corner brackets */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-vi-green/40 rounded-tl-sm" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-vi-green/40 rounded-tr-sm" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-vi-green/40 rounded-bl-sm" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-vi-green/40 rounded-br-sm" />

                <div className="relative z-10">
                  <div className="w-12 h-12 bg-vi-green-dim border border-vi-green-border rounded-xl flex items-center justify-center mb-5">
                    <Icon size={22} className="text-vi-green" />
                  </div>
                  <h3 className="font-display text-white text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-vi-body text-sm leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="hr-fade absolute bottom-0 inset-x-0" />
    </section>
  );
}

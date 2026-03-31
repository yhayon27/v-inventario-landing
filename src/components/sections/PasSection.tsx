"use client";
import { motion } from "framer-motion";

const CHIPS = [
  "Sin control de inventario",
  "BCV manual",
  "Fiados sin registro",
  "Cero datos reales",
];

export default function PasSection() {
  return (
    <section className="relative py-16 bg-vi-surface1 border-y border-vi-border overflow-hidden" id="problemas">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6 text-center"
        >
          {/* Chips */}
          <div className="flex flex-wrap justify-center gap-3">
            {CHIPS.map((chip) => (
              <div key={chip} className="flex items-center gap-2 px-4 py-2 bg-vi-surface2 border border-vi-border rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-vi-orange" />
                <span className="text-xs text-vi-subtle font-medium">{chip}</span>
              </div>
            ))}
          </div>

          {/* Copy */}
          <div>
            <p className="text-white font-display font-bold text-xl md:text-2xl mb-2">
              La realidad del comerciante venezolano.
            </p>
            <p className="text-vi-sub text-sm">
              Hay una mejor manera.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

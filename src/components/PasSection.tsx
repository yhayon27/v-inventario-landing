"use client";

import { motion } from "framer-motion";
import { TrendingDown, DollarSign, Package, AlertTriangle, Check } from "lucide-react";

const E = [0.16, 1, 0.3, 1] as const;

const PAINS = [
  { icon: TrendingDown, title: "La tasa BCV cambia cada día", body: "Vendes con la tasa de ayer y pierdes en cada transacción sin darte cuenta." },
  { icon: DollarSign,   title: "El IGTF sale de tu bolsillo", body: "El cajero no sabe cuándo cobra el 3%. Ese dinero lo absorbes tú, siempre." },
  { icon: Package,      title: "Productos vencidos en almacén", body: "Entre 3% y 8% del inventario termina en la basura. Es dinero que desaparece." },
  { icon: AlertTriangle,title: "Los fiados sin control", body: "Sin límites ni historial, nadie sabe cuánto debe cada cliente." },
];

const SOLUTIONS = [
  "Tasa BCV actualizada automáticamente cada hora",
  "IGTF 3% calculado solo cuando aplica, siempre correcto",
  "FEFO: el producto más próximo a vencer sale primero",
  "Límites de crédito automáticos con score por cliente",
  "Margen de reposición real — con el costo de hoy, no de ayer",
  "Tu negocio en WhatsApp las 24 horas",
];

export default function PasSection() {
  return (
    <section className="section-pad bg-black relative overflow-hidden" id="funciones">
      <div className="hr-fade absolute top-0 inset-x-0"/>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.7, ease:E }}
          className="mb-16">
          <p className="text-label text-brand-muted mb-5">El problema</p>
          <h2 className="text-display-md text-white max-w-3xl">
            Administrar un minimarket en Venezuela no es fácil
          </h2>
        </motion.div>

        {/* Pain grid */}
        <div className="grid md:grid-cols-2 gap-px bg-brand-border rounded-2xl overflow-hidden mb-24">
          {PAINS.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:"-40px" }} transition={{ duration:0.5, ease:E, delay: i*0.07 }}
              className="group bg-brand-surface p-8 lg:p-10 hover:bg-brand-card transition-colors duration-300">
              <p.icon size={18} className="text-brand-muted mb-5 group-hover:text-white transition-colors"/>
              <h3 className="text-sm font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-brand-muted font-light leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Agitation number */}
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.7, ease:E }}
          className="border border-brand-border rounded-3xl p-12 lg:p-20 text-center mb-24 relative overflow-hidden grid-lines">
          <div className="relative z-10">
            <div className="font-black text-white" style={{ fontSize:"clamp(6rem,18vw,14rem)", lineHeight:1, letterSpacing:"-0.05em" }}>
              8<span className="text-brand-accent">%</span>
            </div>
            <p className="text-xl font-semibold text-white mt-4 mb-3">del inventario se pierde sin darse cuenta</p>
            <p className="text-brand-muted font-light max-w-lg mx-auto">
              Mermas, vencimientos, precios desactualizados, fiados sin cobrar.
              En la economía venezolana de hoy, eso es la diferencia entre ganar y perder.
            </p>
          </div>
        </motion.div>

        {/* Solution */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.7, ease:E }}>
            <p className="text-label text-brand-muted mb-5">La solución</p>
            <h2 className="text-display-sm text-white mb-6">
              V-Inventario IA hace el trabajo automáticamente
            </h2>
            <p className="text-brand-muted font-light leading-relaxed">
              Construido desde cero para la realidad venezolana. No es un software importado.
              Cada función responde a un problema real del comercio en Venezuela hoy.
            </p>
          </motion.div>

          <div>
            {SOLUTIONS.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity:0, x:16 }} whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true, margin:"-40px" }} transition={{ duration:0.45, ease:E, delay:i*0.06 }}
                className="flex items-start gap-3 py-4 border-b border-brand-border last:border-0 group">
                <Check size={13} className="text-brand-accent flex-shrink-0 mt-0.5"/>
                <span className="text-sm text-brand-muted font-light group-hover:text-white transition-colors leading-relaxed">{s}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="hr-fade absolute bottom-0 inset-x-0"/>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { RefreshCw, Package, Receipt, CreditCard, Users, MessageCircle, BarChart3, ShieldCheck, Layers, Zap } from "lucide-react";

const E = [0.16, 1, 0.3, 1] as const;

const FEATURES = [
  { icon:RefreshCw,   title:"BCV automático cada hora",    body:"La tasa oficial se actualiza sola. Precios en bolívares siempre correctos. Sin tocar nada." },
  { icon:Layers,      title:"Lotes y FEFO inteligente",    body:"Registra lotes con fecha de vencimiento. El sistema despacha el más próximo a vencer primero." },
  { icon:Receipt,     title:"IGTF 3% sin errores",         body:"Solo aplica cuando el pago es en efectivo USD. El cajero no necesita saber — el sistema lo hace." },
  { icon:CreditCard,  title:"Fiados con score de crédito", body:"Límites automáticos, historial de pagos y score 0–100. Fías de manera inteligente." },
  { icon:Users,       title:"Roles y auditoría total",     body:"Cada empleado accede solo a lo que corresponde. Cada acción queda registrada con nombre y hora." },
  { icon:MessageCircle,title:"WhatsApp IA 24/7",           body:"Pregúntale a tu negocio en español. Respuestas instantáneas desde donde estés, a cualquier hora." },
  { icon:BarChart3,   title:"Margen de reposición real",   body:"El margen usa el costo actual de reposición, no el de la semana pasada. Saber cuánto ganas de verdad." },
  { icon:ShieldCheck, title:"Multi-tienda en una cuenta",  body:"Administra todos tus locales desde la misma cuenta. Cada uno con su propio inventario y finanzas." },
  { icon:Package,     title:"Control de mermas y gastos",  body:"Registra pérdidas, daños y costos operativos para ver la rentabilidad real." },
  { icon:Zap,         title:"POS rápido sin errores",      body:"Multi-pago, conversión Bs en tiempo real, IGTF automático. Ticket en segundos." },
];

export default function FeaturesGrid() {
  return (
    <section className="section-pad bg-black relative overflow-hidden" id="caracteristicas">
      <div className="hr-fade absolute top-0 inset-x-0"/>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.7, ease:E }}
          className="mb-16">
          <p className="text-label text-brand-muted mb-5">Todo incluido</p>
          <h2 className="text-display-sm text-white max-w-2xl">
            Cada herramienta que tu negocio necesita
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-border rounded-2xl overflow-hidden">
          {FEATURES.map((f,i) => (
            <motion.div key={f.title}
              initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:"-40px" }} transition={{ duration:0.4, ease:E, delay:i*0.04 }}
              className="group bg-brand-surface p-7 lg:p-8 hover:bg-brand-card transition-colors duration-200">
              <div className="w-8 h-8 rounded-lg border border-brand-border bg-black flex items-center justify-center mb-5 group-hover:border-brand-accent/40 transition-colors duration-200">
                <f.icon size={14} className="text-brand-muted group-hover:text-brand-accent transition-colors duration-200"/>
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-xs text-brand-muted font-light leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="hr-fade absolute bottom-0 inset-x-0"/>
    </section>
  );
}

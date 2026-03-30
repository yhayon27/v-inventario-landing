"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Zap, CreditCard, Star, Minus, Receipt, PieChart, Truck, RefreshCw, ShoppingCart, Layers } from "lucide-react";

const E = [0.16, 1, 0.3, 1] as const;

interface Mod { id:string; icon:React.ElementType; name:string; description:string; on?:boolean; }

const MODULES: Mod[] = [
  { id:"lotes",      icon:Layers,      name:"Lotes y FEFO",             description:"Control por fecha de vencimiento. Despacha el producto más próximo a vencerse primero.", on:true },
  { id:"alertas",    icon:Calendar,    name:"Alertas de vencimiento",    description:"Notificaciones anticipadas cuando un lote se acerca al vencimiento." ,on:true},
  { id:"igtf",       icon:Receipt,     name:"IGTF automático",           description:"El 3% se aplica solo cuando aplica. Correcto siempre.", on:true },
  { id:"fiados",     icon:CreditCard,  name:"Fiados y crédito",          description:"Límites automáticos, historial y bloqueo cuando el cliente llega al tope.", on:true },
  { id:"score",      icon:Star,        name:"Score de crédito",          description:"Historial de pagos convertido en un score 0–100 por cada cliente." },
  { id:"mermas",     icon:Minus,       name:"Control de mermas",         description:"Registra pérdidas y daños con trazabilidad completa." },
  { id:"gastos",     icon:PieChart,    name:"Gastos operativos",         description:"Ve la rentabilidad real incluyendo todos los costos fijos y variables." },
  { id:"proveedores",icon:Truck,       name:"Cuentas con proveedores",   description:"Deudas por proveedor con fechas de vencimiento de pago." },
  { id:"bcv",        icon:RefreshCw,   name:"BCV automático",            description:"Tasa oficial actualizada cada hora desde la fuente oficial.", on:true },
  { id:"recalculo",  icon:Zap,         name:"Recálculo de precios",      description:"Cuando la tasa cambia, todos los precios en bolívares se actualizan al instante." },
  { id:"pos",        icon:ShoppingCart,name:"Punto de Venta (POS)",      description:"Venta rápida, multi-pago, conversión en tiempo real y registro automático.", on:true },
];

function Toggle({ on, toggle }: { on:boolean; toggle:()=>void }) {
  return (
    <button onClick={(e)=>{ e.stopPropagation(); toggle(); }}
      role="switch" aria-checked={on}
      className={`relative w-9 h-[18px] rounded-full transition-all duration-300 border focus:outline-none flex-shrink-0 ${
        on ? "border-brand-accent bg-brand-accent/10 animate-glow-pulse" : "border-brand-border bg-transparent"
      }`}>
      <motion.div layout transition={{ type:"spring", stiffness:600, damping:40 }}
        className="absolute top-0.5 w-3.5 h-3.5 rounded-full"
        style={{ left: on ? "18px" : "2px", backgroundColor: on ? "#06B6D4" : "#333333" }}/>
    </button>
  );
}

export default function ModulesSection() {
  const [enabled, setEnabled] = useState<Record<string,boolean>>(
    Object.fromEntries(MODULES.map(m=>[m.id, m.on??false]))
  );
  const count = Object.values(enabled).filter(Boolean).length;
  const toggle = (id:string) => setEnabled(p=>({...p,[id]:!p[id]}));

  return (
    <section className="section-pad bg-black relative overflow-hidden" id="modulos">
      <div className="hr-fade absolute top-0 inset-x-0"/>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.7, ease:E }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-label text-brand-muted mb-5">Módulos activables</p>
            <h2 className="text-display-sm text-white max-w-xl">
              Pagas solo lo que necesitas
            </h2>
          </div>
          <div className="text-sm font-mono flex-shrink-0">
            <span className="text-brand-accent font-bold">{count}</span>
            <span className="text-brand-muted"> / {MODULES.length} módulos activos</span>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-border rounded-2xl overflow-hidden">
          {MODULES.map((m, i) => (
            <motion.div key={m.id}
              initial={{ opacity:0 }} whileInView={{ opacity:1 }}
              viewport={{ once:true, margin:"-40px" }} transition={{ duration:0.35, delay:i*0.03 }}
              onClick={()=>toggle(m.id)}
              className={`relative p-6 cursor-pointer transition-all duration-200 overflow-hidden ${
                enabled[m.id] ? "bg-brand-card" : "bg-brand-surface hover:bg-brand-card"
              }`}>

              {/* Top accent line when active */}
              <AnimatePresence>
                {enabled[m.id] && (
                  <motion.div key="line"
                    initial={{ scaleX:0 }} animate={{ scaleX:1 }} exit={{ scaleX:0 }}
                    transition={{ duration:0.3, ease:E }}
                    className="absolute top-0 left-0 right-0 h-px bg-brand-accent"
                    style={{ transformOrigin:"left" }}/>
                )}
              </AnimatePresence>

              {/* Glow overlay when active */}
              <AnimatePresence>
                {enabled[m.id] && (
                  <motion.div key="glow"
                    initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                    className="absolute inset-0 pointer-events-none"
                    style={{ background:"radial-gradient(ellipse 80% 60% at 0% 0%, rgba(6,182,212,0.04), transparent)" }}/>
                )}
              </AnimatePresence>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-200 ${
                    enabled[m.id] ? "border-brand-accent/40 bg-brand-accent/5" : "border-brand-border bg-black"
                  }`}>
                    <m.icon size={14} className={enabled[m.id] ? "text-brand-accent" : "text-brand-muted"}/>
                  </div>
                  <Toggle on={enabled[m.id]} toggle={()=>toggle(m.id)}/>
                </div>
                <h3 className={`text-sm font-semibold mb-1.5 transition-colors ${enabled[m.id]?"text-white":"text-brand-muted"}`}>
                  {m.name}
                </h3>
                <p className="text-xs text-brand-muted font-light leading-relaxed">{m.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="hr-fade absolute bottom-0 inset-x-0"/>
    </section>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const E = [0.16, 1, 0.3, 1] as const;

const DATA = [
  { m:"Ene", v:100 }, { m:"Feb", v:101.5 }, { m:"Mar", v:103.2 },
  { m:"Abr", v:105.8 }, { m:"May", v:107.4 }, { m:"Jun", v:110.1 },
  { m:"Jul", v:112.8 }, { m:"Ago", v:115.6 }, { m:"Sep", v:118.3 },
  { m:"Oct", v:121.5 }, { m:"Nov", v:124.2 }, { m:"Dic", v:127.9 },
];

const Tip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-black border border-brand-accent/30 rounded-lg px-3 py-2">
      <p className="text-[10px] text-brand-muted font-mono mb-1">{label}</p>
      <p className="text-sm font-bold text-brand-accent font-mono">
        +{(payload[0].value - 100).toFixed(1)}%
      </p>
    </div>
  );
};

const METRICS = [
  { v:"−8%", l:"Reducción de mermas", d:"Con FEFO y alertas de vencimiento activas" },
  { v:"3%",  l:"IGTF siempre correcto", d:"Cada transacción en USD cobra exactamente lo que debe" },
  { v:"+28%",l:"Diferencia a 12 meses", d:"Capital acumulado vs. operar sin sistema de control" },
];

export default function LossChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const [go, setGo] = useState(false);
  useEffect(()=>{ if (inView) setTimeout(()=>setGo(true), 300); }, [inView]);

  return (
    <section className="section-pad bg-black relative overflow-hidden">
      <div className="hr-fade absolute top-0 inset-x-0"/>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.7, ease:E }}
          className="mb-12">
          <p className="text-label text-brand-muted mb-5">Impacto financiero</p>
          <h2 className="text-display-sm text-white max-w-2xl">
            Así crece tu negocio con V-Inventario
          </h2>
        </motion.div>

        {/* Chart */}
        <motion.div ref={ref}
          initial={{ opacity:0, y:24 }} animate={inView?{ opacity:1, y:0 }:{}}
          transition={{ duration:0.7, ease:E }}
          className="bg-brand-surface border border-brand-border rounded-2xl p-6 lg:p-8 mb-12">
          <div className="flex items-start justify-between mb-6 gap-4">
            <div>
              <p className="text-sm font-semibold text-white">Capital del negocio · base 100</p>
              <p className="text-xs text-brand-muted font-light mt-1">
                Proyección 12 meses con control activo de BCV, mermas, IGTF y fiados
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-brand-accent font-mono flex-shrink-0">
              <div className="w-6 h-px bg-brand-accent"/>
              Con V-Inventario
            </div>
          </div>

          {go && (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={DATA} margin={{ top:8, right:8, left:-28, bottom:0 }}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.12}/>
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#111111" strokeDasharray="0" vertical={false}/>
                <XAxis dataKey="m" tick={{ fontSize:10, fill:"#666", fontFamily:"monospace" }}
                  axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize:10, fill:"#666", fontFamily:"monospace" }}
                  axisLine={false} tickLine={false} tickFormatter={v=>`${v}`} domain={[96,132]}/>
                <Tooltip content={<Tip/>} cursor={{ stroke:"#1A1A1A", strokeWidth:1 }}/>
                <Area type="monotone" dataKey="v" stroke="#06B6D4" strokeWidth={1.5}
                  fill="url(#g)" dot={false} animationDuration={2200} animationEasing="ease-out"/>
              </AreaChart>
            </ResponsiveContainer>
          )}
          <p className="text-[10px] text-brand-muted/30 text-right mt-3 font-mono">
            *Proyección estimada basada en minimarket promedio venezolano
          </p>
        </motion.div>

        {/* Metric cards */}
        <div className="grid md:grid-cols-3 gap-px bg-brand-border rounded-2xl overflow-hidden">
          {METRICS.map((m,i) => (
            <motion.div key={m.l}
              initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:"-40px" }} transition={{ duration:0.5, ease:E, delay:i*0.08 }}
              className="bg-brand-surface p-8 lg:p-10">
              <div className="text-5xl font-black text-brand-accent font-mono mb-3">{m.v}</div>
              <div className="text-sm font-semibold text-white mb-1.5">{m.l}</div>
              <div className="text-xs text-brand-muted font-light">{m.d}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="hr-fade absolute bottom-0 inset-x-0"/>
    </section>
  );
}

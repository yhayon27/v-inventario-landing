"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

const E = [0.16, 1, 0.3, 1] as const;

const RESULTS = [
  { v:8,   suf:"%",  pre:"−",    l:"Menos mermas al mes",       d:"Gracias al FEFO y alertas de vencimiento activas." },
  { v:3,   suf:"%",  pre:"",     l:"IGTF siempre correcto",     d:"Cada transacción en dólares cobra exactamente lo que debe." },
  { v:1,   suf:"h",  pre:"Cada", l:"BCV actualizada",           d:"Los precios en bolívares siempre reflejan la realidad." },
  { v:24,  suf:"/7", pre:"",     l:"Tu negocio en WhatsApp",    d:"El agente IA responde a cualquier hora del día." },
  { v:100, suf:"%",  pre:"",     l:"Trazabilidad de acciones",  d:"Quién, cuándo, qué. Transparencia absoluta." },
  { v:0,   suf:"",   pre:"Bs",   l:"Errores de conversión",     d:"Nunca más precios en bolívares calculados con tasa equivocada." },
];

function Num({ end, started }: { end:number; started:boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!started) return;
    const steps = 50, inc = end / steps;
    let cur = 0;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= end) { setN(end); clearInterval(t); }
      else setN(Math.floor(cur));
    }, 1800 / steps);
    return () => clearInterval(t);
  }, [started, end]);
  return <>{n}</>;
}

export default function Results() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section className="section-pad bg-black relative overflow-hidden" id="resultados">
      <div className="hr-fade absolute top-0 inset-x-0"/>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.7, ease:E }}
          className="mb-16">
          <p className="text-label text-brand-muted mb-5">Resultados reales</p>
          <h2 className="text-display-sm text-white max-w-2xl">Lo que cambia desde el primer día</h2>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-border rounded-2xl overflow-hidden">
          {RESULTS.map((r,i) => (
            <motion.div key={r.l}
              initial={{ opacity:0 }} whileInView={{ opacity:1 }}
              viewport={{ once:true, margin:"-40px" }} transition={{ duration:0.4, delay:i*0.05 }}
              className="bg-brand-surface p-8 lg:p-10">
              <div className="text-5xl font-black text-brand-accent font-mono tabular-nums mb-3">
                {r.pre}<Num end={r.v} started={inView}/>{r.suf}
              </div>
              <div className="text-sm font-semibold text-white mb-1.5">{r.l}</div>
              <div className="text-xs text-brand-muted font-light leading-relaxed">{r.d}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="hr-fade absolute bottom-0 inset-x-0"/>
    </section>
  );
}

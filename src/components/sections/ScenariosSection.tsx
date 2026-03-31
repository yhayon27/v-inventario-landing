"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const E = [0.16, 1, 0.3, 1] as const;

const HEADLINES = [
  { kicker: "Consulta", title: "Pregúntale a tu negocio", desc: "\"¿Cuánto vendimos hoy?\" — respuesta en 3 segundos." },
  { kicker: "Alertas", title: "Te avisa antes del problema", desc: "Stock bajo, productos por vencer, fiados vencidos." },
  { kicker: "Control", title: "Opera sin instalar nada", desc: "Todo desde el WhatsApp que ya usas todos los días." },
];

const MESSAGES = [
  { from: "user", text: "¿Cuánto vendimos hoy?", delay: 0.3 },
  { from: "ai", text: "💰 $847 USD · Bs. 30,942 · 127 transacciones", delay: 1.2 },
  { from: "user", text: "¿Qué productos se acaban?", delay: 2.4 },
  { from: "ai", text: "⚠️ Arroz Mary (2 días) · Aceite (4 días) · Harina PAN (6 días)", delay: 3.4 },
  { from: "ai", text: "📊 Recomiendo reabastecer antes del viernes.", delay: 4.2 },
];

export default function ScenariosSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-pad relative bg-vi-bg overflow-hidden" id="demo">
      <div className="hr-fade absolute top-0 inset-x-0" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: E }}
          className="text-center mb-16"
        >
          <p className="text-label text-vi-green mb-4">WhatsApp IA</p>
          <h2 className="text-display-sm text-white">Tu negocio en tu bolsillo.</h2>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — Headlines */}
          <div className="flex flex-col gap-10">
            {HEADLINES.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: E }}
              >
                <p className="text-label text-vi-green mb-2">{h.kicker}</p>
                <h3 className="font-display text-white text-xl font-bold mb-1">{h.title}</h3>
                <p className="text-vi-body text-sm">{h.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Right — Phone mockup */}
          <div className="relative flex justify-center">
            {/* Radar rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px]">
              <div className="radar-ring absolute inset-0 rounded-full border border-vi-green/20" />
              <div className="radar-ring-2 absolute inset-0 rounded-full border border-vi-green/15" />
              <div className="radar-ring-3 absolute inset-0 rounded-full border border-vi-green/10" />
            </div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: E }}
              className="relative w-[280px] bg-vi-surface1 border border-vi-border rounded-[2rem] p-3 shadow-2xl"
            >
              {/* Phone header */}
              <div className="bg-vi-surface2 rounded-t-[1.5rem] px-4 py-3 flex items-center gap-3 border-b border-vi-border">
                <div className="w-8 h-8 rounded-full bg-vi-green flex items-center justify-center text-black text-[10px] font-bold shrink-0">VI</div>
                <div>
                  <p className="text-white text-xs font-semibold">V·Inventario IA</p>
                  <p className="text-vi-green text-[10px]">en línea</p>
                </div>
              </div>

              {/* Messages */}
              <div className="bg-vi-surface2 rounded-b-[1.5rem] px-3 py-4 min-h-[300px] flex flex-col gap-2">
                {MESSAGES.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ delay: msg.delay, duration: 0.4, ease: E }}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl px-3 py-1.5 text-[11px] leading-relaxed ${
                      msg.from === "user"
                        ? "bg-vi-green text-black rounded-br-sm"
                        : "bg-vi-surface1 text-white border border-vi-border rounded-bl-sm"
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 5 }}
                  className="flex gap-1 px-3 py-2 bg-vi-surface1 border border-vi-border rounded-2xl rounded-bl-sm w-fit"
                >
                  <div className="dot-1 w-1.5 h-1.5 rounded-full bg-vi-muted" />
                  <div className="dot-2 w-1.5 h-1.5 rounded-full bg-vi-muted" />
                  <div className="dot-3 w-1.5 h-1.5 rounded-full bg-vi-muted" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="hr-fade absolute bottom-0 inset-x-0" />
    </section>
  );
}

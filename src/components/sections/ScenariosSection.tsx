"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const E = [0.16, 1, 0.3, 1] as const;

const HEADLINES = [
  { kicker: "Consulta", title: "Pregúntale a tu negocio", desc: "\"¿Cuánto vendimos hoy?\" — respuesta en 3 segundos." },
  { kicker: "Alertas", title: "Te avisa antes del problema", desc: "Stock bajo, productos por vencer, fiados vencidos." },
  { kicker: "Control", title: "Opera sin instalar nada", desc: "Todo desde el WhatsApp que ya usas todos los días." },
];

const MESSAGES = [
  { from: "user", text: "¿Cuánto vendimos hoy?" },
  { from: "ai", text: "💰 $847 USD · Bs. 30,942 · 127 transacciones" },
  { from: "user", text: "¿Qué productos se acaban?" },
  { from: "ai", text: "⚠️ Arroz Mary (2 días) · Aceite (4 días) · Harina PAN (6 días)" },
  { from: "ai", text: "📊 Recomiendo reabastecer antes del viernes." },
];

export default function ScenariosSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Technique 1 — Mouse Parallax 3D
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!phoneRef.current) return;
    const rect = phoneRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Technique 2 — Sequential message reveal
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    MESSAGES.forEach((_, i) => {
      // Show typing indicator before each AI message
      if (MESSAGES[i].from === "ai") {
        setTimeout(() => setShowTyping(true), i * 900 - 400);
      }
      setTimeout(() => {
        setShowTyping(false);
        setVisibleMessages((prev) => [...prev, i]);
      }, i * 900);
    });
  }, [isInView]);

  return (
    <section ref={sectionRef} className="section-pad relative bg-vi-bg overflow-hidden" id="demo">
      <div className="hr-fade absolute top-0 inset-x-0" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: E }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">WhatsApp IA</Badge>
          <h2 className="text-display-sm text-white">Tu negocio en tu bolsillo.</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
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

          {/* Right — Cinematic Phone mockup */}
          <div
            ref={phoneRef}
            className="relative flex justify-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Radar rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px]">
              <div className="radar-ring absolute inset-0 rounded-full border border-vi-green/20" />
              <div className="radar-ring-2 absolute inset-0 rounded-full border border-vi-green/15" />
              <div className="radar-ring-3 absolute inset-0 rounded-full border border-vi-green/10" />
            </div>

            {/* Technique 4 — Float animation wrapper */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              {/* Technique 1 — 3D parallax container */}
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  transformPerspective: 1000,
                  // Technique 5 — Deep shadow
                  boxShadow: "0 40px 80px -15px rgba(0,0,0,0.9), 0 15px 25px -5px rgba(0,0,0,0.7)",
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: E }}
                className="relative w-[280px] bg-vi-surface1 border border-vi-border rounded-[2rem] p-3"
              >
                {/* Phone header */}
                <div className="bg-vi-surface2 rounded-t-[1.5rem] px-4 py-3 flex items-center gap-3 border-b border-vi-border">
                  <div className="w-8 h-8 rounded-full bg-vi-green flex items-center justify-center text-black text-[10px] font-bold shrink-0">VI</div>
                  <div>
                    <p className="text-white text-xs font-semibold">V·Inventario IA</p>
                    <p className="text-vi-green text-[10px]">en línea</p>
                  </div>
                </div>

                {/* Messages — Technique 2 sequential reveal */}
                <div className="bg-vi-surface2 rounded-b-[1.5rem] px-3 py-4 min-h-[300px] flex flex-col gap-2">
                  {MESSAGES.map((msg, i) => (
                    visibleMessages.includes(i) && (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3, ease: E }}
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
                    )
                  ))}

                  {/* Technique 3 — Typing indicator */}
                  {showTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-1 px-3 py-2 bg-vi-surface1 border border-vi-border rounded-2xl rounded-bl-sm w-fit"
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-vi-body"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                        />
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="hr-fade absolute bottom-0 inset-x-0" />
    </section>
  );
}

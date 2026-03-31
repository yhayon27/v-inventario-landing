"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { E } from "@/lib/animations";
import { Message } from "@/types";

const conversation: Message[] = [
  { id: 1, from: "user", text: "¿Cuánto vendimos hoy?", delay: 0 },
  { id: 2, from: "ai", text: "📊 *Resumen de hoy:*\n$247.80 USD | Bs 9,044.70\n\nEfectivo USD: $89.20\nTransferencia: $104.60\nPago Móvil: Bs 1,971.00\n\n*Mejor hora:* 12:00 – 1:30pm", delay: 1600 },
  { id: 3, from: "user", text: "¿Qué productos se están acabando?", delay: 3400 },
  { id: 4, from: "ai", text: "⚠️ *Stock crítico (< 7 días):*\n\n🔴 Arroz Mary 1kg → 2 días\n🟡 Leche Completa 1L → 5 días\n🟡 Aceite Mazeite 1L → 6 días\n\nTe recomiendo hacer el pedido hoy.", delay: 5200 },
  { id: 5, from: "user", text: "¿Cuánto me debe Juan Pérez?", delay: 7200 },
  { id: 6, from: "ai", text: "👤 *Juan Pérez — Estado de cuenta:*\n\nDeuda: $23.50\nDesde hace: 12 días\nÚltimo abono: $5.00 (hace 6 días)\nPendiente: $18.50\n\nScore: 72/100 🟡", delay: 9000 },
];

function formatMessage(text: string) {
  return text.split("\n").map((line, i, arr) => (
    <span key={i}>
      {line.split(/(\*[^*]+\*)/).map((part, j) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <strong key={j}>{part.slice(1, -1)}</strong>
        ) : part
      )}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

export default function WhatsappMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [visible, setVisible] = useState<number[]>([]);
  const [typing, setTyping] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!inView || started) return;
    setStarted(true);
    conversation.forEach((msg) => {
      setTimeout(() => {
        if (msg.from === "ai") {
          setTyping(true);
          setTimeout(() => {
            setTyping(false);
            setVisible((prev) => [...prev, msg.id]);
          }, 1100);
        } else {
          setVisible((prev) => [...prev, msg.id]);
        }
      }, msg.delay);
    });
  }, [inView, started]);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [visible, typing]);

  return (
    <section className="section-pad relative overflow-hidden" id="whatsapp">
      <div className="hr absolute top-0 left-0 right-0" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: E }}
          >
            <p className="text-xs font-medium text-brand-muted tracking-widest uppercase mb-4">WhatsApp IA</p>
            <h2
              className="font-black text-white leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}
            >
              Tu negocio entero en tu WhatsApp
            </h2>
            <p className="text-brand-muted leading-relaxed mb-8" style={{ fontWeight: 300 }}>
              Habla con tu negocio en español normal. Ventas, inventario, fiados, tasa BCV —
              respuestas instantáneas desde donde estés, a cualquier hora.
            </p>

            <div className="space-y-4">
              {[
                { q: "¿Cuánto vendimos hoy?", a: "Total por método de pago al instante" },
                { q: "¿Qué se está acabando?", a: "Productos con menos de 7 días de stock" },
                { q: "¿Cuánto me debe un cliente?", a: "Estado de cuenta completo en segundos" },
              ].map((item) => (
                <div key={item.q} className="flex gap-3 items-start py-3 border-b border-brand-border last:border-0">
                  <span className="w-1 h-1 rounded-full bg-brand-accent flex-shrink-0 mt-2" />
                  <div>
                    <span className="text-sm text-white font-medium">"{item.q}"</span>
                    <span className="text-sm text-brand-muted ml-2" style={{ fontWeight: 300 }}>→ {item.a}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-8">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
              <span className="text-sm text-brand-muted" style={{ fontWeight: 300 }}>
                Disponible <span className="text-white font-medium">24 horas, 7 días a la semana</span>
              </span>
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: E }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* iPhone frame */}
              <div
                className="relative w-[280px] bg-[#111B21] overflow-hidden"
                style={{
                  borderRadius: "44px",
                  boxShadow: "0 60px 120px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.08)",
                }}
              >
                {/* Dynamic Island */}
                <div className="flex justify-center pt-3 pb-1 bg-[#111B21]">
                  <div className="w-24 h-6 bg-black rounded-full" />
                </div>

                {/* Status bar */}
                <div className="flex justify-between items-center px-5 py-1 bg-[#111B21]">
                  <span className="text-[10px] text-white/70 font-semibold">9:41</span>
                  <div className="flex items-center gap-1 text-white/70">
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="currentColor">
                      <rect x="0" y="3" width="2" height="6" rx="0.5"/>
                      <rect x="3.5" y="2" width="2" height="7" rx="0.5"/>
                      <rect x="7" y="1" width="2" height="8" rx="0.5"/>
                      <rect x="10.5" y="0" width="1.5" height="9" rx="0.5"/>
                    </svg>
                    <svg width="13" height="9" viewBox="0 0 13 9" fill="currentColor">
                      <path d="M6.5 1.5C8.8 1.5 10.8 2.4 12.2 3.9L13 3.1C11.3 1.2 8.9 0 6.5 0C4.1 0 1.7 1.2 0 3.1L0.8 3.9C2.2 2.4 4.2 1.5 6.5 1.5Z"/>
                      <path d="M6.5 4C7.9 4 9.1 4.6 10 5.5L10.8 4.7C9.6 3.6 8.1 3 6.5 3C4.9 3 3.4 3.6 2.2 4.7L3 5.5C3.9 4.6 5.1 4 6.5 4Z"/>
                      <circle cx="6.5" cy="7.5" r="1.5"/>
                    </svg>
                    <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
                      <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="currentColor" strokeOpacity="0.4"/>
                      <rect x="1.5" y="1.5" width="14" height="8" rx="1.5" fill="currentColor"/>
                      <path d="M20 3.5C20.8 3.5 21.5 4.2 21.5 5V6C21.5 6.8 20.8 7.5 20 7.5V3.5Z" fill="currentColor" fillOpacity="0.4"/>
                    </svg>
                  </div>
                </div>

                {/* WA Header */}
                <div className="bg-[#1F2C34] px-4 py-2.5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-[9px] font-black text-brand-accent">VI</span>
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-white leading-none mb-0.5">V-Inventario IA</div>
                    <div className="text-[9px] text-brand-accent">en línea</div>
                  </div>
                </div>

                {/* Chat */}
                <div
                  ref={chatRef}
                  className="bg-[#0D1418] px-3 py-3 overflow-y-auto scroll-smooth"
                  style={{ height: "360px" }}
                >
                  <div className="text-center mb-3">
                    <span className="text-[9px] bg-black/30 text-white/30 px-2 py-0.5 rounded-full">HOY</span>
                  </div>

                  <AnimatePresence>
                    {conversation
                      .filter((m) => visible.includes(m.id))
                      .map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.25, ease: E }}
                          className={`flex mb-1.5 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[82%] px-3 py-2 text-[10px] leading-relaxed ${
                              msg.from === "user"
                                ? "bg-[#005C4B] text-white rounded-2xl rounded-tr-sm"
                                : "bg-[#1F2C34] text-white/90 rounded-2xl rounded-tl-sm"
                            }`}
                          >
                            {formatMessage(msg.text)}
                            <div className={`text-[8px] mt-1 ${msg.from === "user" ? "text-right text-white/40" : "text-white/25"}`}>
                              {new Date().toLocaleTimeString("es-VE", { hour: "2-digit", minute: "2-digit" })}
                              {msg.from === "user" && " ✓✓"}
                            </div>
                          </div>
                        </motion.div>
                      ))}

                    {typing && (
                      <motion.div
                        key="typing"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex mb-1.5 justify-start"
                      >
                        <div className="bg-[#1F2C34] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/40 dot-1" />
                          <div className="w-1.5 h-1.5 rounded-full bg-white/40 dot-2" />
                          <div className="w-1.5 h-1.5 rounded-full bg-white/40 dot-3" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Input */}
                <div className="bg-[#1F2C34] px-3 py-2.5 flex items-center gap-2 pb-safe">
                  <div className="flex-1 bg-[#2A3942] rounded-full px-3 py-1.5">
                    <span className="text-[9px] text-white/25">Escribe un mensaje...</span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#00A884] flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                      <path d="M2 21L23 12 2 3V10L17 12 2 14V21Z"/>
                    </svg>
                  </div>
                </div>

                {/* Home indicator */}
                <div className="flex justify-center py-2 bg-[#1F2C34]">
                  <div className="w-24 h-1 bg-white/20 rounded-full" />
                </div>
              </div>

              {/* WhatsApp badge */}
              <div className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="hr absolute bottom-0 left-0 right-0" />
    </section>
  );
}

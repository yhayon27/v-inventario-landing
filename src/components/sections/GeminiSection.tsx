"use client";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

export default function GeminiSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const p1 = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const p2 = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const p3 = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const p4 = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const p5 = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div ref={ref} className="h-[300vh] bg-vi-bg w-full relative overflow-clip">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-vi-bg to-transparent z-10 pointer-events-none" />
        <GoogleGeminiEffect
          pathLengths={[p1, p2, p3, p4, p5]}
          title="Inteligencia que fluye"
          description="Cada dato, cada venta, cada alerta — conectados en tiempo real desde WhatsApp"
          className="w-full"
        />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-vi-bg to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
}

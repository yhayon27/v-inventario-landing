"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ShaderLines } from "@/components/ui/shader-lines";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { ElegantShape } from "@/components/ui/shape-landing-hero";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grain" id="inicio">
      {/* Shader background */}
      <ShaderLines />

      {/* Green orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-vi-green/5 blur-[120px] pointer-events-none" />

      {/* Floating geometric shapes */}
      <ElegantShape
        className="top-[15%] left-[8%] hidden md:block"
        width={350} height={80} rotate={12} delay={0.3}
        gradient="from-vi-green/[0.08]"
      />
      <ElegantShape
        className="top-[20%] right-[5%] hidden md:block"
        width={280} height={60} rotate={-15} delay={0.5}
        gradient="from-vi-green/[0.12]"
      />
      <ElegantShape
        className="bottom-[18%] left-[12%] hidden md:block"
        width={320} height={70} rotate={-8} delay={0.7}
        gradient="from-vi-green/[0.06]"
      />
      <ElegantShape
        className="bottom-[25%] right-[10%] hidden md:block"
        width={240} height={55} rotate={20} delay={0.9}
        gradient="from-vi-green/[0.10]"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <AnimatedGroup className="flex flex-col items-center gap-6" preset="blur-slide" stagger={0.12}>
          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vi-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-vi-green" />
            </span>
            <span className="text-[11px] text-vi-green font-medium tracking-widest uppercase">
              Gestión inteligente por WhatsApp
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-display text-white">
            Tu negocio responde.<br />Tú decides.
          </h1>

          {/* Subheadline */}
          <p className="text-vi-sub text-lg max-w-xl leading-relaxed">
            El único sistema diseñado para la economía venezolana. Controla inventario, fiados y precios desde WhatsApp, 24/7.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4 flex-wrap justify-center mt-2">
            <a href="#contacto" className="px-7 py-3 rounded-xl bg-vi-green hover:bg-green-400 text-black font-semibold text-sm transition-colors cursor-pointer">
              Comenzar gratis
            </a>
            <a href="#demo" className="px-7 py-3 rounded-xl border border-vi-border hover:border-vi-muted text-vi-body hover:text-white font-semibold text-sm transition-colors cursor-pointer">
              Ver demo →
            </a>
          </div>
        </AnimatedGroup>

        {/* Scroll chevron */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-vi-body" />
        </motion.div>
      </div>

      {/* Scanline */}
      <div className="scanline" />
    </section>
  );
}

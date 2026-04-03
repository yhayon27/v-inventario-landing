"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import VInventarioArchitecture from "@/components/ui/vinventario-architecture";

export default function TransformSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const photoOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const photoScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.06]);
  const svgOpacity = useTransform(scrollYProgress, [0.4, 0.75], [0, 1]);
  const svgScale = useTransform(scrollYProgress, [0.4, 0.75], [0.88, 1]);
  const beforeLabelOpacity = useTransform(scrollYProgress, [0, 0.05, 0.35, 0.45], [0, 1, 1, 0]);
  const afterLabelOpacity = useTransform(scrollYProgress, [0.55, 0.72], [0, 1]);

  return (
    <section ref={ref} id="transform" className="relative bg-vi-bg" style={{ height: "220vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Top fade */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-vi-bg to-transparent z-40 pointer-events-none" />

        {/* Photo layer */}
        <motion.div className="absolute inset-0 z-10" style={{ opacity: photoOpacity, scale: photoScale }}>
          <div className="absolute inset-0 bg-[#1a1510]">
            <Image src="/images/notebook.jpg" alt="Gestión manual" fill className="object-cover" priority />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-vi-bg/80 via-vi-bg/10 to-vi-bg/50" />
        </motion.div>

        {/* Before label */}
        <motion.div style={{ opacity: beforeLabelOpacity }} className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
          <p className="text-[10px] text-vi-body tracking-[0.25em] uppercase font-medium">
            Antes — Excel, cuadernos, calculadora
          </p>
        </motion.div>

        {/* Architecture SVG layer */}
        <motion.div className="absolute inset-0 z-20 flex items-center justify-center" style={{ opacity: svgOpacity, scale: svgScale }}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[480px] h-[480px] rounded-full bg-vi-green/[0.035] blur-[110px]" />
          </div>
          <div className="relative w-full max-w-3xl mx-auto px-8 md:px-20">
            <VInventarioArchitecture />
          </div>
        </motion.div>

        {/* After label */}
        <motion.div style={{ opacity: afterLabelOpacity }} className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none">
          <p className="text-[10px] text-vi-green tracking-[0.25em] uppercase font-medium">
            Ahora — V·Inventario IA · Todo conectado
          </p>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-vi-bg to-transparent z-40 pointer-events-none" />
      </div>
    </section>
  );
}

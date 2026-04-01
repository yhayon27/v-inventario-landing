"use client";
import { motion } from "framer-motion";
import { ClipboardList, Cpu, BarChart3 } from "lucide-react";
import { CpuArchitecture } from "@/components/ui/cpu-architecture";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const E = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    num: "01",
    icon: ClipboardList,
    title: "Tu equipo registra",
    desc: "Cada venta, compra y movimiento se registra con un mensaje de WhatsApp. Sin apps, sin curva de aprendizaje.",
    visual: null,
  },
  {
    num: "02",
    icon: Cpu,
    title: "La IA analiza",
    desc: "Procesa datos en tiempo real: BCV, FEFO, fiados, tendencias. Detecta problemas antes de que sucedan.",
    visual: "cpu",
  },
  {
    num: "03",
    icon: BarChart3,
    title: "Tú decides",
    desc: "Recibes alertas, reportes y recomendaciones. Tomas decisiones con datos, no con intuición.",
    visual: null,
  },
];

export default function FeaturesGrid() {
  return (
    <section className="section-pad relative bg-vi-bg overflow-hidden">
      <div className="hr-fade absolute top-0 inset-x-0" />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: E }}
          className="text-center mb-20"
        >
          <Badge variant="secondary" className="mb-4">Cómo funciona</Badge>
          <h2 className="text-display-sm text-white">3 pasos. Cero fricción.</h2>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-vi-border" />

          <div className="flex flex-col gap-20">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: E }}
                  className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${isEven ? '' : 'md:direction-rtl'}`}
                >
                  {/* Number dot on line */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-vi-surface1 border border-vi-green-border rounded-full items-center justify-center z-10">
                    <span className="text-vi-green text-xs font-display font-bold">{step.num}</span>
                  </div>

                  {/* Text */}
                  <div className={`${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:col-start-2'}`}>
                    <div className={`flex items-center gap-3 mb-3 ${isEven ? 'md:justify-end' : ''}`}>
                      <div className="md:hidden w-8 h-8 bg-vi-green-dim border border-vi-green-border rounded-lg flex items-center justify-center">
                        <span className="text-vi-green text-xs font-bold">{step.num}</span>
                      </div>
                      <Icon size={18} className="text-vi-green" />
                    </div>
                    <h3 className="font-display text-white text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-vi-body text-sm leading-relaxed">{step.desc}</p>
                  </div>

                  {/* Visual */}
                  <div className={`flex justify-center ${isEven ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'}`}>
                    {step.visual === "cpu" ? (
                      <CpuArchitecture />
                    ) : (
                      <Card className="w-[180px] bg-white/5 backdrop-blur-sm border-white/10">
                        <CardContent className="flex items-center justify-center h-[100px]">
                          <Icon size={36} className="text-vi-green/40" />
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="hr-fade absolute bottom-0 inset-x-0" />
    </section>
  );
}

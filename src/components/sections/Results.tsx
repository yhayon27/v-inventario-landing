"use client";
import { motion } from "framer-motion";
import {
  MessageCircle, Package, TrendingUp, Percent, Users, Building2,
  Wifi, Camera, Shield, Calculator,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BentoGrid, BentoItem } from "@/components/ui/bento-grid";

const E = [0.16, 1, 0.3, 1] as const;

const FEATURES = [
  { icon: MessageCircle, title: "WhatsApp IA", desc: "Habla con tu negocio en español natural. Consultas, ventas y alertas 24/7.", size: "lg" as const },
  { icon: Package, title: "FEFO Automático", desc: "Primero en vencer, primero en salir. Cero mermas evitables.", size: "lg" as const },
  { icon: TrendingUp, title: "Tasa BCV", desc: "Actualización automática cada hora. Precios siempre al día.", size: "md" as const },
  { icon: Percent, title: "IGTF Auto", desc: "El 3% se calcula y cobra solo cuando aplica.", size: "md" as const },
  { icon: Users, title: "Fiados IA", desc: "Score de crédito por cliente. Límites y bloqueo automático.", size: "md" as const },
  { icon: Building2, title: "Multi-sucursal", desc: "Hasta 5 locales. Dashboard consolidado y transferencias.", size: "md" as const },
  { icon: Wifi, title: "Venezuela Mode", desc: "Funciona offline. Se sincroniza cuando vuelve la conexión.", size: "sm" as const },
  { icon: Camera, title: "Foto Factura", desc: "Escanea un recibo con la cámara → registro automático.", size: "sm" as const },
  { icon: Shield, title: "Antirrobo", desc: "Detección de mermas sospechosas y movimientos inusuales.", size: "sm" as const },
  { icon: Calculator, title: "Asesor de Precios", desc: "Sugerencias de precio basadas en tasa BCV y competencia.", size: "sm" as const },
];

export default function Results() {
  return (
    <section className="section-pad relative bg-vi-bg overflow-hidden" id="funciones">
      <div className="hr-fade absolute top-0 inset-x-0" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: E }}
          className="text-center mb-16"
        >
          <p className="text-label text-vi-green mb-4">22 funciones integradas</p>
          <h2 className="text-display-sm text-white">Todo lo que necesitas. Nada que te sobre.</h2>
        </motion.div>

        <BentoGrid>
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            const span = f.size === "lg" ? "col-span-2 row-span-2" : f.size === "md" ? "col-span-2 md:col-span-1" : "";
            return (
              <BentoItem key={f.title} index={i} className={span}>
                <SpotlightCard className="h-full">
                  <div className="p-5">
                    <div className="w-9 h-9 bg-vi-green-dim border border-vi-green-border rounded-xl flex items-center justify-center mb-4">
                      <Icon size={16} className="text-vi-green" />
                    </div>
                    <h3 className="font-display text-white font-bold text-sm mb-1.5">{f.title}</h3>
                    <p className="text-vi-muted text-xs leading-relaxed">{f.desc}</p>
                  </div>
                </SpotlightCard>
              </BentoItem>
            );
          })}
        </BentoGrid>
      </div>

      <div className="hr-fade absolute bottom-0 inset-x-0" />
    </section>
  );
}

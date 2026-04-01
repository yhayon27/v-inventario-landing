"use client";
import { motion } from "framer-motion";
import { Zap, Shield, WifiOff, RefreshCw, Users, MapPin } from "lucide-react";
import { E } from "@/lib/animations";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { AnimatedGroup } from "@/components/ui/animated-group";

const FEATURES = [
  { icon: Zap, title: "Respuesta en 3 segundos", desc: "El agente IA responde mas rapido que cualquier empleado. A cualquier hora." },
  { icon: Shield, title: "Seguridad end-to-end", desc: "Tus datos nunca se comparten. Encriptacion en cada mensaje y transaccion." },
  { icon: WifiOff, title: "Funciona sin internet", desc: "Venezuela Mode activo cuando la conexion falla. Sin perder ningun dato." },
  { icon: RefreshCw, title: "BCV siempre actualizado", desc: "La tasa se sincroniza sola. Sin grupos de WhatsApp, sin calculadoras." },
  { icon: Users, title: "Jefe y empleados juntos", desc: "Multi-usuario con permisos. Cada uno ve lo que necesita, nada mas." },
  { icon: MapPin, title: "Hecho para Venezuela", desc: "Entiende el IGTF, el BCV, los fiados y la realidad del comercio local." },
];

export default function WhySection() {
  return (
    <section className="section-pad relative bg-vi-bg overflow-hidden">
      <BackgroundPaths />
      <div className="hr-fade absolute top-0 inset-x-0" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: E }} className="text-center mb-14">
          <Badge variant="secondary" className="mb-4">Diferenciadores</Badge>
          <h2 className="text-display-sm text-white">¿Por qué V·Inventario IA?</h2>
        </motion.div>

        <AnimatedGroup preset="blur-slide" stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-vi-border/50 border border-dashed border-vi-border rounded-2xl overflow-hidden">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <SpotlightCard key={f.title} className="h-full rounded-none border-0">
                <div className="relative bg-vi-surface1 p-6 hover:bg-vi-surface2 transition-colors">
                  <Icon size={24} className="text-vi-green mb-4" strokeWidth={1.5} />
                  <h3 className="text-white text-sm font-semibold mb-2">{f.title}</h3>
                  <p className="text-vi-body text-xs leading-relaxed">{f.desc}</p>
                </div>
              </SpotlightCard>
            );
          })}
        </AnimatedGroup>
      </div>
      <div className="hr-fade absolute bottom-0 inset-x-0" />
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import { MapPin, Clock, Wifi } from "lucide-react";
import { Globe } from "@/components/ui/cobe-globe";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { Badge } from "@/components/ui/badge";

const E = [0.16, 1, 0.3, 1] as const;

const BULLETS = [
  { icon: MapPin, text: "Acceso desde cualquier lugar con WhatsApp" },
  { icon: Clock, text: "Alertas y reportes sin importar la hora" },
  { icon: Wifi, text: "Funciona con señal básica de 2G" },
];

const MARKERS = [
  { id: "ccs",  location: [10.4806,  -66.9036] as [number, number], label: "Caracas" },
  { id: "mara", location: [10.6666,  -71.6333] as [number, number], label: "Maracaibo" },
  { id: "val",  location: [10.1667,  -67.9833] as [number, number], label: "Valencia" },
  { id: "bog",  location: [4.7110,   -74.0721] as [number, number], label: "Bogotá" },
  { id: "mia",  location: [25.7617,  -80.1918] as [number, number], label: "Miami" },
  { id: "cdmx", location: [19.4326,  -99.1332] as [number, number], label: "México" },
  { id: "lima", location: [-12.0464, -77.0428] as [number, number], label: "Lima" },
  { id: "bue",  location: [-34.6037, -58.3816] as [number, number], label: "Bs.Aires" },
  { id: "sao",  location: [-23.5505, -46.6333] as [number, number], label: "São Paulo" },
  { id: "pan",  location: [8.9936,   -79.5197] as [number, number], label: "Panamá" },
  { id: "mad",  location: [40.4168,   -3.7038] as [number, number], label: "Madrid" },
];

const ARCS = [
  { id: "ccs-mia",  from: [10.4806,-66.9036]  as [number,number], to: [25.7617,-80.1918]  as [number,number] },
  { id: "ccs-bog",  from: [10.4806,-66.9036]  as [number,number], to: [4.7110,-74.0721]   as [number,number] },
  { id: "ccs-pan",  from: [10.4806,-66.9036]  as [number,number], to: [8.9936,-79.5197]   as [number,number] },
  { id: "ccs-lima", from: [10.4806,-66.9036]  as [number,number], to: [-12.0464,-77.0428] as [number,number] },
  { id: "ccs-bue",  from: [10.4806,-66.9036]  as [number,number], to: [-34.6037,-58.3816] as [number,number] },
  { id: "mia-cdmx", from: [25.7617,-80.1918]  as [number,number], to: [19.4326,-99.1332]  as [number,number] },
  { id: "bue-sao",  from: [-34.6037,-58.3816] as [number,number], to: [-23.5505,-46.6333] as [number,number] },
  { id: "mia-mad",  from: [25.7617,-80.1918]  as [number,number], to: [40.4168,-3.7038]   as [number,number] },
];

export default function GlobalSection() {
  return (
    <section className="section-pad relative bg-vi-bg overflow-hidden" id="global">
      <div className="hr-fade absolute top-0 inset-x-0" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: E }}
          >
            <AnimatedGroup preset="blur-slide" stagger={0.1} className="flex flex-col items-start gap-5">
              <Badge variant="secondary">Disponible 24/7</Badge>

              <h2 className="text-display-sm text-white">
                Tu negocio no duerme.{"\n"}Tú tampoco deberías preocuparte.
              </h2>

              <p className="text-vi-body text-base leading-relaxed max-w-md">
                V-Inventario IA opera desde cualquier punto. Desde Caracas
                hasta donde tu negocio te lleve — tus números siempre
                contigo, en tiempo real.
              </p>

              <div className="flex flex-col gap-3 mt-2">
                {BULLETS.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.text} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-vi-green-dim border border-vi-green-border rounded-lg flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-vi-green" />
                      </div>
                      <span className="text-vi-body text-sm">{b.text}</span>
                    </div>
                  );
                })}
              </div>
            </AnimatedGroup>
          </motion.div>

          {/* Right — Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: E }}
            className="relative w-full max-w-[500px] aspect-square mx-auto will-change-transform"
          >
            <div className="absolute inset-0 rounded-full bg-vi-green/10 blur-[80px] pointer-events-none z-0" />

            <Globe
              className="w-full"
              markers={MARKERS}
              arcs={ARCS}
              markerColor={[0.2, 0.85, 0.4]}
              baseColor={[0.05, 0.05, 0.05]}
              arcColor={[0.2, 0.85, 0.4]}
              glowColor={[0.15, 0.7, 0.3]}
              dark={1}
              mapBrightness={6}
              mapSamples={16000}
              markerSize={0.04}
              markerElevation={0.01}
              arcWidth={0.5}
              arcHeight={0.25}
              diffuse={1.2}
              speed={0.004}
              theta={0.25}
            />
          </motion.div>
        </div>
      </div>

      <div className="hr-fade absolute bottom-0 inset-x-0" />
    </section>
  );
}

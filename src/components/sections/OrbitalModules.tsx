"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Package, ShoppingCart, TrendingUp, Users, Percent,
  Layers, AlertTriangle, MessageCircle, Receipt, Truck, Shield, Eye,
} from "lucide-react";
import { RadialOrbitalTimeline, type TimelineItem } from "@/components/ui/radial-orbital-timeline";
import { Badge } from "@/components/ui/badge";

const E = [0.16, 1, 0.3, 1] as const;

const MÓDULOS: TimelineItem[] = [
  { id: 1,  title: "Inventario",  date: "Core",     content: "Control por lotes con método FEFO. Alertas de vencimiento automáticas.",              category: "Core",      icon: Package,       relatedIds: [2, 6],     status: "completed",   energy: 100 },
  { id: 2,  title: "POS",         date: "Core",     content: "Punto de venta multi-método de pago. USD, bolívares, transferencia, Zelle.",           category: "Core",      icon: ShoppingCart,  relatedIds: [1, 5],     status: "completed",   energy: 95 },
  { id: 3,  title: "Tasa BCV",    date: "Auto",     content: "Actualización automática cada hora. Precios siempre al día.",                         category: "Auto",      icon: TrendingUp,    relatedIds: [1, 2],     status: "completed",   energy: 90 },
  { id: 4,  title: "Fiados",      date: "Crédito",  content: "Límites por cliente, score de crédito, bloqueo automático.",                          category: "Crédito",   icon: Users,         relatedIds: [2, 11],    status: "completed",   energy: 85 },
  { id: 5,  title: "IGTF Auto",   date: "Impuesto", content: "El 3% se calcula y cobra solo cuando aplica.",                                       category: "Impuesto",  icon: Percent,       relatedIds: [2],        status: "completed",   energy: 80 },
  { id: 6,  title: "Lotes FEFO",  date: "Stock",    content: "Primero en vencer, primero en salir. Cero mermas evitables.",                        category: "Stock",     icon: Layers,        relatedIds: [1, 7],     status: "completed",   energy: 75 },
  { id: 7,  title: "Mermas",      date: "Pérdidas", content: "Registro completo de daños y pérdidas con trazabilidad.",                            category: "Control",   icon: AlertTriangle, relatedIds: [6],        status: "completed",   energy: 70 },
  { id: 8,  title: "WhatsApp IA", date: "IA 24/7",  content: "Habla con tu negocio en español natural. Respuestas en tiempo real.",                category: "IA",        icon: MessageCircle, relatedIds: [1, 2, 3, 4], status: "in-progress", energy: 100 },
  { id: 9,  title: "Gastos",      date: "Finanzas", content: "Control de gastos operativos. Rentabilidad real del negocio.",                       category: "Finanzas",  icon: Receipt,       relatedIds: [2],        status: "completed",   energy: 65 },
  { id: 10, title: "Proveedores", date: "Compras",  content: "Cuentas por pagar, historial y alertas de vencimiento.",                             category: "Crédito",   icon: Truck,         relatedIds: [1, 9],     status: "completed",   energy: 60 },
  { id: 11, title: "Roles",       date: "Acceso",   content: "Dueño, administrador, cajero. Permisos granulares.",                                 category: "Seguridad", icon: Shield,        relatedIds: [12],       status: "completed",   energy: 55 },
  { id: 12, title: "Auditoría",   date: "Control",  content: "Cada acción registrada con usuario, fecha y hora exacta.",                           category: "Control",   icon: Eye,           relatedIds: [11],       status: "completed",   energy: 50 },
];

export default function OrbitalModules() {
  const [mobileHint, setMobileHint] = useState(true);

  // Auto-hide mobile hint after 3s
  useEffect(() => {
    const t = setTimeout(() => setMobileHint(false), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="section-pad relative bg-vi-bg overflow-hidden" id="modulos-orbital">
      <div className="hr-fade absolute top-0 inset-x-0" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: E }}
          className="text-center mb-4"
        >
          <Badge variant="secondary" className="mb-4">Ecosistema</Badge>
          <h2 className="text-display-sm text-white mb-3">12 módulos conectados.</h2>
          <p className="text-vi-sub text-sm max-w-md mx-auto">
            Haz clic en cualquier módulo para explorar cómo se integra con el resto.
          </p>
        </motion.div>

        {/* Instruction label — desktop */}
        <p className="hidden lg:block text-center text-vi-green text-[10px] tracking-[0.15em] uppercase mb-10 animate-pulse">
          Toca cada módulo para ver su función →
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: E }}
          className="flex justify-center"
        >
          <RadialOrbitalTimeline timelineData={MÓDULOS} />
        </motion.div>

        {/* Mobile swipe hint */}
        {mobileHint && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden text-center text-vi-green text-[10px] tracking-[0.15em] uppercase mt-6 animate-pulse"
          >
            Toca para explorar ↓
          </motion.p>
        )}
      </div>

      <div className="hr-fade absolute bottom-0 inset-x-0" />
    </section>
  );
}

"use client";
import { TrendingUp, AlertTriangle, Package, DollarSign } from "lucide-react";
import { ScrollExpandMedia } from "@/components/ui/scroll-expansion-hero";

const METRICS = [
  { label: "Ventas hoy", value: "$1,247", sub: "+12% vs ayer", color: "text-vi-green" },
  { label: "Tasa BCV", value: "Bs 36.50", sub: "Hace 8 min", color: "text-white" },
  { label: "Alertas", value: "3", sub: "Stock bajo", color: "text-vi-orange" },
];

const ALERTS = [
  { icon: AlertTriangle, text: "Arroz Mary 1kg — vence en 2 días", urgent: true },
  { icon: Package, text: "Harina PAN — stock mínimo alcanzado", urgent: true },
  { icon: DollarSign, text: "Cliente J. Pérez — fiado vencido hace 5 días", urgent: false },
  { icon: TrendingUp, text: "Margen de ganancia subió 3.2% esta semana", urgent: false },
];

function DashboardMockup() {
  return (
    <div className="bg-vi-surface1 overflow-hidden min-h-[70vh]" style={{ boxShadow: "0 0 0 1px #2e2e32, 0 20px 60px rgba(0,0,0,0.5)" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-vi-surface-up border-b border-vi-border">
        <div className="flex items-center gap-2">
          <span className="font-display text-xs font-bold text-white"><span className="text-vi-green">V·</span>Inventario</span>
          <span className="text-[10px] text-vi-sub">Dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2 py-0.5 bg-vi-green-dim border border-vi-green-border rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-vi-green animate-pulse" />
            <span className="text-[9px] text-vi-green font-semibold">EN VIVO</span>
          </span>
          <span className="px-2 py-0.5 bg-vi-green-dim border border-vi-green-border rounded-full text-[10px] text-vi-green">BCV: Bs 36.50</span>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-3 gap-3 p-5">
        {METRICS.map((m) => (
          <div key={m.label} className="bg-vi-surface-up border border-vi-border rounded-xl p-4">
            <p className="text-[10px] text-vi-sub mb-1">{m.label}</p>
            <p className={`font-display text-xl font-extrabold ${m.color}`}>{m.value}</p>
            <p className="text-[9px] text-vi-muted mt-0.5">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="px-5 pb-4">
        <div className="bg-vi-surface1 border border-vi-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] text-vi-sub">Ventas últimos 7 días</span>
            <span className="text-[10px] text-vi-green font-semibold">+18.3%</span>
          </div>
          <svg className="w-full h-16" viewBox="0 0 300 60" fill="none">
            <defs>
              <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            <line x1="0" y1="15" x2="300" y2="15" stroke="#2e2e32" strokeWidth="0.5" />
            <line x1="0" y1="30" x2="300" y2="30" stroke="#2e2e32" strokeWidth="0.5" />
            <line x1="0" y1="45" x2="300" y2="45" stroke="#2e2e32" strokeWidth="0.5" />
            <path d="M0 50 L50 38 L100 42 L150 25 L200 30 L250 15 L300 8 L300 60 L0 60 Z" fill="url(#cg)" />
            <path d="M0 50 L50 38 L100 42 L150 25 L200 30 L250 15 L300 8" stroke="#22c55e" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>

      {/* Alerts */}
      <div className="px-5 pb-5">
        <p className="text-[10px] text-vi-sub mb-2">Alertas IA</p>
        <div className="flex flex-col gap-1.5">
          {ALERTS.map((a, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2 bg-vi-surface2 border border-vi-border rounded-lg">
              <a.icon size={12} className={a.urgent ? "text-vi-orange" : "text-vi-green"} />
              <span className="text-[11px] text-vi-body">{a.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ModulesSection() {
  return (
    <section id="modulos">
      <ScrollExpandMedia
        title="Dashboard"
        subtitle="Tu panel de control. En tiempo real."
      >
        <DashboardMockup />
      </ScrollExpandMedia>
    </section>
  );
}

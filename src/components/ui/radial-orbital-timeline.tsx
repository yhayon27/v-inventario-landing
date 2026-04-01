"use client";
import { useState, type ElementType } from "react";
import { motion, AnimatePresence } from "framer-motion";

const E = [0.16, 1, 0.3, 1] as const;

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface Props {
  timelineData: TimelineItem[];
}

const ORBITS = [
  { r: 100, items: [0, 1, 2, 3] },
  { r: 175, items: [4, 5, 6, 7] },
  { r: 248, items: [8, 9, 10, 11] },
];

function getPos(r: number, i: number, total: number, offset = 0) {
  const angle = (i / total) * 2 * Math.PI + offset;
  return { x: Math.cos(angle) * r, y: Math.sin(angle) * r };
}

export function RadialOrbitalTimeline({ timelineData }: Props) {
  const [selected, setSelected] = useState<TimelineItem | null>(null);

  const allPositions: Array<{ item: TimelineItem; x: number; y: number }> = [];
  ORBITS.forEach((orbit) => {
    orbit.items.forEach((idx, i) => {
      const item = timelineData[idx];
      if (!item) return;
      const off = orbit.r === 100 ? Math.PI / 4 : orbit.r === 175 ? 0 : Math.PI / 6;
      const { x, y } = getPos(orbit.r, i, orbit.items.length, off);
      allPositions.push({ item, x, y });
    });
  });

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center justify-center w-full">
      {/* SVG — desktop */}
      <div className="hidden lg:block relative w-[580px] h-[580px] shrink-0">
        <svg width="580" height="580" viewBox="-290 -290 580 580" className="overflow-visible">
          {/* Orbit rings */}
          {ORBITS.map((o) => (
            <circle key={o.r} cx="0" cy="0" r={o.r} fill="none" stroke="#2e2e32" strokeWidth="1" />
          ))}

          {/* Connection lines */}
          {selected && allPositions
            .filter((p) => selected.relatedIds.includes(p.item.id))
            .map(({ item, x, y }) => {
              const origin = allPositions.find((p) => p.item.id === selected.id);
              if (!origin) return null;
              return (
                <line key={`l-${item.id}`}
                  x1={origin.x} y1={origin.y} x2={x} y2={y}
                  stroke="#22c55e" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="4 4" />
              );
            })}

          {/* Nodes */}
          {allPositions.map(({ item, x, y }) => {
            const Icon = item.icon;
            const isSel = selected?.id === item.id;
            const isRel = selected?.relatedIds.includes(item.id) ?? false;
            return (
              <g key={item.id} transform={`translate(${x}, ${y})`}
                onClick={() => setSelected(isSel ? null : item)}
                style={{ cursor: "pointer" }}>
                {/* Pulse ring for interactivity hint */}
                {!selected && (
                  <circle r="24" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.3">
                    <animate attributeName="r" values="22;28;22" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle r="20"
                  fill={isSel ? "#22c55e" : isRel ? "rgba(34,197,94,0.15)" : "#161618"}
                  stroke={isSel ? "#22c55e" : isRel ? "rgba(34,197,94,0.4)" : "#2e2e32"}
                  strokeWidth="1.5"
                  style={{ transition: "fill 0.2s, stroke 0.2s" }} />
                <foreignObject x="-8" y="-8" width="16" height="16">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <Icon size={11} color={isSel ? "#000" : isRel ? "#22c55e" : "#888"} />
                  </div>
                </foreignObject>
                <text y="32" textAnchor="middle" fontSize="8"
                  fill={isSel ? "#22c55e" : "#999"} fontFamily="DM Sans, system-ui">
                  {item.title}
                </text>
              </g>
            );
          })}

          {/* Center orb — GREEN not purple */}
          <circle cx="0" cy="0" r="26" fill="#161618" stroke="rgba(34,197,94,0.25)" strokeWidth="1.5" />
          <text x="0" y="-3" textAnchor="middle" fontSize="7" fill="#22c55e" fontFamily="Syne, system-ui" fontWeight="700">V·INV</text>
          <text x="0" y="7" textAnchor="middle" fontSize="6" fill="#888890" fontFamily="DM Sans, system-ui">IA</text>
        </svg>

        {/* Detail panel */}
        <AnimatePresence>
          {selected && (
            <motion.div key={selected.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.25, ease: E }}
              className="absolute top-1/2 -translate-y-1/2 left-[calc(100%+1rem)] w-56 bg-vi-surface1 border border-vi-border rounded-2xl p-4">
              <p className="text-[10px] text-vi-green font-medium tracking-widest uppercase mb-1.5">{selected.category}</p>
              <h3 className="font-display text-white text-base font-bold mb-0.5">{selected.title}</h3>
              <p className="text-[10px] text-vi-body mb-2">{selected.date}</p>
              <p className="text-xs text-vi-body leading-relaxed">{selected.content}</p>
              {selected.status === "in-progress" && (
                <div className="mt-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-vi-green animate-pulse" />
                  <span className="text-[9px] text-vi-green">En desarrollo</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile list */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full px-4">
        {timelineData.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div key={item.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03, ease: E }}
              className={`border rounded-xl p-3.5 cursor-pointer transition-all duration-200 ${
                selected?.id === item.id
                  ? "bg-[#1a1a1c] border-vi-green/40 border-l-[3px] border-l-vi-green shadow-[0_0_15px_rgba(34,197,94,0.08)] scale-[1.02]"
                  : "bg-vi-surface1 border-vi-border hover:border-vi-green-border hover:bg-[#1a1a1c] hover:border-l-[3px] hover:border-l-vi-green"
              }`}
              onClick={() => setSelected(selected?.id === item.id ? null : item)}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-vi-green-dim border border-vi-green-border flex items-center justify-center shrink-0">
                    <Icon size={13} color="#22c55e" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white">{item.title}</p>
                    <p className="text-[9px] text-vi-muted uppercase tracking-wider">{item.category}</p>
                  </div>
                </div>
                <span className={`text-[8px] text-vi-green transition-opacity ${selected?.id === item.id ? "opacity-0" : "opacity-60"}`}>
                  Ver función →
                </span>
              </div>
              <AnimatePresence>
                {selected?.id === item.id && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                    className="text-[11px] text-vi-body leading-relaxed overflow-hidden pt-1">
                    {item.content}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

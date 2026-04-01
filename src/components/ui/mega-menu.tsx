"use client";
import { useState, useRef, type ElementType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MegaMenuSubItem {
  label: string;
  description: string;
  icon: ElementType;
}

export interface MegaMenuSubMenu {
  title: string;
  items: MegaMenuSubItem[];
}

export interface MegaMenuItem {
  id: number;
  label: string;
  link?: string;
  subMenus?: MegaMenuSubMenu[];
}

interface Props {
  items: MegaMenuItem[];
  className?: string;
}

export default function MegaMenu({ items, className }: Props) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = (id: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredId(id);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setHoveredId(null), 150);
  };

  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {items.map((item) => (
        <li
          key={item.id}
          className="relative"
          onMouseEnter={() => handleEnter(item.id)}
          onMouseLeave={handleLeave}
        >
          {item.link ? (
            <a
              href={item.link}
              className={cn(
                "relative px-3 py-1.5 text-[13px] rounded-lg transition-colors cursor-pointer",
                hoveredId === item.id ? "text-white" : "text-white/50 hover:text-white/80"
              )}
            >
              {hoveredId === item.id && (
                <motion.span
                  layoutId="mega-hover-bg"
                  className="absolute inset-0 bg-white/[0.06] rounded-lg"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </a>
          ) : (
            <button
              className={cn(
                "relative px-3 py-1.5 text-[13px] rounded-lg transition-colors cursor-pointer",
                hoveredId === item.id ? "text-white" : "text-white/50 hover:text-white/80"
              )}
            >
              {hoveredId === item.id && (
                <motion.span
                  layoutId="mega-hover-bg"
                  className="absolute inset-0 bg-white/[0.06] rounded-lg"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1">
                {item.label}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="opacity-50">
                  <path d="M2 4l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </button>
          )}

          {/* Dropdown */}
          <AnimatePresence>
            {item.subMenus && hoveredId === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50"
                onMouseEnter={() => handleEnter(item.id)}
                onMouseLeave={handleLeave}
              >
                <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4 shadow-2xl min-w-[420px]">
                  <div className="grid grid-cols-2 gap-6">
                    {item.subMenus.map((sub) => (
                      <div key={sub.title}>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest mb-3 px-2">{sub.title}</p>
                        <div className="flex flex-col gap-0.5">
                          {sub.items.map((subItem) => {
                            const Icon = subItem.icon;
                            return (
                              <a
                                key={subItem.label}
                                href={`#${subItem.label.toLowerCase().replace(/\s+/g, "-")}`}
                                className="flex items-start gap-3 px-2 py-2 rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer group"
                              >
                                <div className="w-7 h-7 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 mt-0.5 group-hover:border-vi-green/30 transition-colors">
                                  <Icon size={13} className="text-vi-green" />
                                </div>
                                <div>
                                  <p className="text-white text-xs font-medium">{subItem.label}</p>
                                  <p className="text-white/40 text-[10px] leading-relaxed">{subItem.description}</p>
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
}

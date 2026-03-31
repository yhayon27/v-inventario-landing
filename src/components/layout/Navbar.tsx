"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Inicio", href: "#inicio" },
  { label: "Módulos", href: "#modulos" },
  { label: "Demo", href: "#demo" },
  { label: "Precios", href: "#precios" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-vi-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-1.5 cursor-pointer">
          <span className="font-display text-sm font-bold text-white">
            <span className="text-vi-green">V·</span>Inventario
            <span className="text-vi-body font-normal ml-1">IA</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV.map((l) => (
            <a key={l.label} href={l.href} className="text-[13px] text-vi-body hover:text-white transition-colors cursor-pointer">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="#precios" className="text-[13px] text-vi-body hover:text-white transition-colors cursor-pointer">
            Iniciar sesión
          </a>
          <a href="#contacto" className="px-4 py-1.5 rounded-lg bg-vi-green text-black text-[13px] font-semibold hover:bg-green-400 transition-colors cursor-pointer">
            Empieza gratis
          </a>
        </div>

        <button className="md:hidden text-vi-body hover:text-white transition-colors cursor-pointer" onClick={() => setOpen(!open)} aria-label="Menú">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="md:hidden glass border-t border-vi-border px-6 py-4 flex flex-col gap-4">
          {NAV.map((l) => (
            <a key={l.label} href={l.href} className="text-sm text-vi-body hover:text-white transition-colors cursor-pointer" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#contacto" className="px-4 py-2 rounded-lg bg-vi-green text-black text-sm font-semibold text-center cursor-pointer" onClick={() => setOpen(false)}>
            Empieza gratis
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}

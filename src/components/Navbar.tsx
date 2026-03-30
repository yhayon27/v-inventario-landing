"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Funciones", href: "#funciones" },
  { label: "Escenarios", href: "#escenarios" },
  { label: "Precios", href: "#precios" },
];

const E = [0.16, 1, 0.3, 1] as const;

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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: E, delay: 0.1 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-5 h-5 border border-brand-accent rounded flex items-center justify-center">
            <span className="text-[8px] font-black text-brand-accent leading-none">VI</span>
          </div>
          <span className="text-sm font-semibold text-white tracking-tight">
            V-Inventario
            <span className="text-brand-muted font-normal"> IA</span>
          </span>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV.map((l) => (
            <a key={l.label} href={l.href}
              className="text-sm text-brand-muted hover:text-white transition-colors duration-200">
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="#precios" className="text-sm text-brand-muted hover:text-white transition-colors">
            Iniciar sesión
          </a>
          <a href="#precios"
            className="px-4 py-1.5 rounded-lg bg-brand-accent text-black text-sm font-semibold hover:bg-cyan-300 transition-colors duration-200">
            Demo gratis
          </a>
        </div>

        <button className="md:hidden text-brand-muted hover:text-white transition-colors"
          onClick={() => setOpen(!open)}>
          {open ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </div>

      {open && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass border-t border-brand-border px-6 py-4 flex flex-col gap-4">
          {NAV.map((l) => (
            <a key={l.label} href={l.href}
              className="text-sm text-brand-muted hover:text-white transition-colors"
              onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href="#precios"
            className="px-4 py-2 rounded-lg bg-brand-accent text-black text-sm font-semibold text-center"
            onClick={() => setOpen(false)}>Demo gratis</a>
        </motion.div>
      )}
    </motion.nav>
  );
}

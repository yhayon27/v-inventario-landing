"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Package, Users, ShoppingCart, TrendingUp, Bell, BarChart3 } from "lucide-react";
import MegaMenu from "@/components/ui/mega-menu";
import type { MegaMenuItem } from "@/components/ui/mega-menu";
import { Button } from "@/components/ui/button";

const NAV_ITEMS: MegaMenuItem[] = [
  {
    id: 1,
    label: "Módulos",
    subMenus: [
      {
        title: "Gestión",
        items: [
          { label: "Inventario IA", description: "Registra con foto, controla por voz", icon: Package },
          { label: "Fiados", description: "Créditos y cobros automáticos", icon: Users },
          { label: "Ventas", description: "Registra cada venta por WhatsApp", icon: ShoppingCart },
        ],
      },
      {
        title: "Inteligencia",
        items: [
          { label: "Tasa BCV", description: "Actualización automática diaria", icon: TrendingUp },
          { label: "Alertas IA", description: "Avisa antes de que el stock falle", icon: Bell },
          { label: "Reportes", description: "Resumen diario a las 9pm sin pedirlo", icon: BarChart3 },
        ],
      },
    ],
  },
  { id: 2, label: "Demo", link: "#demo" },
  { id: 3, label: "Precios", link: "#precios" },
  { id: 4, label: "Contacto", link: "#contacto" },
];

const MOBILE_LINKS = [
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
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-1.5 cursor-pointer">
          <span className="font-display text-sm font-bold text-white">
            <span className="text-vi-green">V·</span>Inventario
            <span className="text-vi-body font-normal ml-1">IA</span>
          </span>
        </a>

        {/* Desktop — MegaMenu */}
        <div className="hidden md:block">
          <MegaMenu items={NAV_ITEMS} />
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#precios" className="text-[13px] text-vi-body hover:text-white transition-colors cursor-pointer">
            Iniciar sesión
          </a>
          <Button size="sm" asChild>
            <a href="#contacto">Empieza gratis</a>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-vi-body hover:text-white transition-colors cursor-pointer" onClick={() => setOpen(!open)} aria-label="Menú">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="md:hidden glass border-t border-vi-border px-6 py-4 flex flex-col gap-4">
          {MOBILE_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="text-sm text-vi-body hover:text-white transition-colors cursor-pointer" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <Button size="sm" asChild className="text-center">
            <a href="#contacto" onClick={() => setOpen(false)}>Empieza gratis</a>
          </Button>
        </motion.div>
      )}
    </motion.nav>
  );
}

"use client";
import { MessageCircle, Instagram, Mail } from "lucide-react";

const SOCIALS = [
  { icon: MessageCircle, label: "WhatsApp", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:hola@vinventario.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-vi-border bg-vi-bg">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="font-display text-sm font-bold text-white">
            <span className="text-vi-green">V·</span>Inventario <span className="text-vi-muted font-normal">IA</span>
          </span>
          <span className="text-vi-subtle text-xs">Hecho en Venezuela 🇻🇪</span>
        </div>

        <div className="flex items-center gap-6">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label} className="text-vi-muted hover:text-vi-green transition-colors cursor-pointer">
              <s.icon size={16} />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 text-[10px] text-vi-subtle">
          <a href="#" className="hover:text-white transition-colors cursor-pointer">Privacidad</a>
          <a href="#" className="hover:text-white transition-colors cursor-pointer">Términos</a>
          <span>© 2025 V·Inventario IA</span>
        </div>
      </div>
    </footer>
  );
}

"use client";
import { MessageCircle, Instagram, Mail } from "lucide-react";

const SOCIALS = [
  { icon: MessageCircle, label: "WhatsApp", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:yhayon27@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-vi-border bg-vi-bg">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <div className="flex items-center gap-3">
              <span className="font-display text-sm font-bold text-white">
                <span className="text-vi-green">V·</span>Inventario <span className="text-vi-body font-normal">IA</span>
              </span>
              <span className="text-vi-muted text-xs">Hecho en Venezuela 🇻🇪</span>
            </div>
            <p className="text-vi-muted text-xs">Gestión de inventarios para pequeños negocios</p>
          </div>

          <div className="flex items-center gap-6">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="text-vi-body hover:text-vi-green transition-colors cursor-pointer">
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-vi-border pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-[11px] text-vi-muted">
            <a href="/privacidad" className="hover:text-white transition-colors cursor-pointer">Política de Privacidad</a>
            <a href="/terminos" className="hover:text-white transition-colors cursor-pointer">Términos de Servicio</a>
            <a href="mailto:yhayon27@gmail.com" className="hover:text-white transition-colors cursor-pointer">Contacto</a>
          </div>
          <span className="text-[11px] text-vi-muted">© {new Date().getFullYear()} V·Inventario IA</span>
        </div>
      </div>
    </footer>
  );
}

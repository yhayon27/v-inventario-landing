"use client";

import { MessageCircle, Mail, Instagram, Twitter } from "lucide-react";

const links = {
  Producto: ["Funciones", "Módulos", "Precios", "WhatsApp IA"],
  Empresa: ["Sobre nosotros", "Blog", "Casos de éxito"],
  Soporte: ["Documentación", "Centro de ayuda", "Contacto"],
  Legal: ["Términos de uso", "Privacidad"],
};

const socials = [
  { icon: MessageCircle, label: "WhatsApp", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:hola@vinventario.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-base">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded border border-brand-accent flex items-center justify-center">
                <span className="text-[9px] font-black text-brand-accent">VI</span>
              </div>
              <span className="font-semibold text-sm text-white">
                V-Inventario <span className="text-brand-secondary font-normal">IA</span>
              </span>
            </div>
            <p className="text-sm text-brand-secondary leading-relaxed mb-6 max-w-xs" style={{ fontWeight: 300 }}>
              El sistema de gestión empresarial diseñado para la realidad del comercio venezolano.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-7 h-7 rounded border border-brand-border flex items-center justify-center text-brand-secondary hover:text-brand-accent hover:border-brand-accent/40 transition-all duration-200"
                >
                  <s.icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([cat, items]) => (
            <div key={cat}>
              <h4 className="text-[10px] font-semibold text-white uppercase tracking-widest mb-4">{cat}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-xs text-brand-secondary hover:text-white transition-colors" style={{ fontWeight: 300 }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-brand-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-secondary" style={{ fontWeight: 300 }}>
            © {new Date().getFullYear()} V-Inventario IA. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2 text-xs text-brand-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse-slow inline-block" />
            Todos los sistemas operativos
          </div>
        </div>
      </div>
    </footer>
  );
}

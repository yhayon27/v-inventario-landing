import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "V·Inventario IA — Gestión Inteligente para tu Negocio",
  description: "El sistema de gestión por WhatsApp diseñado para la realidad venezolana. Tasa BCV automática, IGTF, fiados, FEFO y tu negocio disponible 24/7.",
  keywords: ["inventario", "venezuela", "BCV", "IGTF", "fiados", "whatsapp", "gestión", "negocio", "IA"],
  openGraph: {
    title: "V·Inventario IA — Gestión Inteligente para tu Negocio",
    description: "El sistema que pone a los comerciantes venezolanos en control total.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-vi-bg text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

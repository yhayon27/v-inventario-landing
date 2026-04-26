import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL("https://v-inventario-landing.vercel.app"),
  title: "V·Inventario IA — Gestión de inventarios para pequeños negocios",
  description:
    "Sistema SaaS multi-tenant de gestión de inventarios para pequeños y micro negocios. Bot de WhatsApp, dual-currency USD/VES, FEFO, control de fiado y multi-sucursal.",
  keywords: [
    "inventario",
    "WhatsApp Business",
    "Venezuela",
    "pequeños negocios",
    "SaaS",
    "gestión",
    "FEFO",
    "fiado",
    "USD VES",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "V·Inventario IA — Gestión de inventarios para pequeños negocios",
    description:
      "Sistema SaaS multi-tenant de gestión de inventarios para pequeños y micro negocios. Bot de WhatsApp, dual-currency USD/VES, FEFO, control de fiado y multi-sucursal.",
    url: "https://v-inventario-landing.vercel.app",
    siteName: "V·Inventario IA",
    locale: "es_VE",
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
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "V-Inventario IA — Control Total para tu Minimarket",
  description:
    "El sistema de gestión empresarial diseñado para la realidad venezolana. Tasa BCV automática, IGTF, fiados, lotes con FEFO y tu negocio en WhatsApp las 24 horas.",
  keywords: ["inventario", "minimarket", "venezuela", "BCV", "IGTF", "fiados", "gestión"],
  openGraph: {
    title: "V-Inventario IA — Control Total para tu Minimarket",
    description: "El sistema que pone a los dueños de minimarket venezolanos en control total de su negocio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-brand-navy text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

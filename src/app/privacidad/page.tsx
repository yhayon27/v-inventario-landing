import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidad — V·Inventario IA",
  description: "Política de Privacidad de V·Inventario IA. Cómo recolectamos, usamos y protegemos los datos de los negocios que usan nuestra plataforma.",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <main className="bg-vi-bg min-h-screen">
      <Navbar />
      <article className="section-pad">
        <div className="max-w-3xl mx-auto px-6 pt-16">
          <h1 className="font-display text-white text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Política de Privacidad
          </h1>
          <p className="text-vi-muted text-sm mb-12">Última actualización: 26 de abril de 2026</p>

          <div className="flex flex-col gap-10 text-vi-body text-base leading-relaxed">
            <section>
              <h2 className="font-display text-white text-xl font-bold mb-3">1. Identificación del responsable</h2>
              <p>
                V·Inventario IA es una plataforma SaaS de gestión de inventarios para pequeños y micro negocios. Para
                cualquier consulta sobre esta política puedes escribirnos a{" "}
                <a href="mailto:yhayon27@gmail.com" className="text-vi-green hover:underline">yhayon27@gmail.com</a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-white text-xl font-bold mb-3">2. Datos que recolectamos</h2>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li>Datos de cuenta: email, nombre, número de WhatsApp del responsable del negocio.</li>
                <li>Datos del negocio: nombre comercial, dirección, productos, inventario, ventas, clientes, proveedores que el cliente carga a la plataforma.</li>
                <li>Datos de uso: logs de auditoría, accesos, acciones realizadas dentro del sistema.</li>
                <li>Datos técnicos: IP, navegador, dispositivo, métricas de rendimiento.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-white text-xl font-bold mb-3">3. Finalidad del tratamiento</h2>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li>Operar el servicio (gestión de inventario, alertas WhatsApp, reportes).</li>
                <li>Brindar soporte técnico y atención al cliente.</li>
                <li>Mejorar el producto mediante analytics agregados y anónimos.</li>
                <li>Cumplir obligaciones legales aplicables.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-white text-xl font-bold mb-3">4. Compartición de datos con terceros</h2>
              <p className="mb-3">
                Compartimos datos exclusivamente con proveedores de infraestructura necesarios para operar el servicio:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li>Supabase (base de datos, hospedada en Estados Unidos)</li>
                <li>Railway (hosting del backend, Estados Unidos)</li>
                <li>Vercel (hosting del frontend, Estados Unidos)</li>
                <li>Meta Platforms (mensajería WhatsApp Business)</li>
                <li>Anthropic (procesamiento de inteligencia artificial cuando aplica)</li>
              </ul>
              <p className="mt-3">No vendemos datos a terceros ni los usamos para publicidad.</p>
            </section>

            <section>
              <h2 className="font-display text-white text-xl font-bold mb-3">5. Seguridad</h2>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li>Comunicaciones cifradas en tránsito (HTTPS/TLS).</li>
                <li>Cifrado en reposo a nivel de base de datos.</li>
                <li>Aislamiento multi-tenant mediante Row Level Security (RLS): los datos de cada negocio son inaccesibles para otros negocios.</li>
                <li>Auditoría de accesos y cambios.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-white text-xl font-bold mb-3">6. Derechos del usuario</h2>
              <p className="mb-3">
                Puedes ejercer los siguientes derechos escribiendo a{" "}
                <a href="mailto:yhayon27@gmail.com" className="text-vi-green hover:underline">yhayon27@gmail.com</a>:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li>Acceso a tus datos</li>
                <li>Rectificación de datos incorrectos</li>
                <li>Eliminación de tu cuenta y datos asociados</li>
                <li>Portabilidad (exportación de tus datos)</li>
                <li>Oposición al tratamiento</li>
              </ul>
              <p className="mt-3">Responderemos en un plazo máximo de 30 días.</p>
            </section>

            <section>
              <h2 className="font-display text-white text-xl font-bold mb-3">7. Menores de edad</h2>
              <p>El servicio no está dirigido a menores de 18 años. No recolectamos conscientemente datos de menores.</p>
            </section>

            <section>
              <h2 className="font-display text-white text-xl font-bold mb-3">8. Retención de datos</h2>
              <p>
                Conservamos los datos mientras la cuenta esté activa. Tras la cancelación, eliminamos los datos en un
                plazo máximo de 90 días, salvo obligación legal de retención mayor.
              </p>
            </section>

            <section>
              <h2 className="font-display text-white text-xl font-bold mb-3">9. Cookies y tecnologías similares</h2>
              <p>
                Utilizamos cookies estrictamente necesarias para el funcionamiento del sitio y la sesión del usuario.
                No usamos cookies de terceros con fines publicitarios.
              </p>
            </section>

            <section>
              <h2 className="font-display text-white text-xl font-bold mb-3">10. Cambios a esta política</h2>
              <p>
                Podemos actualizar esta política. Notificaremos cambios sustanciales por email a las cuentas activas.
                La fecha de "última actualización" refleja la versión vigente.
              </p>
            </section>

            <section>
              <h2 className="font-display text-white text-xl font-bold mb-3">11. Contacto</h2>
              <p>
                <a href="mailto:yhayon27@gmail.com" className="text-vi-green hover:underline">yhayon27@gmail.com</a>
              </p>
            </section>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}

import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Términos de Servicio — V·Inventario IA",
  description: "Términos de Servicio de V·Inventario IA. Condiciones de uso de la plataforma SaaS de gestión de inventarios.",
  alternates: { canonical: "/terminos" },
};

export default function TerminosPage() {
  return (
    <main className="bg-vi-bg min-h-screen">
      <Navbar />
      <article className="section-pad">
        <div className="max-w-3xl mx-auto px-6 pt-16">
          <h1 className="font-display text-white text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Términos de Servicio
          </h1>
          <p className="text-vi-muted text-sm mb-12">Última actualización: 26 de abril de 2026</p>

          <div className="flex flex-col gap-10 text-vi-body text-base leading-relaxed">
            <section>
              <h2 className="font-display text-white text-xl font-bold mb-3">1. Aceptación</h2>
              <p>
                Al usar V·Inventario IA aceptas estos términos. Si no estás de acuerdo, no uses el servicio.
              </p>
            </section>

            <section>
              <h2 className="font-display text-white text-xl font-bold mb-3">2. Descripción del servicio</h2>
              <p>
                V·Inventario IA es una plataforma SaaS de gestión de inventarios diseñada para pequeños y micro
                negocios. Incluye control de stock, ventas, clientes, proveedores, multi-sucursal, manejo de doble
                moneda USD/VES y un bot de WhatsApp Business para operaciones rápidas.
              </p>
            </section>

            <section>
              <h2 className="font-display text-white text-xl font-bold mb-3">3. Cuenta de usuario</h2>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li>Eres responsable de mantener la confidencialidad de tus credenciales.</li>
                <li>Eres responsable de toda actividad realizada bajo tu cuenta.</li>
                <li>Debes notificarnos inmediatamente cualquier acceso no autorizado.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-white text-xl font-bold mb-3">4. Uso aceptable</h2>
              <p className="mb-3">Te comprometes a no usar el servicio para:</p>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li>Enviar spam o mensajes no solicitados a través del bot.</li>
                <li>Realizar actividades ilegales o fraudulentas.</li>
                <li>Vulnerar derechos de terceros.</li>
                <li>Cargar contenido ilegal, ofensivo o que infrinja propiedad intelectual.</li>
                <li>Intentar acceder a datos de otros negocios o vulnerar el aislamiento multi-tenant.</li>
                <li>Abusar del bot de WhatsApp incumpliendo las políticas comerciales de Meta.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-white text-xl font-bold mb-3">5. Propiedad intelectual</h2>
              <p>
                El código, marca, logo y diseño de V·Inventario IA son propiedad exclusiva de la empresa. El cliente
                conserva todos los derechos sobre los datos que carga (inventario, clientes, ventas).
              </p>
            </section>

            <section>
              <h2 className="font-display text-white text-xl font-bold mb-3">6. Datos del cliente</h2>
              <p>
                Tú eres dueño de tus datos. V·Inventario IA actúa como encargado de tratamiento conforme a la{" "}
                <a href="/privacidad" className="text-vi-green hover:underline">Política de Privacidad</a>. Puedes
                exportar o eliminar tus datos en cualquier momento.
              </p>
            </section>

            <section>
              <h2 className="font-display text-white text-xl font-bold mb-3">7. Disponibilidad y modificaciones</h2>
              <p>
                Hacemos esfuerzos razonables por mantener el servicio disponible, pero no garantizamos disponibilidad
                ininterrumpida. Podemos modificar funciones, planes o precios notificando con antelación razonable.
              </p>
            </section>

            <section>
              <h2 className="font-display text-white text-xl font-bold mb-3">8. Limitación de responsabilidad</h2>
              <p>
                El servicio se ofrece "tal cual". En la máxima medida permitida por la ley, V·Inventario IA no será
                responsable por daños indirectos, incidentales o consecuentes derivados del uso o imposibilidad de uso
                del servicio.
              </p>
            </section>

            <section>
              <h2 className="font-display text-white text-xl font-bold mb-3">9. Cancelación</h2>
              <p>
                Puedes cancelar tu cuenta en cualquier momento. Podemos suspender o terminar tu cuenta si incumples
                estos términos.
              </p>
            </section>

            <section>
              <h2 className="font-display text-white text-xl font-bold mb-3">10. Ley aplicable</h2>
              <p>
                Estos términos se rigen por las leyes aplicables al lugar de constitución de la empresa. Cualquier
                disputa se resolverá en los tribunales correspondientes.
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

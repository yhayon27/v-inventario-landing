# CLAUDE.md — V-Inventario IA

Referencia rápida para trabajar en este proyecto. Léela antes de tocar código.

---

## Proyecto

SaaS landing page para V-Inventario IA, un sistema de gestión empresarial para negocios venezolanos que manejan inventario. El objetivo de la página es convertir dueños de negocios venezolanos en suscriptores del plan Pro. Todo el contenido, código y comentarios están en español.

---

## Comandos

```bash
npm run dev       # Servidor de desarrollo en http://localhost:3000
npm run build     # Build de producción (verifica tipos y errores)
npm run start     # Sirve el build de producción
```

---

## Stack

| Herramienta    | Versión | Uso                                       |
|----------------|---------|-------------------------------------------|
| Next.js        | 14.2.29 | Framework, App Router, Image optimization |
| TypeScript     | 5       | Tipado estático                           |
| Tailwind CSS   | 3.4.1   | Estilos utilitarios                       |
| Framer Motion  | 11.3.0  | Todas las animaciones                     |
| Recharts       | 2.12.7  | LossChart (gráfico de área)               |
| Lucide React   | 0.400.0 | Iconografía                               |
| clsx           | 2.1.1   | Composición de clases condicionales       |

---

## Estructura de archivos

```
src/
  app/
    globals.css        ← Tokens CSS globales, tipografía, utilidades
    layout.tsx         ← HTML root, metadata SEO, fuentes
    page.tsx           ← Composición de secciones (solo importa, no tiene lógica)
  components/
    layout/
      Navbar.tsx       ← Navegación fija, scroll-aware, mobile menu
      Footer.tsx       ← Links, redes sociales, copyright
    sections/          ← Una sección = un componente = un bloque visible de la página
      Hero.tsx
      PasSection.tsx
      ModulesSection.tsx
      ScenariosSection.tsx
      FeaturesGrid.tsx
      Results.tsx
      Pricing.tsx
      FinalCta.tsx
    ui/                ← Widgets interactivos autocontenidos
      WhatsappMockup.tsx
      LossChart.tsx
  lib/
    animations.ts      ← Constante de ease compartida (fuente única)
  types/
    index.ts           ← Interfaces TypeScript del dominio
```

---

## Sistema de diseño

### Paleta de colores

Todos los colores van con el prefijo `brand-` (definidos en `tailwind.config.ts`):

| Token           | Valor hex  | Uso                                        |
|-----------------|------------|--------------------------------------------|
| `brand-black`   | `#000000`  | Fondo principal de secciones               |
| `brand-surface` | `#0A0A0A`  | Fondo de tarjetas y paneles                |
| `brand-card`    | `#111111`  | Estado hover de tarjetas                   |
| `brand-border`  | `#1A1A1A`  | Bordes de separación                       |
| `brand-mid`     | `#333333`  | Elementos inactivos (ej. toggle knob off)  |
| `brand-muted`   | `#666666`  | Texto secundario, iconos                   |
| `brand-subtle`  | `#999999`  | Texto terciario, subtítulos largos         |
| `brand-accent`  | `#06B6D4`  | Cian — acción principal, highlights        |
| `brand-white`   | `#FFFFFF`  | Texto principal                            |

Regla: usar siempre los tokens `brand-*`. Nunca escribir colores hex directos en `className` de Tailwind excepto en mockups de UI que simulan interfaces externas (WhatsApp, iOS).

### Tipografía

Las clases de tipografía están en `globals.css` como utilidades CSS, no en Tailwind:

| Clase              | Tamaño (clamp)    | Uso                               |
|--------------------|-------------------|-----------------------------------|
| `.text-display`    | 3.5rem → 8rem     | Titular principal del Hero        |
| `.text-display-md` | 2.5rem → 5rem     | Titulares de sección grandes      |
| `.text-display-sm` | 1.8rem → 3.2rem   | Titulares de sección medianos     |
| `.text-label`      | 11px, uppercase   | Eyebrows (categorías sobre títulos) |

Fuente: **Inter** (Google Fonts, precargada en `layout.tsx`).

### Animaciones

**Curva de ease signature:** `[0.16, 1, 0.3, 1]`

Importar siempre desde `@/lib/animations`:

```typescript
import { E } from "@/lib/animations";
```

Nunca declarar la curva inline. La constante se llama siempre `E` (mayúscula).

**Patrón estándar para elementos que entran al viewport:**

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{ duration: 0.7, ease: E }}
>
```

Reglas de animación:
- Siempre `viewport={{ once: true }}` — las animaciones no se repiten al hacer scroll hacia arriba
- Delays escalonados en listas: `delay: index * 0.06` (máximo 0.12 por ítem)
- Animaciones de entrada en viewport: `duration` entre 0.4 y 0.8
- Animaciones de UI interactiva (toggles, precio): `type: "spring", stiffness: 600, damping: 40`

### Espaciado de secciones

Clases CSS globales para padding vertical consistente:

- `.section-pad` — clamp(5rem, 10vw, 9rem) arriba y abajo — uso estándar
- `.section-pad-lg` — clamp(7rem, 14vw, 12rem) — secciones Hero/CTA

### Utilidades CSS globales (definidas en globals.css)

| Clase           | Descripción                                        |
|-----------------|----------------------------------------------------|
| `.grid-lines`   | Fondo con cuadrícula sutil (secciones de impacto)  |
| `.hr`           | Línea divisora horizontal sólida, 1px              |
| `.hr-fade`      | Línea divisora con fade en los extremos            |
| `.glass`        | Panel negro translúcido con backdrop-blur          |
| `.text-accent`  | Color cian (`#06B6D4`)                             |
| `.gradient-text`| Gradiente blanco → cian en texto                  |
| `.noise`        | Overlay de ruido con pseudo-elemento `::before`    |
| `.sticky-panel` | Posición sticky fullscreen para secciones parallax |
| `.notif-bubble` | Estilo burbuja de notificación iOS                 |
| `.dot-1/2/3`    | Animación de puntos "escribiendo" de WhatsApp      |
| `.reveal-word`  | Animación palabra a palabra del Hero               |

---

## Cómo crear un nuevo componente

### Para una nueva sección de página:

1. Crear el archivo en `src/components/sections/NombreSeccion.tsx`
2. Siempre comenzar con `"use client";` (Framer Motion lo requiere)
3. Importar la constante de ease: `import { E } from "@/lib/animations";`
4. Estructura mínima:

```tsx
"use client";

import { motion } from "framer-motion";
import { E } from "@/lib/animations";

export default function NombreSeccion() {
  return (
    <section className="section-pad bg-black relative overflow-hidden" id="id-anchor">
      <div className="hr-fade absolute top-0 inset-x-0" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: E }}
          className="mb-16"
        >
          <p className="text-label text-brand-muted mb-5">Categoría</p>
          <h2 className="text-display-sm text-white max-w-2xl">
            Título de la sección
          </h2>
        </motion.div>

        {/* Contenido */}
      </div>

      <div className="hr-fade absolute bottom-0 inset-x-0" />
    </section>
  );
}
```

5. Agregar la importación y el componente en `src/app/page.tsx` en el orden correcto

### Para un widget de UI:

1. Crear en `src/components/ui/NombreWidget.tsx`
2. Seguir las mismas reglas de animación

---

## Convenciones importantes

**Idioma:** Todo en español. Texto visible, comentarios de código, nombres de variables de datos (`const PLANES`, `const MÓDULOS`), atributos `aria-label`. La única excepción son los nombres de funciones, interfaces y props en inglés (convención TypeScript estándar).

**Naming de archivos:** PascalCase para componentes (`HeroSection.tsx`), camelCase para librerías (`animations.ts`).

**Path alias:** Usar siempre `@/` en lugar de rutas relativas. Está configurado en `tsconfig.json`.

**Datos inline:** Los arrays de datos estáticos (listas de features, planes, etc.) van en mayúsculas como constantes del módulo (`const FEATURES = [...]`) justo antes del `export default`. No se extraen a archivos separados a menos que se reutilicen en más de un componente.

**Anchor IDs:** En español y sin tildes: `funciones`, `escenarios`, `precios`, `modulos`, `resultados`, `contacto`, `whatsapp`.

**Imágenes externas:** Solo Unsplash está habilitado en `next.config.mjs`. Para agregar otro dominio, editar el array `remotePatterns`.

---

## Lo que NO se debe hacer

**No inventar tokens de color.** Nunca usar clases como `text-brand-secondary`, `bg-brand-base`, `bg-brand-elevated`, `text-brand-tertiary`, `border-brand-tertiary` — no existen en `tailwind.config.ts` y producen clases vacías silenciosamente. La paleta completa está en la tabla de arriba.

**No declarar la curva de ease inline.** `const ease = [0.16, 1, 0.3, 1]` dentro de un componente es incorrecto. La fuente de verdad es `@/lib/animations`.

**No usar `viewport={{ once: false }}`** a menos que el comportamiento de repetición sea explícitamente parte del diseño.

**No usar clases CSS que no existan.** `py-section`, `divider`, `grid-subtle`, `animate-pulse-slow` no existen. Usar: `section-pad`, `hr`, `grid-lines`, `animate-pulse`.

**No usar `bg-brand-navy`.** No existe en el config. Usar `bg-black` o `bg-brand-black`.

**No usar Tailwind grises estándar** como `bg-gray-900`, `bg-zinc-800`. Todo va con los tokens `brand-*`.

**No usar `"use server"`.** Todos los componentes son `"use client"` por diseño. Los únicos Server Components son `layout.tsx` y `page.tsx`.

**No añadir fuentes sin actualizar el `<head>` en `layout.tsx`.** Las fuentes se cargan con `preconnect` manual.

---

## Negocio objetivo

V-Inventario es para CUALQUIER negocio venezolano que maneje inventario:
abastos, farmacias, ferreterías, restaurantes, mayoristas, tiendas de ropa,
repuestos, papelerías, etc. NUNCA usar imágenes ni texto exclusivo de
minimarkets o supermercados.

Los problemas reales que el software resuelve:

- **BCV:** La tasa oficial cambia diariamente — todos los precios en bolívares quedan desactualizados
- **IGTF:** El 3% aplica solo a pagos en efectivo USD — los cajeros cometen errores frecuentes
- **FEFO:** First Expired First Out — productos con fecha de vencimiento salen en orden correcto
- **Fiados:** Crédito informal a clientes de confianza — sin sistema no hay control ni historial
- **WhatsApp:** Es el canal de comunicación primario en Venezuela, no una app dedicada

El tono es directo, sin rodeos, con datos concretos. Nunca usar términos vagos como "solución integral" o "plataforma robusta".

"use client";
import SectionWithMockup from "@/components/ui/section-with-mockup";
import WhatsappMockup from "@/components/ui/WhatsappMockup";
import { Badge } from "@/components/ui/badge";

const CHIPS = [
  "Sin control de inventario",
  "BCV manual",
  "Fiados sin registro",
  "Cero datos reales",
];

export default function PasSection() {
  return (
    <div id="problemas">
      <SectionWithMockup
        title="La realidad del comerciante venezolano."
        description={
          <>
            <Badge variant="secondary" className="mb-4">El problema</Badge>

            {/* Chips */}
            <div className="flex flex-wrap gap-3 mb-4">
              {CHIPS.map((chip) => (
                <div key={chip} className="flex items-center gap-2 px-4 py-2 bg-vi-surface2 border border-vi-border rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-vi-orange" />
                  <span className="text-xs text-vi-muted font-medium">{chip}</span>
                </div>
              ))}
            </div>

            <p className="text-vi-sub text-sm">
              Hay una mejor manera.
            </p>
          </>
        }
      >
        <WhatsappMockup />
      </SectionWithMockup>
    </div>
  );
}

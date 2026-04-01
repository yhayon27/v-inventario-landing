"use client";
import { useEffect, useRef, useState } from "react";
import { ScrollExpandMedia } from "@/components/ui/scroll-expansion-hero";
import { WebGlShader } from "@/components/ui/web-gl-shader";

const SCENES = [
  { duration: 3800, kicker: "El problema", title: "El comercio venezolano opera a ciegas.", body: "Sin control de inventario. BCV manual. Fiados sin registro. Productos vencidos. Miles de bolívares perdidos cada mes." },
  { duration: 3800, kicker: "La solución", title: "Un sistema que entiende Venezuela.", body: "V·Inventario IA fue diseñado desde cero para la realidad del comerciante venezolano. No es un software importado con parches." },
  { duration: 5200, kicker: "Cómo funciona", title: "Tu equipo registra. La IA analiza. Tú decides.", body: "Cada venta, compra y movimiento se registra por WhatsApp. La IA procesa todo en tiempo real y te da respuestas concretas." },
  { duration: 5500, kicker: "WhatsApp IA", title: "\"¿Cuánto vendimos hoy?\"", body: "💰 $847 USD · Bs. 30,942 · 127 transacciones\n⚠️ Arroz Mary vence en 2 días\n📊 Recomiendo reabastecer antes del viernes" },
  { duration: 4800, kicker: "Métricas", title: "8% menos merma. 3 seg respuesta. 24/7.", body: "Cada dato que el sistema genera se traduce en dinero que dejas de perder. Números reales, no promesas." },
  { duration: 5200, kicker: "Dashboard", title: "Tu panel de control. En tiempo real.", body: "Ventas, tasa BCV, alertas de stock, fiados vencidos, margen de ganancia. Todo visible de un vistazo desde cualquier dispositivo." },
  { duration: 4500, kicker: "22 funciones", title: "Inventario · POS · BCV · IGTF · Fiados · FEFO · WhatsApp IA", body: "Más: mermas, gastos, proveedores, roles, auditoría, multi-sucursal, foto factura, antirrobo, asesor de precios, Venezuela Mode." },
  { duration: 4200, kicker: "Para quién", title: "Abastos. Farmacias. Ferreterías. Restaurantes. Mayoristas.", body: "Cualquier negocio venezolano que maneje inventario. Si vendes productos, este sistema es para ti." },
  { duration: 4200, kicker: "Empieza ahora", title: "Tu negocio merece datos reales.", body: "Sin tarjeta. Sin contrato. Activo en 5 minutos por WhatsApp." },
];

export default function TrailerSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(true);
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dir, setDir] = useState<"enter" | "exit">("enter");

  // Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number }> = [];

    const resize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    const init = () => {
      particles.length = 0;
      for (let i = 0; i < 40; i++) {
        particles.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, size: Math.random() * 2 + 0.5, alpha: Math.random() * 0.4 + 0.1 });
      }
    };
    const draw = () => {
      if (!visibleRef.current) { rafRef.current = requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 197, 94, ${p.alpha})`; ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(([e]) => { visibleRef.current = e.isIntersecting; }, { threshold: 0 });
    observer.observe(canvas);
    resize(); init(); draw();
    window.addEventListener("resize", () => { resize(); init(); });
    return () => { cancelAnimationFrame(rafRef.current); observer.disconnect(); };
  }, []);

  // Scene auto-advance with crossfade
  useEffect(() => {
    const duration = SCENES[current].duration;
    let elapsed = 0;
    const interval = 30;

    setDir("enter");

    const timer = setInterval(() => {
      elapsed += interval;
      setProgress(elapsed / duration);

      // Start exit 400ms before end
      if (elapsed >= duration - 400 && dir !== "exit") {
        setDir("exit");
      }

      if (elapsed >= duration) {
        setCurrent((prev) => (prev + 1) % SCENES.length);
        setProgress(0);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [current]);

  const scene = SCENES[current];

  const sceneStyle = (delay: number): React.CSSProperties => ({
    transition: `opacity 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}s, transform 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
    opacity: dir === "enter" ? 1 : 0,
    transform: dir === "enter" ? "translateY(0)" : "translateY(-12px)",
  });

  return (
    <section id="trailer">
      <ScrollExpandMedia title="Demo" subtitle="Mira cómo funciona.">
        <div className="relative bg-vi-surface1 overflow-hidden" style={{ minHeight: 420 }}>
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
          <WebGlShader />
          <div className="scanline" />

          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] z-0">
            <defs>
              <pattern id="tg" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tg)" />
          </svg>

          {/* Scene content with crossfade */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-8 py-16 min-h-[380px]">
            <p key={`k-${current}`} className="text-[10px] text-vi-green font-medium tracking-[0.2em] uppercase mb-4" style={sceneStyle(0)}>
              {scene.kicker}
            </p>
            <h3 key={`t-${current}`} className="font-display text-white text-2xl md:text-3xl font-bold max-w-xl mb-5 leading-tight" style={sceneStyle(0.05)}>
              {scene.title}
            </h3>
            <p key={`b-${current}`} className="text-vi-body text-sm max-w-md leading-relaxed whitespace-pre-line" style={sceneStyle(0.1)}>
              {scene.body}
            </p>
          </div>

          {/* Bottom bar */}
          <div className="relative z-10 px-6 pb-4 flex items-center gap-4">
            <div className="flex gap-1.5">
              {SCENES.map((_, i) => (
                <button key={i} onClick={() => { setCurrent(i); setProgress(0); }}
                  className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer ${i === current ? "bg-vi-green" : "bg-vi-border hover:bg-vi-muted"}`} />
              ))}
            </div>
            <div className="flex-1 h-0.5 bg-vi-border rounded-full overflow-hidden">
              <div className="h-full bg-vi-green rounded-full" style={{ width: `${progress * 100}%`, transition: "width 30ms linear" }} />
            </div>
            <span className="text-[9px] text-vi-muted tabular-nums">
              {String(current + 1).padStart(2, "0")}/{String(SCENES.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </ScrollExpandMedia>
    </section>
  );
}

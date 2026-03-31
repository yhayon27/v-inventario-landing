"use client";
import { useEffect, useRef } from "react";

export function ShaderLines() {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);
  const visible = useRef(true);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, t = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const draw = () => {
      if (!visible.current) {
        raf.current = requestAnimationFrame(draw);
        return;
      }
      t += 0.003;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(34, 197, 94, ${0.03 + i * 0.006})`;
        ctx.lineWidth = 0.5;
        for (let x = 0; x < w; x += 4) {
          const y = h / 2 + Math.sin(x * 0.003 + t + i * 0.5) * (80 + i * 15) + Math.sin(x * 0.007 + t * 1.3) * 30;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      raf.current = requestAnimationFrame(draw);
    };

    // Pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => { visible.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" />;
}

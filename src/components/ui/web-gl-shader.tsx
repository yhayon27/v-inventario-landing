"use client";
import { useEffect, useRef } from "react";

export function WebGlShader() {
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
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };

    const draw = () => {
      if (!visible.current) { raf.current = requestAnimationFrame(draw); return; }
      t += 0.005;
      ctx.clearRect(0, 0, w, h);
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 16) {
        const noise = Math.random();
        if (noise > 0.97) {
          const green = Math.floor(34 + Math.random() * 30);
          data[i] = 10;
          data[i + 1] = green;
          data[i + 2] = 15;
          data[i + 3] = Math.floor(8 + Math.random() * 12);
        }
      }
      ctx.putImageData(imageData, 0, 0);
      raf.current = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(
      ([e]) => { visible.current = e.isIntersecting; },
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

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none opacity-30" />;
}

"use client";
import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { cn } from "@/lib/utils";

interface Marker {
  id: string;
  location: [number, number];
  label: string;
}

interface Arc {
  id: string;
  from: [number, number];
  to: [number, number];
  label?: string;
}

interface GlobeProps {
  markers?: Marker[];
  arcs?: Arc[];
  className?: string;
  markerColor?: [number, number, number];
  baseColor?: [number, number, number];
  arcColor?: [number, number, number];
  glowColor?: [number, number, number];
  dark?: number;
  mapBrightness?: number;
  markerSize?: number;
  speed?: number;
  theta?: number;
  arcWidth?: number;
  arcHeight?: number;
}

export function Globe({
  markers = [],
  arcs = [],
  className,
  markerColor = [0.2, 0.85, 0.4],
  baseColor = [0.08, 0.08, 0.08],
  arcColor = [0.2, 0.85, 0.4],
  glowColor = [0.2, 0.85, 0.4],
  dark = 1,
  mapBrightness = 7,
  markerSize = 0.06,
  speed = 0.004,
  theta = 0.3,
  arcWidth = 1.5,
  arcHeight = 0.4,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const dragDelta = useRef(0);
  const phi = useRef(0);
  const isVisible = useRef(false);

  // Pause when off-screen
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible.current = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let globe: any = null;
    let raf: number;

    const init = () => {
      const width = canvas.offsetWidth;
      if (width === 0) {
        raf = requestAnimationFrame(init);
        return;
      }

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio, 2),
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta,
        dark,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness,
        baseColor,
        markerColor,
        glowColor,
        arcColor,
        arcWidth,
        arcHeight,
        markers: markers.map((m) => ({ location: m.location, size: markerSize })),
        arcs: arcs.map((a) => ({ from: a.from, to: a.to })),
      } as Parameters<typeof createGlobe>[1]);

      const animate = () => {
        // Skip rendering when off-screen
        if (!isVisible.current) {
          raf = requestAnimationFrame(animate);
          return;
        }

        if (pointerInteracting.current === null) {
          phi.current += speed;
        }
        const w = canvas.offsetWidth;
        globe?.update?.({
          phi: phi.current + dragDelta.current / 200,
          width: w * 2,
          height: w * 2,
        });
        raf = requestAnimationFrame(animate);
      };

      raf = requestAnimationFrame(animate);
      setTimeout(() => { canvas.style.opacity = "1"; }, 150);
    };

    raf = requestAnimationFrame(init);

    const onResize = () => {
      const w = canvas.offsetWidth;
      globe?.update?.({ width: w * 2, height: w * 2 });
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      globe?.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [markers, arcs, baseColor, markerColor, arcColor, glowColor, dark, mapBrightness, markerSize, speed, theta, arcWidth, arcHeight]);

  return (
    <div className={cn("relative aspect-square", className)}>
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - dragDelta.current;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => { pointerInteracting.current = null; }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            dragDelta.current = e.clientX - pointerInteracting.current;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            dragDelta.current = e.touches[0].clientX - pointerInteracting.current;
          }
        }}
        style={{ width: "100%", height: "100%", cursor: "grab", opacity: 0, transition: "opacity 1s ease" }}
      />
    </div>
  );
}

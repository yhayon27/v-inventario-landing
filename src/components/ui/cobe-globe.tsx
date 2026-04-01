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
}

export function Globe({
  markers = [],
  className,
  markerColor = [0.2, 0.85, 0.4],
  baseColor = [0.08, 0.08, 0.08],
  glowColor = [0.2, 0.85, 0.4],
  dark = 1,
  mapBrightness = 6,
  markerSize = 0.05,
  speed = 0.004,
  theta = 0.3,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const rRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let globe: ReturnType<typeof createGlobe> | null = null;
    let width = 0;

    const initGlobe = () => {
      width = canvas.offsetWidth;
      if (width === 0) {
        requestAnimationFrame(initGlobe);
        return;
      }

      globe = createGlobe(canvas, {
        devicePixelRatio: 2,
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
        markers: markers.map((m) => ({ location: m.location, size: markerSize })),
        onRender: (state: Record<string, number>) => {
          if (pointerInteracting.current === null) {
            phiRef.current += speed;
          }
          state.phi = phiRef.current + rRef.current;
          state.width = width * 2;
          state.height = width * 2;
        },
      } as Parameters<typeof createGlobe>[1]);

      // Fade in
      setTimeout(() => { canvas.style.opacity = "1"; }, 100);
    };

    const onResize = () => {
      width = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);

    requestAnimationFrame(initGlobe);

    return () => {
      globe?.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [markers, baseColor, markerColor, glowColor, dark, mapBrightness, markerSize, speed, theta]);

  return (
    <div className={cn("relative aspect-square", className)}>
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            rRef.current = delta / 200;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            rRef.current = delta / 100;
          }
        }}
        style={{ width: "100%", height: "100%", cursor: "grab", opacity: 0, transition: "opacity 1s ease" }}
      />
    </div>
  );
}

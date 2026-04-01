"use client";
import { useEffect, useRef, useCallback } from "react";
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
  arcs = [],
  className,
  markerColor = [0.2, 0.85, 0.4],
  baseColor = [0.05, 0.05, 0.05],
  arcColor = [0.2, 0.85, 0.4],
  glowColor = [0.2, 0.85, 0.4],
  dark = 1,
  mapBrightness = 3,
  markerSize = 0.04,
  speed = 0.004,
  theta = 0.25,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
  }, []);

  const onPointerUp = useCallback(() => {
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
  }, []);

  const onPointerOut = useCallback(() => {
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (pointerInteracting.current !== null) {
      const delta = e.clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    let width = 0;
    const onResize = () => {
      if (canvasRef.current) width = canvasRef.current.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
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
      markers: markers.map((m) => ({ location: m.location, size: markerSize })),
      onRender: (state: Record<string, number>) => {
        if (pointerInteracting.current === null) {
          phiRef.current += speed;
        }
        state.phi = phiRef.current + pointerInteractionMovement.current / 200;
        state.width = width * 2;
        state.height = width * 2;
      },
    } as Parameters<typeof createGlobe>[1]);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [markers, baseColor, markerColor, glowColor, dark, mapBrightness, markerSize, speed, theta]);

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerOut={onPointerOut}
      onMouseMove={onMouseMove}
      className={cn("w-full aspect-square cursor-grab", className)}
      style={{ contain: "layout paint size" }}
    />
  );
}

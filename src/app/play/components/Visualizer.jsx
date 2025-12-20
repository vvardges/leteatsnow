'use client';

import { useEffect, useRef } from 'react';

/**
 * Draws a dot at `mouthRef.current = { x, y }` (pixel coords in the game space).
 * Renders as a fullscreen canvas overlay.
 */
export default function Visualizer({
                                     mouthRef,
                                     radius = 6,
                                     color = '#ff3b30',
                                     outlineColor = 'rgba(0,0,0,0.35)',
                                     outlineWidth = 2,
                                     zIndex = 50,
                                     enabled = true
                                   }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      // Use the rendered size (CSS pixels) as the base
      const rect = canvas.getBoundingClientRect();
      const nextW = Math.max(1, Math.floor(rect.width * dpr));
      const nextH = Math.max(1, Math.floor(rect.height * dpr));

      if (canvas.width !== nextW) canvas.width = nextW;
      if (canvas.height !== nextH) canvas.height = nextH;

      // Draw in CSS pixel coordinates
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      // keep canvas size in sync (cheap; you can move to ResizeObserver if desired)
      resize();

      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      const p = mouthRef?.current;
      const x = p?.x;
      const y = p?.y;

      // Only draw when we have valid finite coords
      if (Number.isFinite(x) && Number.isFinite(y)) {
        // Outline
        if (outlineWidth > 0) {
          ctx.beginPath();
          ctx.arc(x, y, radius + outlineWidth, 0, Math.PI * 2);
          ctx.fillStyle = outlineColor;
          ctx.fill();
        }

        // Dot
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      // Square (half-size = 50px => 100x100 box)
      const half = 25;

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.9)'; // pick any color you like
      ctx.lineWidth = 2;
      ctx.strokeRect(x - half, y - half, half * 2, half * 2);

      rafRef.current = window.requestAnimationFrame(draw);
    };

    rafRef.current = window.requestAnimationFrame(draw);

    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [mouthRef, radius, color, outlineColor, outlineWidth, enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex
      }}
      aria-hidden="true"
    />
  );
}
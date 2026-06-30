import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

/**
 * MouseGlow — A full-viewport canvas overlay that renders a soft,
 * mouse-tracking radial gradient in the accent color (light green).
 * The glow follows the cursor with gentle easing, creating a
 * living, breathing background that responds to user interaction.
 *
 * Renders behind all content via z-index layering.
 */
const MouseGlow = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });         // normalised 0-1
  const smoothMouse = useRef({ x: 0.5, y: 0.5 });    // interpolated
  const rafId = useRef(null);
  const isTouch = useRef(false);

  // Accent palette — light green tones
  const GLOW_PRIMARY = 'rgba(134, 239, 172, 0.08)';  // soft green outer
  const GLOW_SECONDARY = 'rgba(74, 222, 128, 0.045)';  // mid green
  const GLOW_CORE = 'rgba(34, 197, 94, 0.025)';   // deeper green core

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
  }, []);

  useEffect(() => {
    // Skip on touch-only devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      isTouch.current = true;
      return;
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Render loop via GSAP ticker for frame-perfect sync with other animations
    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Smooth interpolation (ease factor)
      const ease = 0.06;
      smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * ease;
      smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * ease;

      const cx = smoothMouse.current.x * w;
      const cy = smoothMouse.current.y * h;

      ctx.clearRect(0, 0, w, h);

      // Layer 1: Large ambient glow
      const r1 = Math.max(w, h) * 0.55;
      const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, r1);
      g1.addColorStop(0, GLOW_PRIMARY);
      g1.addColorStop(0.5, GLOW_SECONDARY);
      g1.addColorStop(1, 'rgba(134, 239, 172, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      // Layer 2: Tighter highlight core
      const r2 = Math.max(w, h) * 0.22;
      const g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, r2);
      g2.addColorStop(0, GLOW_CORE);
      g2.addColorStop(1, 'rgba(34, 197, 94, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);
    };

    gsap.ticker.add(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      gsap.ticker.remove(render);
    };
  }, [resize]);

  if (isTouch.current) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ mixBlendMode: 'normal' }}
    />
  );
};

export default MouseGlow;

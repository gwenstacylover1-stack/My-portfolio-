import { useEffect, useRef } from 'react';

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

function rotateX(p: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: p.x,
    y: p.y * cos - p.z * sin,
    z: p.y * sin + p.z * cos,
  };
}

function rotateY(p: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: p.x * cos + p.z * sin,
    y: p.y,
    z: -p.x * sin + p.z * cos,
  };
}

function rotateZ(p: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: p.x * cos - p.y * sin,
    y: p.x * sin + p.y * cos,
    z: p.z,
  };
}

export function HolographicReactorCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const getCappedDpr = () => {
      const isMobileViewport =
        window.innerWidth < 768 ||
        window.matchMedia('(pointer: coarse)').matches;
      const cap = isMobileViewport ? 1.5 : 2;
      return Math.min(window.devicePixelRatio || 1, cap);
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(260, rect.width);
      height = Math.max(260, rect.height);
      dpr = getCappedDpr();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // Precompute deterministic Fibonacci sphere nodes for inner geodesic core
    const corePoints: Vec3[] = [];
    const nodeCount = 56;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      corePoints.push({
        x: Math.cos(theta) * r,
        y,
        z: Math.sin(theta) * r,
      });
    }

    // Orbiting telemetry satellites
    const satellites = [
      { radius: 0.94, tiltX: 0.72, tiltZ: 0.35, speed: 0.62, offset: 0.4, color: '#00F0FF', size: 3.2 },
      { radius: 0.82, tiltX: -0.95, tiltZ: 0.68, speed: -0.48, offset: 2.2, color: '#3B82F6', size: 2.8 },
      { radius: 0.71, tiltX: 1.15, tiltZ: -0.45, speed: 0.84, offset: 4.1, color: '#EC4899', size: 2.6 },
      { radius: 0.94, tiltX: 0.72, tiltZ: 0.35, speed: 0.62, offset: 3.55, color: '#00F0FF', size: 2.4 },
    ];

    const project = (p: Vec3, cx: number, cy: number, scale: number) => {
      const fov = 4.2;
      const depth = fov / (fov - p.z);
      return {
        x: cx + p.x * scale * depth,
        y: cy + p.y * scale * depth,
        z: p.z,
        depth,
      };
    };

    const draw3DRing = (
      cx: number,
      cy: number,
      baseScale: number,
      radius: number,
      tiltX: number,
      tiltY: number,
      tiltZ: number,
      spin: number,
      strokeStyle: string,
      lineWidth: number,
      segments = 96,
      dashedArcs?: { count: number; duty: number },
    ) => {
      ctx.save();
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';

      if (dashedArcs) {
        const arcStep = (Math.PI * 2) / dashedArcs.count;
        const arcLen = arcStep * dashedArcs.duty;
        const subSteps = 18;
        for (let a = 0; a < dashedArcs.count; a++) {
          const start = a * arcStep + spin;
          ctx.beginPath();
          for (let s = 0; s <= subSteps; s++) {
            const theta = start + (s / subSteps) * arcLen;
            let p: Vec3 = {
              x: Math.cos(theta) * radius,
              y: Math.sin(theta) * radius,
              z: 0,
            };
            p = rotateX(p, tiltX);
            p = rotateY(p, tiltY);
            p = rotateZ(p, tiltZ);
            const pr = project(p, cx, cy, baseScale);
            if (s === 0) ctx.moveTo(pr.x, pr.y);
            else ctx.lineTo(pr.x, pr.y);
          }
          ctx.stroke();
        }
      } else {
        ctx.beginPath();
        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2 + spin;
          let p: Vec3 = {
            x: Math.cos(theta) * radius,
            y: Math.sin(theta) * radius,
            z: 0,
          };
          p = rotateX(p, tiltX);
          p = rotateY(p, tiltY);
          p = rotateZ(p, tiltZ);
          const pr = project(p, cx, cy, baseScale);
          if (i === 0) ctx.moveTo(pr.x, pr.y);
          else ctx.lineTo(pr.x, pr.y);
        }
        ctx.stroke();
      }
      ctx.restore();
    };

    let rafId = 0;
    let isInViewport = true;
    let isPageVisible = !document.hidden;
    let accumulatedSeconds = 0;
    let lastTimestamp = performance.now();

    const drawScene = (elapsed: number) => {
      const ptr = pointerRef.current;
      ptr.currentX += (ptr.targetX - ptr.currentX) * 0.06;
      ptr.currentY += (ptr.targetY - ptr.currentY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const baseScale = Math.min(width, height) * 0.41;

      const mouseTiltY = ptr.currentX * 0.34;
      const mouseTiltX = 0;

      // 1. Controlled volumetric ambient bloom behind core
      const ambient = ctx.createRadialGradient(
        cx,
        cy,
        baseScale * 0.05,
        cx,
        cy,
        baseScale * 1.15,
      );
      ambient.addColorStop(0, 'rgba(0, 240, 255, 0.20)');
      ambient.addColorStop(0.35, 'rgba(59, 130, 246, 0.11)');
      ambient.addColorStop(0.7, 'rgba(13, 18, 30, 0.02)');
      ambient.addColorStop(1, 'rgba(4, 6, 12, 0)');
      ctx.fillStyle = ambient;
      ctx.fillRect(0, 0, width, height);

      // 2. Flat HUD precision compass ring with degree ticks
      const hudRadius = baseScale * 1.04;
      ctx.save();
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.14)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, hudRadius, 0, Math.PI * 2);
      ctx.stroke();

      const tickCount = 72;
      for (let i = 0; i < tickCount; i++) {
        const angle = (i / tickCount) * Math.PI * 2 + elapsed * 0.04;
        const isMajor = i % 6 === 0;
        const rInner = hudRadius - (isMajor ? 9 : 4);
        const rOuter = hudRadius;
        ctx.strokeStyle = isMajor
          ? 'rgba(0, 240, 255, 0.45)'
          : 'rgba(148, 163, 184, 0.16)';
        ctx.lineWidth = isMajor ? 1.25 : 0.8;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * rInner, cy + Math.sin(angle) * rInner);
        ctx.lineTo(cx + Math.cos(angle) * rOuter, cy + Math.sin(angle) * rOuter);
        ctx.stroke();
      }

      // Precision cardinal alignment hairlines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
      ctx.lineWidth = 0.8;
      const crossGap = baseScale * 0.56;
      const crossOuter = hudRadius + 12;
      for (let q = 0; q < 4; q++) {
        const a = (q * Math.PI) / 2;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * crossGap, cy + Math.sin(a) * crossGap);
        ctx.lineTo(cx + Math.cos(a) * crossOuter, cy + Math.sin(a) * crossOuter);
        ctx.stroke();
      }
      ctx.restore();

      // 3. 3D tilted holographic orbital rings
      draw3DRing(
        cx,
        cy,
        baseScale,
        0.94,
        0.72 + mouseTiltX,
        mouseTiltY + elapsed * 0.12,
        0.35,
        elapsed * 0.22,
        'rgba(0, 240, 255, 0.30)',
        1.1,
      );

      draw3DRing(
        cx,
        cy,
        baseScale,
        0.94,
        0.72 + mouseTiltX,
        mouseTiltY + elapsed * 0.12,
        0.35,
        -elapsed * 0.45,
        'rgba(0, 240, 255, 0.78)',
        2.1,
        72,
        { count: 6, duty: 0.42 },
      );

      draw3DRing(
        cx,
        cy,
        baseScale,
        0.82,
        -0.95 + mouseTiltX * 0.8,
        mouseTiltY - elapsed * 0.18,
        0.68,
        elapsed * 0.36,
        'rgba(59, 130, 246, 0.52)',
        1.5,
        72,
        { count: 4, duty: 0.58 },
      );

      draw3DRing(
        cx,
        cy,
        baseScale,
        0.71,
        1.15 - mouseTiltX * 0.7,
        mouseTiltY + elapsed * 0.24,
        -0.45,
        -elapsed * 0.52,
        'rgba(236, 72, 153, 0.34)',
        1.25,
        64,
        { count: 3, duty: 0.36 },
      );

      // Inner crisp reactor aperture segments
      draw3DRing(
        cx,
        cy,
        baseScale,
        0.52,
        0.32 + mouseTiltX,
        -0.25 + mouseTiltY,
        elapsed * 0.14,
        elapsed * 0.75,
        'rgba(0, 240, 255, 0.72)',
        2.4,
        60,
        { count: 10, duty: 0.62 },
      );

      // 4. Horizontally rotating 3D geodesic core mesh (fixed crisp static pitch)
      const coreRadius = 0.37;
      const projectedNodes = corePoints.map((pt) => {
        let p = { x: pt.x * coreRadius, y: pt.y * coreRadius, z: pt.z * coreRadius };
        p = rotateY(p, elapsed * 0.42 + mouseTiltY * 1.4);
        p = rotateX(p, 0.2);
        return project(p, cx, cy, baseScale);
      });

      ctx.save();
      ctx.lineWidth = 0.75;
      for (let i = 0; i < projectedNodes.length; i++) {
        const a = projectedNodes[i];
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const b = projectedNodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          const threshold = baseScale * 0.32;
          if (distSq < threshold * threshold) {
            const avgDepth = (a.z + b.z) * 0.5;
            const alpha = Math.max(0.04, Math.min(0.32, (avgDepth + 0.6) * 0.24));
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of projectedNodes) {
        const alpha = Math.max(0.18, Math.min(0.95, (n.z + 0.55) * 0.85));
        const r = Math.max(1.1, n.depth * 1.55);
        ctx.fillStyle =
          n.z > 0.1
            ? `rgba(0, 240, 255, ${alpha.toFixed(3)})`
            : `rgba(59, 130, 246, ${(alpha * 0.75).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 5. Luminous central arc-reactor core pulse
      const pulse = 1 + Math.sin(elapsed * 2.2) * 0.06;
      const coreGlow = ctx.createRadialGradient(
        cx,
        cy,
        1,
        cx,
        cy,
        baseScale * 0.28 * pulse,
      );
      coreGlow.addColorStop(0, 'rgba(224, 252, 255, 0.95)');
      coreGlow.addColorStop(0.22, 'rgba(0, 240, 255, 0.65)');
      coreGlow.addColorStop(0.55, 'rgba(59, 130, 246, 0.22)');
      coreGlow.addColorStop(1, 'rgba(4, 6, 12, 0)');
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, baseScale * 0.28 * pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.strokeStyle = 'rgba(224, 252, 255, 0.85)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(cx, cy, baseScale * 0.115 * pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 6. Orbiting glowing telemetry satellites
      for (const sat of satellites) {
        const theta = elapsed * sat.speed + sat.offset;
        let p: Vec3 = {
          x: Math.cos(theta) * sat.radius,
          y: Math.sin(theta) * sat.radius,
          z: 0,
        };
        p = rotateX(p, sat.tiltX + mouseTiltX * 0.9);
        p = rotateY(
          p,
          mouseTiltY + (sat.speed > 0 ? elapsed * 0.12 : -elapsed * 0.18),
        );
        p = rotateZ(p, sat.tiltZ);
        const pr = project(p, cx, cy, baseScale);

        ctx.save();
        ctx.shadowColor = sat.color;
        ctx.shadowBlur = 14;
        ctx.fillStyle = sat.color;
        ctx.beginPath();
        ctx.arc(pr.x, pr.y, sat.size * pr.depth, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(pr.x, pr.y, sat.size * 0.42 * pr.depth, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const tick = (now: number) => {
      if (!isInViewport || !isPageVisible) {
        rafId = 0;
        return;
      }
      const delta = Math.min(0.05, (now - lastTimestamp) * 0.001);
      lastTimestamp = now;
      accumulatedSeconds += delta;

      drawScene(accumulatedSeconds);
      rafId = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (prefersReducedMotion) {
        drawScene(4.2);
        return;
      }
      if (!rafId && isInViewport && isPageVisible) {
        lastTimestamp = performance.now();
        rafId = requestAnimationFrame(tick);
      }
    };

    const stopLoop = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isInViewport = Boolean(entry?.isIntersecting);
        if (isInViewport) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    startLoop();

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointerRef.current.targetX = nx;
    pointerRef.current.targetY = 0;
  };

  const handlePointerLeave = () => {
    pointerRef.current.targetX = 0;
    pointerRef.current.targetY = 0;
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label="Interactive 3D holographic orbital reactor visual"
      role="img"
      className="relative flex h-[320px] w-full items-center justify-center touch-pan-y sm:h-[390px] lg:h-[460px]"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.2em] text-slate-400/75 uppercase whitespace-nowrap"
      >
        EDGE · REAL-TIME · MULTIMODAL
      </div>
    </div>
  );
}

export default HolographicReactorCanvas;

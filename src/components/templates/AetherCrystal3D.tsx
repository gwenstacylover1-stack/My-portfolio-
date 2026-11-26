import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface AetherCrystal3DProps {
  variant?: 'card' | 'hero';
  className?: string;
}

function detectSoftwareWebGL(): boolean {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl =
      probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const rendererStr = String(
      ext
        ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)
        : gl.getParameter(gl.RENDERER) || '',
    );
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render|Mesa/i.test(
      rendererStr,
    );
  } catch {
    return false;
  }
}

function createGlowDotTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(
      size / 2,
      size / 2,
      1,
      size / 2,
      size / 2,
      size / 2,
    );
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.28, 'rgba(130,245,255,0.85)');
    grad.addColorStop(0.62, 'rgba(139,92,246,0.28)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function AetherCrystal3D({
  variant = 'card',
  className = '',
}: AetherCrystal3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [webglUnavailable, setWebglUnavailable] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Horizontal-only turntable drag state stored in refs to avoid React re-renders per frame
  const interactionRef = useRef({
    dragging: false,
    pointerId: -1,
    lastX: 0,
    targetUserRotY: 0,
    userRotY: 0,
    dragVelocityY: 0,
    hoverX: 0,
    smoothHoverX: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglUnavailable(true);
      return;
    }

    const dpr = isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const domEl = renderer.domElement;
    domEl.style.width = '100%';
    domEl.style.height = '100%';
    domEl.style.display = 'block';
    domEl.style.touchAction = 'pan-y';
    container.appendChild(domEl);

    // Scene & Studio Reflections via PMREM RoomEnvironment
    const scene = new THREE.Scene();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();

    const width = Math.max(container.clientWidth, 240);
    const height = Math.max(container.clientHeight, 200);
    const camera = new THREE.PerspectiveCamera(
      variant === 'hero' ? 38 : 40,
      width / height,
      0.1,
      60,
    );
    camera.position.set(0, 0.15, variant === 'hero' ? 6.1 : 5.75);
    renderer.setSize(width, height, false);

    // Balanced Studio Lighting Rig (Key + Cyan Rim + Violet Rim + Fill)
    const hemiLight = new THREE.HemisphereLight(0x9be7ff, 0x161233, 0.7);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xe0f7ff, 1.9);
    keyLight.position.set(4.5, 5.2, 5.5);
    scene.add(keyLight);

    const cyanRimLight = new THREE.DirectionalLight(0x00f0ff, 2.4);
    cyanRimLight.position.set(-5.2, 1.8, -2.5);
    scene.add(cyanRimLight);

    const violetRimLight = new THREE.DirectionalLight(0x8b5cf6, 2.2);
    violetRimLight.position.set(4.8, -3.2, -3.5);
    scene.add(violetRimLight);

    const coreGlowLight = new THREE.PointLight(0x22d3ee, 2.8, 9, 2);
    coreGlowLight.position.set(0, 0, 1.8);
    scene.add(coreGlowLight);

    // Root Group for Full 3D Crystal Assembly
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(item: T): T => {
      disposables.push(item);
      return item;
    };

    // 1. Faceted Obsidian-Glass Core Crystal
    const coreGeo = track(new THREE.IcosahedronGeometry(1.16, 0));
    const coreMat = track(
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#091024'),
        emissive: new THREE.Color('#0b2447'),
        emissiveIntensity: 0.45,
        metalness: 0.72,
        roughness: 0.14,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        reflectivity: 1.0,
        iridescence: 0.75,
        iridescenceIOR: 1.38,
        flatShading: true,
        envMapIntensity: 1.5,
      }),
    );
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // 2. Crisp Specular Edge Highlight on the Obsidian Core
    const coreEdgesGeo = track(new THREE.EdgesGeometry(coreGeo));
    const coreEdgesMat = track(
      new THREE.LineBasicMaterial({
        color: new THREE.Color('#38BDF8'),
        transparent: true,
        opacity: 0.58,
      }),
    );
    const coreEdges = new THREE.LineSegments(coreEdgesGeo, coreEdgesMat);
    coreEdges.scale.setScalar(1.008);
    coreMesh.add(coreEdges);

    // 3. Inner Luminous Energy Prism Nucleus
    const innerGeo = track(new THREE.OctahedronGeometry(0.62, 0));
    const innerMat = track(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00F0FF'),
        emissive: new THREE.Color('#00F0FF'),
        emissiveIntensity: 1.4,
        roughness: 0.2,
        metalness: 0.3,
        wireframe: true,
        transparent: true,
        opacity: 0.65,
      }),
    );
    const innerPrism = new THREE.Mesh(innerGeo, innerMat);
    rootGroup.add(innerPrism);

    // 4. Primary Glowing Cyan Wireframe Icosahedron Cage + Vertex Nodes
    const cageGeo = track(new THREE.IcosahedronGeometry(1.48, 0));
    const cageEdgesGeo = track(new THREE.EdgesGeometry(cageGeo));
    const cageEdgesMat = track(
      new THREE.LineBasicMaterial({
        color: new THREE.Color('#00F0FF'),
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    const cyanCage = new THREE.LineSegments(cageEdgesGeo, cageEdgesMat);
    rootGroup.add(cyanCage);

    // Instanced glowing micro-nodes at the 12 unique vertices of the cyan cage
    const posAttr = cageGeo.attributes.position;
    const uniqueVerts: THREE.Vector3[] = [];
    const seenKeys = new Set<string>();
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vy = posAttr.getY(i);
      const vz = posAttr.getZ(i);
      const key = `${vx.toFixed(2)}_${vy.toFixed(2)}_${vz.toFixed(2)}`;
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        uniqueVerts.push(new THREE.Vector3(vx, vy, vz));
      }
    }
    const nodeGeo = track(new THREE.SphereGeometry(0.042, 10, 10));
    const nodeMat = track(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#E0F2FE'),
        emissive: new THREE.Color('#00F0FF'),
        emissiveIntensity: 2.0,
        roughness: 0.15,
      }),
    );
    const vertexNodes = new THREE.InstancedMesh(
      nodeGeo,
      nodeMat,
      uniqueVerts.length,
    );
    const dummy = new THREE.Object3D();
    uniqueVerts.forEach((v, idx) => {
      dummy.position.copy(v);
      dummy.updateMatrix();
      vertexNodes.setMatrixAt(idx, dummy.matrix);
    });
    vertexNodes.instanceMatrix.needsUpdate = true;
    cyanCage.add(vertexNodes);

    // 5. Outer Counter-Rotating Violet Geodesic Lattice
    const outerCageGeo = track(new THREE.IcosahedronGeometry(1.76, 1));
    const outerEdgesGeo = track(new THREE.EdgesGeometry(outerCageGeo));
    const outerEdgesMat = track(
      new THREE.LineBasicMaterial({
        color: new THREE.Color('#8B5CF6'),
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    const violetCage = new THREE.LineSegments(outerEdgesGeo, outerEdgesMat);
    rootGroup.add(violetCage);

    // 6. Dual Tilted Luminous Orbiting Rings with Satellite Orbs
    const ring1Group = new THREE.Group();
    const ring1Geo = track(new THREE.TorusGeometry(2.08, 0.017, 14, 100));
    const ring1Mat = track(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#38BDF8'),
        emissive: new THREE.Color('#00F0FF'),
        emissiveIntensity: 1.5,
        roughness: 0.2,
        metalness: 0.6,
        transparent: true,
        opacity: 0.85,
      }),
    );
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Group.add(ring1Mesh);

    const sat1Geo = track(new THREE.SphereGeometry(0.055, 12, 12));
    const sat1Mat = track(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#FFFFFF'),
        emissive: new THREE.Color('#00F0FF'),
        emissiveIntensity: 2.4,
      }),
    );
    const sat1 = new THREE.Mesh(sat1Geo, sat1Mat);
    sat1.position.set(2.08, 0, 0);
    ring1Group.add(sat1);
    ring1Group.rotation.set(Math.PI * 0.42, 0, 0);
    rootGroup.add(ring1Group);

    const ring2Group = new THREE.Group();
    const ring2Geo = track(new THREE.TorusGeometry(2.36, 0.013, 14, 100));
    const ring2Mat = track(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#A78BFA'),
        emissive: new THREE.Color('#8B5CF6'),
        emissiveIntensity: 1.35,
        roughness: 0.25,
        metalness: 0.6,
        transparent: true,
        opacity: 0.68,
      }),
    );
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Group.add(ring2Mesh);

    const sat2 = new THREE.Mesh(sat1Geo, ring2Mat);
    sat2.position.set(-2.36, 0, 0);
    ring2Group.add(sat2);
    ring2Group.rotation.set(-Math.PI * 0.38, 0, 0);
    rootGroup.add(ring2Group);

    // Lock crisp static viewing pitch (X) & zero roll (Z) on root crystal assembly
    const STATIC_PITCH_X = 0.2;
    rootGroup.rotation.set(STATIC_PITCH_X, 0, 0);

    // 7. Ambient Depth Particle Cloud
    const particleCount = variant === 'hero' ? 110 : 72;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const cyanColor = new THREE.Color('#00F0FF');
    const indigoColor = new THREE.Color('#818CF8');
    const violetColor = new THREE.Color('#A855F7');

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.0 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.85;
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const c =
        i % 3 === 0 ? cyanColor : i % 3 === 1 ? indigoColor : violetColor;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const particlesGeo = track(new THREE.BufferGeometry());
    particlesGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3),
    );
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleTex = track(createGlowDotTexture());
    const particlesMat = track(
      new THREE.PointsMaterial({
        size: variant === 'hero' ? 0.14 : 0.13,
        map: particleTex,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      }),
    );
    const particleCloud = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleCloud);

    // ResizeObserver for crisp responsive framing
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = Math.max(Math.floor(entry.contentRect.width), 200);
      const h = Math.max(Math.floor(entry.contentRect.height), 160);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    });
    resizeObserver.observe(container);

    // IntersectionObserver pauses WebGL when offscreen for mobile 60fps & battery
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.02 },
    );
    visibilityObserver.observe(container);

    // Animation loop with software WebGL pacing guard
    let disposed = false;
    let rafId = 0;
    let timerId = 0;
    let lastTime = performance.now();
    let elapsed = 0;

    const glContext = renderer.getContext();
    const isWebGL2 =
      typeof WebGL2RenderingContext !== 'undefined' &&
      glContext instanceof WebGL2RenderingContext;

    const afterDraw = (cb: () => void) => {
      if (!isSoftwareGl) {
        rafId = window.requestAnimationFrame(cb);
        return;
      }
      if (isWebGL2) {
        const gl2 = glContext as WebGL2RenderingContext;
        const sync = gl2.fenceSync(gl2.SYNC_GPU_COMMANDS_COMPLETE, 0);
        if (sync) {
          gl2.flush();
          const poll = () => {
            if (disposed) {
              gl2.deleteSync(sync);
              return;
            }
            const status = gl2.clientWaitSync(sync, 0, 0);
            if (status === gl2.TIMEOUT_EXPIRED) {
              timerId = window.setTimeout(poll, 16);
              return;
            }
            gl2.deleteSync(sync);
            timerId = window.setTimeout(cb, 80);
          };
          timerId = window.setTimeout(poll, 16);
          return;
        }
      }
      timerId = window.setTimeout(cb, 80);
    };

    const tick = () => {
      if (disposed) return;

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (isVisible) {
        const state = interactionRef.current;

        if (!prefersReducedMotion) {
          elapsed += dt;
        }

        // Smooth release inertia & damping on horizontal Y-axis ONLY
        if (!state.dragging) {
          state.dragVelocityY = THREE.MathUtils.damp(
            state.dragVelocityY,
            0,
            4.2,
            dt,
          );
          state.targetUserRotY += state.dragVelocityY * dt;
        }

        state.userRotY = THREE.MathUtils.damp(
          state.userRotY,
          state.targetUserRotY,
          8,
          dt,
        );
        state.smoothHoverX = THREE.MathUtils.damp(
          state.smoothHoverX,
          state.hoverX,
          5,
          dt,
        );

        // Horizontal-only turntable spin — locked X pitch (0.2) & zero Z roll
        rootGroup.position.y = 0;
        rootGroup.rotation.x = STATIC_PITCH_X;
        rootGroup.rotation.z = 0;
        rootGroup.rotation.y =
          elapsed * 0.36 + state.userRotY + state.smoothHoverX * 0.22;

        // Counter-rotating concentric layers strictly around the vertical Y-axis
        coreMesh.rotation.set(0, elapsed * 0.16, 0);
        innerPrism.rotation.set(0, -elapsed * 0.48, 0);
        cyanCage.rotation.set(0, -elapsed * 0.14, 0);
        violetCage.rotation.set(0, elapsed * 0.18, 0);

        // Satellites glide cleanly along fixed orbital rings without vertical tumbling
        const sat1Angle = elapsed * 0.55;
        sat1.position.set(
          Math.cos(sat1Angle) * 2.08,
          Math.sin(sat1Angle) * 2.08,
          0,
        );
        const sat2Angle = -elapsed * 0.42 + Math.PI;
        sat2.position.set(
          Math.cos(sat2Angle) * 2.36,
          Math.sin(sat2Angle) * 2.36,
          0,
        );

        particleCloud.rotation.set(
          0,
          elapsed * 0.07 + state.userRotY * 0.25 + state.smoothHoverX * 0.1,
          0,
        );

        coreGlowLight.intensity = 2.4 + Math.sin(elapsed * 2.2) * 0.55;

        renderer.render(scene, camera);
      }

      if (!prefersReducedMotion) {
        afterDraw(tick);
      }
    };

    // Always render initial crisp frame immediately
    renderer.render(scene, camera);
    if (!prefersReducedMotion) {
      afterDraw(tick);
    }

    return () => {
      disposed = true;
      if (rafId) window.cancelAnimationFrame(rafId);
      if (timerId) window.clearTimeout(timerId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      envTarget.dispose();
      pmremGenerator.dispose();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (domEl.parentNode === container) {
        container.removeChild(domEl);
      }
    };
  }, [variant]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    // Only capture mouse pointers so touch vertical swipes hand off seamlessly to page scroll (touch-pan-y)
    if (e.pointerType === 'mouse') {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Ignore if unsupported
      }
    }
    interactionRef.current.dragging = true;
    interactionRef.current.pointerId = e.pointerId;
    interactionRef.current.lastX = e.clientX;
    interactionRef.current.dragVelocityY = 0;
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') {
      const rect = e.currentTarget.getBoundingClientRect();
      const normX =
        ((e.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2;
      interactionRef.current.hoverX = normX;
    }

    if (
      !interactionRef.current.dragging ||
      e.pointerId !== interactionRef.current.pointerId
    ) {
      return;
    }

    // Read ONLY horizontal deltaX — completely ignore vertical deltaY
    const dx = e.clientX - interactionRef.current.lastX;
    interactionRef.current.lastX = e.clientX;

    const deltaRotY = dx * 0.011;
    interactionRef.current.targetUserRotY += deltaRotY;
    interactionRef.current.dragVelocityY = deltaRotY * 18;
  };

  const handlePointerUpOrCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (
      e.pointerType === 'mouse' &&
      e.currentTarget.hasPointerCapture(e.pointerId)
    ) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (e.pointerId === interactionRef.current.pointerId) {
      interactionRef.current.dragging = false;
      interactionRef.current.pointerId = -1;
      setIsDragging(false);
    }
  };

  const handlePointerLeave = () => {
    interactionRef.current.hoverX = 0;
    if (!interactionRef.current.dragging) {
      setIsDragging(false);
    }
  };

  if (webglUnavailable) {
    return (
      <div
        className={`relative flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.16)_0%,rgba(99,102,241,0.12)_45%,#050814_100%)] ${className}`}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="h-20 w-20 rounded-2xl border border-[#00F0FF]/40 bg-[#0A1328] shadow-[0_0_40px_rgba(0,240,255,0.28)]" />
          <span className="text-[11px] text-[#00F0FF]">
            Aether 3D Core
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUpOrCancel}
      onPointerCancel={handlePointerUpOrCancel}
      onPointerLeave={handlePointerLeave}
      aria-label="Interactive 3D Aether obsidian crystal — drag horizontally to rotate"
      className={`relative h-full w-full select-none overflow-hidden touch-pan-y bg-[radial-gradient(circle_at_50%_46%,rgba(0,240,255,0.13)_0%,rgba(99,102,241,0.12)_34%,rgba(5,8,20,0.98)_76%)] ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      } ${className}`}
    >
      {/* Subtle non-blurred badge indicating live interactive 3D */}
      <div className="pointer-events-none absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-[#00F0FF]/30 bg-[#050916]/88 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-[#7CF7FF] uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
        <span>Live 3D · Drag to Spin</span>
      </div>
    </div>
  );
}

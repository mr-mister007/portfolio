import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ── Theme helpers ──────────────────────────────────────────────

function isDark(): boolean {
  return document.documentElement.classList.contains('dark');
}

function watchTheme(onChange: (dark: boolean) => void) {
  const observer = new MutationObserver(() => onChange(isDark()));
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
}

interface ThemeColors {
  bg: number;
  fog: number;
  accent: number;
  accentDim: number;
  gridPrimary: number;
  gridSecondary: number;
  textLabel: string;
}

const DARK_THEME: ThemeColors = {
  bg: 0x060612,
  fog: 0x060612,
  accent: 0x60a5fa,
  accentDim: 0x3b82f6,
  gridPrimary: 0x1a2a6c,
  gridSecondary: 0x0a1540,
  textLabel: 'rgba(96,165,250,0.08)',
};

const LIGHT_THEME: ThemeColors = {
  bg: 0xf0f4ff,
  fog: 0xf0f4ff,
  accent: 0x3b82f6,
  accentDim: 0x2563eb,
  gridPrimary: 0xd0d8f0,
  gridSecondary: 0xc0c8e8,
  textLabel: 'rgba(59,130,246,0.06)',
};

/**
 * 3D Infrastructure Topology — dark/light theme aware.
 */
const InteractiveBg: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    let currentTheme = isDark() ? DARK_THEME : LIGHT_THEME;

    function themeColors(colors: ThemeColors) {
      currentTheme = colors;
      scene.background = new THREE.Color(colors.bg);
      scene.fog = new THREE.Fog(colors.fog, 15, 35);

      const accent = new THREE.Color(colors.accent);
      const accentDim = new THREE.Color(colors.accentDim);

      // Grids — update material opacity/color where possible
      const gridMat = gridHelper.material as THREE.Material & { color?: THREE.Color };
      if (gridMat.color) gridMat.color.copy(accentDim);
      gridMat.opacity = isDark() ? 1 : 0.6;
      const fineMat = gridFine.material as THREE.Material & { color?: THREE.Color };
      if (fineMat.color) fineMat.color.copy(accent);
      fineMat.opacity = isDark() ? 0.05 : 0.08;

      // Hex nodes
      hexNodes.forEach((n) => {
        (n.mesh.material as THREE.MeshBasicMaterial).color.copy(accent);
        (n.mesh.material as THREE.MeshBasicMaterial).opacity = isDark()
          ? 0.3 + (hexNodes.indexOf(n) / hexNodes.length) * 0.08
          : 0.15 + (hexNodes.indexOf(n) / hexNodes.length) * 0.06;
      });

      // Connection lines
      connectionLines.forEach((cl) => {
        cl.mat.color.copy(accent);
        cl.mat.opacity = isDark() ? 0.08 + Math.random() * 0.03 : 0.04 + Math.random() * 0.02;
      });

      // Flow particles
      flowParticles.forEach((fp) => {
        fp.mat.color.copy(accent);
      });

      // Hub
      hubMat.color.copy(accentDim);
      hubMat.emissive.copy(accent);
      (hubWire.material as THREE.MeshBasicMaterial).color.copy(accent);
      (hubRing.material as THREE.MeshBasicMaterial).color.copy(accent);

      // Hub lines
      hubGroup.children.forEach((child) => {
        if (child instanceof THREE.Line) {
          (child.material as THREE.LineBasicMaterial).color.copy(accent);
        }
      });

      // Arcs
      arcAnims.forEach((arc) => {
        arc.mat.color.copy(accent);
        arc.dotMat.color.copy(accent);
      });

      // CI/CD
      const cicdChildren = cicdGroup.children;
      if (cicdChildren[0] instanceof THREE.Line) {
        (cicdChildren[0].material as THREE.LineBasicMaterial).color.copy(accent);
      }
      cicdParticles.forEach((cp) => cp.mat.color.copy(accent));
      stageBoxes.forEach((sb) => { sb.mat.color.copy(accent); });
      podMats.forEach((pm) => { pm.color.copy(accent); });
      podRingMat.color.copy(accent);
      if ((dashPanel as any).__dashCanvas) {
        // Regenerate dashboard panel
        const dp = dashPanel as any;
        const dCanvas = dp.__dashCanvas;
        const dCtx = dCanvas.getContext('2d')!;
        const dDark = isDark();

        const bgColor = dDark ? '#0a0e2a' : '#eef2ff';
        const textColor = dDark ? 'rgba(96,165,250,0.25)' : 'rgba(59,130,246,0.15)';
        const lineColor = dDark ? 'rgba(96,165,250,0.15)' : 'rgba(59,130,246,0.1)';
        const gridColor = dDark ? 'rgba(96,165,250,0.08)' : 'rgba(59,130,246,0.05)';

        dCtx.fillStyle = bgColor;
        dCtx.fillRect(0, 0, 256, 128);

        dCtx.strokeStyle = lineColor;
        dCtx.lineWidth = 1;
        dCtx.strokeRect(1, 1, 254, 126);

        dCtx.fillStyle = dDark ? 'rgba(96,165,250,0.12)' : 'rgba(59,130,246,0.08)';
        dCtx.fillRect(0, 0, 256, 18);
        dCtx.font = 'bold 8px monospace';
        dCtx.fillStyle = textColor;
        dCtx.textAlign = 'left';
        dCtx.textBaseline = 'middle';
        dCtx.fillText('dashboard / cluster-overview', 8, 9);

        const sparkData = [
          { label: 'CPU', vals: [20,35,28,42,38,55,48,62,58,45], y: 28 },
          { label: 'MEM', vals: [60,55,68,62,58,72,65,58,52,48], y: 44 },
          { label: 'IO',  vals: [10,25,18,30,22,15,28,35,20,12], y: 60 },
          { label: 'NET', vals: [40,55,48,35,50,62,55,48,60,70], y: 76 },
        ];

        for (let gy = 24; gy < 110; gy += 16) {
          dCtx.strokeStyle = gridColor;
          dCtx.lineWidth = 0.5;
          dCtx.beginPath();
          dCtx.moveTo(6, gy); dCtx.lineTo(250, gy);
          dCtx.stroke();
        }

        sparkData.forEach((s) => {
          dCtx.font = 'bold 7px monospace';
          dCtx.fillStyle = textColor;
          dCtx.textAlign = 'left';
          dCtx.fillText(s.label, 8, s.y + 3);

          dCtx.strokeStyle = lineColor;
          dCtx.lineWidth = 1;
          dCtx.beginPath();
          const maxVal = Math.max(...s.vals);
          const stepX = 180 / (s.vals.length - 1);
          s.vals.forEach((v, vi) => {
            const px = 56 + vi * stepX;
            const py = s.y - (v / maxVal) * 10;
            vi === 0 ? dCtx.moveTo(px, py) : dCtx.lineTo(px, py);
          });
          dCtx.stroke();
        });

        dCtx.font = '6px monospace';
        dCtx.fillStyle = textColor;
        dCtx.textAlign = 'right';
        dCtx.fillText('cluster: prod-us-east | 12 nodes | 48 pods', 252, 120);

        (dashPanel.material as THREE.MeshBasicMaterial).map!.needsUpdate = true;
        (dashPanel.material as THREE.MeshBasicMaterial).opacity = dDark ? 0.5 : 0.25;
      }

      // Ambient particles
      particleMat.color.copy(accent);
      p2Mat.color.copy(accent);
    }

    // ── Scene ──
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(currentTheme.bg);
    scene.fog = new THREE.Fog(currentTheme.fog, 15, 35);

    // ── Camera ──
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 50);
    camera.position.set(0, 3, 10);

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    mount.appendChild(renderer.domElement);

    // ── Realistic Studio Lighting ──
    scene.add(new THREE.AmbientLight(0x1a2b4c, 0.45));

    const keyLight = new THREE.DirectionalLight(0x93c5fd, 1.4);
    keyLight.position.set(6, 10, 8);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x3b82f6, 0.6);
    fillLight.position.set(-6, -2, -4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x60a5fa, 2.2, 30);
    rimLight.position.set(0, 5, -8);
    scene.add(rimLight);

    // ── Shared geometry ──
    const dotGeo = new THREE.SphereGeometry(0.02, 6, 6);

    // ════════════════════════════════════════════════════════
    //  1. HEXAGONAL NETWORK GRAPH
    // ════════════════════════════════════════════════════════
    const networkGroup = new THREE.Group();
    networkGroup.position.set(0, 1.2, -1);
    scene.add(networkGroup);

    const hexNodes: { pos: THREE.Vector3; mesh: THREE.Mesh; connections: number[] }[] = [];
    const hexRings = 3;
    const hexSpacing = 0.6;
    const accentColor = new THREE.Color(currentTheme.accent);
    const accentDimColor = new THREE.Color(currentTheme.accentDim);

    for (let ring = 0; ring <= hexRings; ring++) {
      const sides = ring === 0 ? 1 : ring * 6;
      for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * Math.PI * 2 + ring * 0.15;
        const r = ring * hexSpacing;
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;
        const y = Math.sin(angle * 2 + ring) * 0.06;
        const pos = new THREE.Vector3(x, y, z);
        const node = new THREE.Mesh(
          new THREE.RingGeometry(0.03, 0.045, 6),
          new THREE.MeshBasicMaterial({
            color: accentColor,
            transparent: true,
            opacity: isDark() ? 0.3 + ring * 0.08 : 0.15 + ring * 0.05,
            side: THREE.DoubleSide,
          }),
        );
        node.position.copy(pos);
        node.lookAt(0, 0, -2);
        networkGroup.add(node);
        hexNodes.push({ pos, mesh: node, connections: [] });
      }
    }

    const connectDist = hexSpacing * 1.1;
    const connectionLines: { line: THREE.Line; mat: THREE.LineBasicMaterial }[] = [];
    for (let i = 0; i < hexNodes.length; i++) {
      for (let j = i + 1; j < hexNodes.length; j++) {
        if (hexNodes[i].pos.distanceTo(hexNodes[j].pos) < connectDist) {
          const pts = [hexNodes[i].pos.clone(), hexNodes[j].pos.clone()];
          const lineMat = new THREE.LineBasicMaterial({
            color: accentColor,
            transparent: true,
            opacity: isDark() ? 0.08 + Math.random() * 0.06 : 0.04 + Math.random() * 0.03,
          });
          const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat);
          networkGroup.add(line);
          hexNodes[i].connections.push(j);
          connectionLines.push({ line, mat: lineMat });
        }
      }
    }

    type FlowParticle = { mesh: THREE.Mesh; from: THREE.Vector3; to: THREE.Vector3; progress: number; speed: number; mat: THREE.MeshBasicMaterial };
    const flowParticles: FlowParticle[] = [];
    for (let i = 0; i < 30; i++) {
      let fromIdx, toIdx;
      do {
        fromIdx = Math.floor(Math.random() * hexNodes.length);
        const conns = hexNodes[fromIdx].connections;
        if (conns.length === 0) continue;
        toIdx = conns[Math.floor(Math.random() * conns.length)];
      } while (toIdx === undefined);
      if (toIdx === undefined) continue;
      const mat = new THREE.MeshBasicMaterial({ color: accentColor, transparent: true, opacity: 0.5 });
      const mesh = new THREE.Mesh(dotGeo, mat);
      networkGroup.add(mesh);
      flowParticles.push({
        mesh, from: hexNodes[fromIdx].pos.clone(), to: hexNodes[toIdx].pos.clone(),
        progress: Math.random(), speed: 0.03 + Math.random() * 0.03, mat,
      });
    }

    // ════════════════════════════════════════════════════════
    //  2. CENTRAL HUB
    // ════════════════════════════════════════════════════════
    const hubGroup = new THREE.Group();
    hubGroup.position.set(0, 1.2, -1);
    scene.add(hubGroup);

    const hubMat = new THREE.MeshPhysicalMaterial({
      color: accentDimColor, emissive: accentColor, emissiveIntensity: 0.2,
      metalness: 0.6, roughness: 0.2, transparent: true, opacity: isDark() ? 0.4 : 0.2,
    });
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 6), hubMat);
    hubGroup.add(hub);

    const hubWire = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.08, 6),
      new THREE.MeshBasicMaterial({ color: accentColor, transparent: true, opacity: isDark() ? 0.2 : 0.1, wireframe: true }),
    );
    hubGroup.add(hubWire);

    const hubRing = new THREE.Mesh(
      new THREE.RingGeometry(0.15, 0.19, 32),
      new THREE.MeshBasicMaterial({ color: accentColor, transparent: true, opacity: isDark() ? 0.06 : 0.03, side: THREE.DoubleSide }),
    );
    hubRing.rotation.x = -Math.PI / 2;
    hubRing.position.y = -0.05;
    hubGroup.add(hubRing);

    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(Math.cos(a) * 0.15, 0, Math.sin(a) * 0.15),
          new THREE.Vector3(Math.cos(a) * 0.15, 0.3 + Math.random() * 0.2, Math.sin(a) * 0.15),
        ]),
        new THREE.LineBasicMaterial({ color: accentColor, transparent: true, opacity: isDark() ? 0.04 : 0.02 }),
      );
      hubGroup.add(line);
    }

    // ════════════════════════════════════════════════════════
    //  3. METRIC BARS
    // ════════════════════════════════════════════════════════
    const metricGroup = new THREE.Group();
    metricGroup.position.set(-1.6, 0, 0.5);
    scene.add(metricGroup);

    const barCount = 8;
    const barAnims: { mesh: THREE.Mesh; baseH: number; phase: number; speed: number }[] = [];
    for (let i = 0; i < barCount; i++) {
      const baseH = 0.1 + Math.random() * 0.35;
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 1, 0.04),
        new THREE.MeshPhysicalMaterial({
          color: new THREE.Color().setHSL(0.56, isDark() ? 0.5 : 0.3, isDark() ? 0.15 + baseH * 0.4 : 0.5 + baseH * 0.3),
          emissive: currentTheme.accentDim, emissiveIntensity: isDark() ? 0.05 + baseH * 0.1 : 0.02,
          metalness: 0.3, roughness: 0.4,
        }),
      );
      bar.position.set(i * 0.08 - (barCount - 1) * 0.04, 0, 0);
      bar.scale.y = baseH;
      metricGroup.add(bar);
      barAnims.push({ mesh: bar, baseH, phase: Math.random() * Math.PI * 2, speed: 0.3 + Math.random() * 0.2 });
    }

    const baseline = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.35, 0, 0), new THREE.Vector3(0.35, 0, 0)]),
      new THREE.LineBasicMaterial({ color: accentColor, transparent: true, opacity: isDark() ? 0.1 : 0.05 }),
    );
    metricGroup.add(baseline);

    // ════════════════════════════════════════════════════════
    //  4. SCROLL-REACTIVE DATA FLOW ARCS
    // ════════════════════════════════════════════════════════
    const arcGroup = new THREE.Group();
    arcGroup.position.set(0, 0.5, -0.5);
    scene.add(arcGroup);

    const arcAnims: {
      line: THREE.Line; mat: THREE.LineBasicMaterial;
      dot: THREE.Mesh; dotMat: THREE.MeshBasicMaterial;
      start: THREE.Vector3; end: THREE.Vector3; mid: THREE.Vector3;
      baseHeight: number; i: number;
      progress: number; speed: number;
      points: THREE.Vector3[];
      burstScale: number;
    }[] = [];

    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const start = new THREE.Vector3(Math.cos(angle) * 0.6, Math.sin(angle) * 0.1, Math.sin(angle) * 0.3);
      const end = new THREE.Vector3(Math.cos(angle + 0.4) * 1.0, Math.sin(angle + 0.4) * 0.08, Math.sin(angle + 0.4) * 0.6);
      const baseHeight = 0.15 + Math.random() * 0.1;
      const mid = new THREE.Vector3((start.x + end.x) / 2, baseHeight, (start.z + end.z) / 2);

      const rawPts: THREE.Vector3[] = [];
      for (let t = 0; t <= 20; t++) {
        const u = t / 20, u1 = (1 - u);
        rawPts.push(new THREE.Vector3(
          u1 * u1 * start.x + 2 * u1 * u * mid.x + u * u * end.x,
          u1 * u1 * start.y + 2 * u1 * u * mid.y + u * u * end.y,
          u1 * u1 * start.z + 2 * u1 * u * mid.z + u * u * end.z,
        ));
      }

      const mat = new THREE.LineBasicMaterial({ color: accentColor, transparent: true, opacity: 0.08 + i * 0.025 });
      const geo = new THREE.BufferGeometry().setFromPoints(rawPts);
      const line = new THREE.Line(geo, mat);
      arcGroup.add(line);

      const dotMat2 = new THREE.MeshBasicMaterial({ color: accentColor, transparent: true, opacity: 0.4 });
      const dot = new THREE.Mesh(dotGeo, dotMat2);
      arcGroup.add(dot);

      arcAnims.push({
        line, mat, dot, dotMat: dotMat2,
        start, end, mid: mid.clone(),
        baseHeight, i,
        progress: i * 0.12, speed: 0.02 + Math.random() * 0.02,
        points: rawPts,
        burstScale: 0,
      });
    }

    // ── Burst particles (reusable pool) ──
    const BURST_COUNT = 80;
    const burstData: {
      mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial;
      velocity: THREE.Vector3; life: number; maxLife: number; active: boolean;
    }[] = [];

    for (let i = 0; i < BURST_COUNT; i++) {
      const mat = new THREE.MeshBasicMaterial({ color: accentColor, transparent: true, opacity: 0 });
      const mesh = new THREE.Mesh(dotGeo, mat);
      mesh.visible = false;
      arcGroup.add(mesh);
      burstData.push({
        mesh, mat,
        velocity: new THREE.Vector3(),
        life: 0, maxLife: 1, active: false,
      });
    }

    // ════════════════════════════════════════════════════════
    //  5. CI/CD TRACK
    // ════════════════════════════════════════════════════════
    const cicdGroup = new THREE.Group();
    cicdGroup.position.set(1.6, 0.3, 0.3);
    scene.add(cicdGroup);

    const ellPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 40; i++) {
      const a = (i / 40) * Math.PI * 2;
      ellPts.push(new THREE.Vector3(Math.cos(a) * 0.5, Math.sin(a) * 0.2, 0));
    }
    cicdGroup.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(ellPts),
      new THREE.LineBasicMaterial({ color: accentColor, transparent: true, opacity: isDark() ? 0.1 : 0.05 }),
    ));

    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2;
      const marker = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 0.02, 0.04),
        new THREE.MeshBasicMaterial({ color: accentColor, transparent: true, opacity: isDark() ? 0.15 : 0.08 }),
      );
      marker.position.set(Math.cos(a) * 0.5, Math.sin(a) * 0.2, 0);
      cicdGroup.add(marker);
    }

    const cicdParticles: { mesh: THREE.Mesh; progress: number; speed: number; mat: THREE.MeshBasicMaterial }[] = [];
    for (let i = 0; i < 12; i++) {
      const mat = new THREE.MeshBasicMaterial({ color: accentColor, transparent: true, opacity: 0.3 });
      const mesh = new THREE.Mesh(dotGeo, mat);
      cicdGroup.add(mesh);
      cicdParticles.push({ mesh, progress: i / 12, speed: 0.02 + Math.random() * 0.01, mat });
    }

    // ── Pipeline stage boxes (on CI/CD track) ──
    const STAGE_NAMES = ["SRC", "BUILD", "TEST", "DEPLOY", "OBSERVE"];
    const STAGE_COLORS = [0x3B82F6, 0x8B5CF6, 0xF59E0B, 0x10B981, 0xEF4444];
    const stageBoxes: {
      mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial;
      label: THREE.Sprite; pulsePhase: number;
    }[] = [];

    STAGE_NAMES.forEach((name, i) => {
      const angle = (i / STAGE_NAMES.length) * Math.PI * 2;
      const x = Math.cos(angle) * 0.55;
      const y = Math.sin(angle) * 0.22;

      const mat = new THREE.MeshBasicMaterial({
        color: STAGE_COLORS[i],
        transparent: true,
        opacity: isDark() ? 0.25 : 0.12,
      });
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.025, 0.035), mat);
      box.position.set(x, y, 0);
      cicdGroup.add(box);

      const canvas = document.createElement("canvas");
      canvas.width = 64; canvas.height = 16;
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, 64, 16);
      ctx.font = "bold 7px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = isDark() ? "rgba(96,165,250,0.5)" : "rgba(59,130,246,0.35)";
      ctx.fillText(name, 32, 8);

      const tex = new THREE.CanvasTexture(canvas);
      const labelMat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
      const label = new THREE.Sprite(labelMat);
      label.position.set(x, y - 0.055, 0);
      label.scale.set(0.2, 0.05, 1);
      cicdGroup.add(label);

      stageBoxes.push({ mesh: box, mat, label, pulsePhase: i * 1.2 });
    });

    // ── K8s pod cluster ──
    const podGroup = new THREE.Group();
    podGroup.position.set(-1.8, 0.4, 0.8);
    scene.add(podGroup);

    const podRingGeo = new THREE.RingGeometry(0.22, 0.25, 24);
    const podRingMat = new THREE.MeshBasicMaterial({
      color: accentColor, transparent: true, opacity: isDark() ? 0.1 : 0.05, side: THREE.DoubleSide,
    });
    const podRing = new THREE.Mesh(podRingGeo, podRingMat);
    podRing.rotation.x = -Math.PI / 2;
    podGroup.add(podRing);

    const podCylGeo = new THREE.CylinderGeometry(0.02, 0.022, 0.04, 6);
    const podPositions: [number, number, number][] = [
      [-0.10, 0, -0.06], [0.10, 0, -0.06],
      [-0.16, 0, 0.01], [0, 0, 0.01], [0.16, 0, 0.01],
      [-0.10, 0, 0.07], [0.10, 0, 0.07],
    ];
    const podMats: THREE.MeshBasicMaterial[] = [];

    podPositions.forEach((pos) => {
      const pm = new THREE.MeshBasicMaterial({
        color: accentColor, transparent: true, opacity: isDark() ? 0.2 : 0.1,
      });
      const cyl = new THREE.Mesh(podCylGeo, pm);
      cyl.position.set(pos[0], pos[1], pos[2]);
      podGroup.add(cyl);
      podMats.push(pm);
    });

    const plCanvas = document.createElement("canvas");
    plCanvas.width = 64; plCanvas.height = 16;
    const plCtx = plCanvas.getContext("2d")!;
    plCtx.clearRect(0, 0, 64, 16);
    plCtx.font = "bold 7px monospace";
    plCtx.textAlign = "center";
    plCtx.textBaseline = "middle";
    plCtx.fillStyle = isDark() ? "rgba(96,165,250,0.2)" : "rgba(59,130,246,0.15)";
    plCtx.fillText("pods", 32, 8);
    const plTex = new THREE.CanvasTexture(plCanvas);
    const plMat = new THREE.SpriteMaterial({ map: plTex, transparent: true, depthWrite: false });
    const plSprite = new THREE.Sprite(plMat);
    plSprite.position.set(0, 0.07, 0);
    plSprite.scale.set(0.18, 0.045, 1);
    podGroup.add(plSprite);

    // ── Floating monitoring dashboard panel ──
    function createDashboardPanel() {
      const canvas = document.createElement('canvas');
      canvas.width = 256; canvas.height = 128;
      const ctx = canvas.getContext('2d')!;

      const dark = isDark();
      const bgColor = dark ? '#0a0e2a' : '#eef2ff';
      const textColor = dark ? 'rgba(96,165,250,0.25)' : 'rgba(59,130,246,0.15)';
      const lineColor = dark ? 'rgba(96,165,250,0.15)' : 'rgba(59,130,246,0.1)';
      const gridColor = dark ? 'rgba(96,165,250,0.08)' : 'rgba(59,130,246,0.05)';

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, 256, 128);

      // Border
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      ctx.strokeRect(1, 1, 254, 126);

      // Header bar
      ctx.fillStyle = dark ? 'rgba(96,165,250,0.12)' : 'rgba(59,130,246,0.08)';
      ctx.fillRect(0, 0, 256, 18);
      ctx.font = 'bold 8px monospace';
      ctx.fillStyle = textColor;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('dashboard / cluster-overview', 8, 9);

      // Mini sparklines
      const sparkData = [
        { label: 'CPU', vals: [20,35,28,42,38,55,48,62,58,45], y: 28 },
        { label: 'MEM', vals: [60,55,68,62,58,72,65,58,52,48], y: 44 },
        { label: 'IO',  vals: [10,25,18,30,22,15,28,35,20,12], y: 60 },
        { label: 'NET', vals: [40,55,48,35,50,62,55,48,60,70], y: 76 },
      ];

      // Grid lines
      for (let gy = 24; gy < 110; gy += 16) {
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(6, gy); ctx.lineTo(250, gy);
        ctx.stroke();
      }

      sparkData.forEach((s) => {
        ctx.font = 'bold 7px monospace';
        ctx.fillStyle = textColor;
        ctx.textAlign = 'left';
        ctx.fillText(s.label, 8, s.y + 3);

        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        const maxVal = Math.max(...s.vals);
        const stepX = 180 / (s.vals.length - 1);
        s.vals.forEach((v, vi) => {
          const px = 56 + vi * stepX;
          const py = s.y - (v / maxVal) * 10;
          vi === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        });
        ctx.stroke();
      });

      // Legend at bottom
      ctx.font = '6px monospace';
      ctx.fillStyle = textColor;
      ctx.textAlign = 'right';
      ctx.fillText('cluster: prod-us-east | 12 nodes | 48 pods', 252, 120);

      const tex = new THREE.CanvasTexture(canvas);
      tex.minFilter = THREE.LinearFilter;
      const mat = new THREE.MeshBasicMaterial({
        map: tex, transparent: true, opacity: dark ? 0.5 : 0.25, depthWrite: false, side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.8), mat);
      mesh.position.set(2.2, 1.1, -0.5);
      mesh.rotation.y = -0.15;
      mesh.rotation.x = 0.05;

      // Store for theme updates
      (mesh as any).__dashCanvas = canvas;
      (mesh as any).__dashDark = dark;

      scene.add(mesh);
      return mesh;
    }
    const dashPanel = createDashboardPanel();

    // ════════════════════════════════════════════════════════
    //  6. GRID
    // ════════════════════════════════════════════════════════
    const gridHelper = new THREE.GridHelper(15, 20, currentTheme.gridPrimary, currentTheme.gridSecondary);
    gridHelper.position.y = -0.5;
    scene.add(gridHelper);

    const gridFine = new THREE.GridHelper(15, 50, accentColor, currentTheme.gridSecondary);
    gridFine.position.y = -0.48;
    (gridFine.material as THREE.Material).transparent = true;
    (gridFine.material as THREE.Material).opacity = isDark() ? 0.05 : 0.08;
    scene.add(gridFine);

    // ════════════════════════════════════════════════════════
    //  7. AMBIENT PARTICLES
    // ════════════════════════════════════════════════════════
    const pCount = 400;
    const pArr = new Float32Array(pCount * 6);
    const pSizes = new Float32Array(pCount);
    const pSpeeds = new Float32Array(pCount);
    const pPhases = new Float32Array(pCount);
    for (let i = 0; i < pCount; i++) {
      pArr[i * 6] = (Math.random() - 0.5) * 18;
      pArr[i * 6 + 1] = Math.random() * 6 - 0.5;
      pArr[i * 6 + 2] = (Math.random() - 0.5) * 20 - 2;
      pSizes[i] = 0.008 + Math.random() * 0.025;
      pSpeeds[i] = 0.1 + Math.random() * 0.2;
      pPhases[i] = Math.random() * Math.PI * 2;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pArr, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(pSizes, 1));

    const particleMat = new THREE.PointsMaterial({
      color: accentColor,
      size: 0.015,
      transparent: true,
      opacity: isDark() ? 0.12 : 0.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    const p2Count = 200;
    const p2Arr = new Float32Array(p2Count * 3);
    for (let i = 0; i < p2Count; i++) {
      p2Arr[i * 3] = (Math.random() - 0.5) * 30;
      p2Arr[i * 3 + 1] = Math.random() * 8 - 1;
      p2Arr[i * 3 + 2] = (Math.random() - 0.5) * 30 - 3;
    }
    const p2Mat = new THREE.PointsMaterial({
      color: accentColor,
      size: 0.008,
      transparent: true,
      opacity: isDark() ? 0.05 : 0.03,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(p2Arr, 3)),
      p2Mat,
    ));

    // ════════════════════════════════════════════════════════
    //  8. REALISTIC INFRASTRUCTURE HUD BADGES & LABELS
    // ════════════════════════════════════════════════════════
    const labels = [
      'aws::eks-cluster', 'k8s::pod/api-v2', 'helm::release', 'terraform::apply',
      'docker::image/prod', 'argo::cd-sync', 'istio::mesh-mtls', 'prom::metrics-99.9%',
      'grafana::dashboard', 'vault::secrets', 'ci-cd::pipeline-pass', 'gcp::cloud-run',
    ];
    const spriteGroup = new THREE.Group();
    scene.add(spriteGroup);

    const labelSprites: {
      sprite: THREE.Sprite;
      x: number; y: number; z: number;
      speed: number; phase: number; floatSpeed: number;
      opacity: number;
    }[] = [];

    function createLabelTextures(dark: boolean) {
      while (spriteGroup.children.length) spriteGroup.remove(spriteGroup.children[0]);

      const textColor = dark ? '#60a5fa' : '#2563eb';
      const borderCol = dark ? 'rgba(96,165,250,0.35)' : 'rgba(37,99,235,0.25)';
      const bgCol = dark ? 'rgba(10,14,42,0.65)' : 'rgba(238,242,255,0.65)';

      labelSprites.length = 0;
      labels.forEach((text) => {
        const canvas = document.createElement('canvas');
        canvas.width = 180;
        canvas.height = 40;
        const ctx = canvas.getContext('2d')!;
        ctx.clearRect(0, 0, 180, 40);

        // Badge pill background box
        ctx.fillStyle = bgCol;
        ctx.strokeStyle = borderCol;
        ctx.lineWidth = 1.5;
        ctx.roundRect(2, 2, 176, 36, 6);
        ctx.fill();
        ctx.stroke();

        // Terminal prompt symbol
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = dark ? '#34d399' : '#059669';
        ctx.fillText('>', 10, 20);

        // Text tag label
        ctx.fillStyle = textColor;
        ctx.fillText(text, 22, 20);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        const mat = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          depthWrite: false,
          opacity: dark ? 0.65 : 0.45,
        });
        const sprite = new THREE.Sprite(mat);
        const x = (Math.random() - 0.5) * 14;
        const y = Math.random() * 5 - 1;
        const z = (Math.random() - 0.5) * 14 - 3;
        sprite.position.set(x, y, z);
        sprite.scale.set(0.7, 0.16, 1);
        spriteGroup.add(sprite);

        labelSprites.push({
          sprite, x, y, z,
          speed: 0.02 + Math.random() * 0.03,
          phase: Math.random() * Math.PI * 2,
          floatSpeed: 0.2 + Math.random() * 0.2,
          opacity: dark ? 0.65 : 0.45,
        });
      });
    }
    createLabelTextures(isDark());

    // ── State ──
    let mx = 0, my = 0, smx = 0, smy = 0, scrollT = 0, scrollC = 0;
    let prevScrollT = 0;
    let scrollVelocity = 0;
    let scrollEnergy = 0;
    let elapsedTime = 0;

    window.addEventListener('mousemove', (e) => { mx = (e.clientX / w - 0.5) * 2; my = (e.clientY / h - 0.5) * 2; }, { passive: true });
    window.addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollT = max > 0 ? window.scrollY / max : 0;
    }, { passive: true });
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, { passive: true });

    // ── Theme observer ──
    const unsubTheme = watchTheme((dark) => {
      if (dark) {
        themeColors(DARK_THEME);
        createLabelTextures(true);
      } else {
        themeColors(LIGHT_THEME);
        createLabelTextures(false);
      }
    });

    // ── Click burst handler ──
    const onCanvasClick = (e: MouseEvent) => {
      const ndcX = (e.clientX / window.innerWidth) * 2 - 1;
      const ndcY = -(e.clientY / window.innerHeight) * 2 + 1;
      const vec = new THREE.Vector3(ndcX, ndcY, 0.5).unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const dist = -camera.position.y / dir.y;
      if (dist > 0) {
        const pos = camera.position.clone().add(dir.multiplyScalar(dist));
        spawnBurst(pos, 0.8);
        spawnBurst(pos, 0.6);
      }
    };
    window.addEventListener('click', onCanvasClick);

    let burstIdx = 0;
    const spawnBurst = (origin: THREE.Vector3, intensity: number) => {
      const count = Math.floor(6 + intensity * 10);
      for (let i = 0; i < count && burstIdx < BURST_COUNT; i++) {
        const b = burstData[burstIdx];
        burstIdx = (burstIdx + 1) % BURST_COUNT;
        b.active = true;
        b.mesh.visible = true;
        b.mesh.position.copy(origin);
        b.velocity.set(
          (Math.random() - 0.5) * 0.15,
          Math.random() * 0.12 + 0.04,
          (Math.random() - 0.5) * 0.1,
        );
        b.life = 0;
        b.maxLife = 0.5 + Math.random() * 0.5;
        b.mesh.scale.set(1, 1, 1);
      }
    };

    // ── Animation ──
    let prevTime = performance.now();

    function animate() {
      const now = performance.now();
      const dt = Math.min((now - prevTime) / 1000, 0.05);
      prevTime = now;
      elapsedTime += dt;

      scrollVelocity = (scrollT - prevScrollT) / Math.max(dt, 0.001);
      prevScrollT = scrollT;

      const absVel = Math.abs(scrollVelocity);
      if (absVel > 0.05) {
        scrollEnergy = Math.min(scrollEnergy + absVel * dt * 3, 1);
      } else {
        scrollEnergy *= Math.max(0, 1 - dt * 1.5);
      }

      scrollC += (scrollT - scrollC) * Math.min(dt * 1.5, 0.08);
      smx += (mx - smx) * Math.min(dt * 1.5, 0.08);
      smy += (my - smy) * Math.min(dt * 1.5, 0.08);

      const hue = 0.56 + Math.sin(elapsedTime * 0.04) * 0.04;
      const accent = new THREE.Color().setHSL(hue, isDark() ? 0.6 : 0.4, isDark() ? 0.5 : 0.4);

      const autoRotateSpeed = 0.008 + scrollEnergy * 0.04;

      networkGroup.rotation.y += dt * (autoRotateSpeed + absVel * 0.8);
      hubGroup.rotation.y += dt * (autoRotateSpeed * 2.0 + absVel * 0.6);
      arcGroup.rotation.y += dt * (autoRotateSpeed * 1.2 + absVel * 0.5);
      metricGroup.position.x = -1.6 + Math.sin(elapsedTime * 0.05) * 0.2;
      cicdGroup.rotation.y += dt * (autoRotateSpeed * 0.8 + absVel * 0.4);

      // Dynamic 3D DevOps Cloud Tunnel Fly-through on Scroll
      const camX = Math.sin(scrollC * Math.PI * 2) * 2.5 + smy * 0.4;
      const camY = 3.5 - scrollC * 6.5 + smx * 0.25;
      const camZ = 12.0 - scrollC * 24.0 + smx * 0.2;
      camera.position.set(camX, camY, camZ);
      camera.lookAt(Math.sin(scrollC * Math.PI) * 1.5, 1.0 - scrollC * 6.5, camZ - 6);

      const colorCycle = new THREE.Color().setHSL(hue, isDark() ? 0.5 : 0.3, isDark() ? 0.5 : 0.4);
      hubMat.color.copy(colorCycle);
      hubMat.emissive.copy(accent);

      hexNodes.forEach((n, i) => {
        (n.mesh.material as THREE.MeshBasicMaterial).color.setHSL(hue, isDark() ? 0.5 : 0.3, isDark() ? 0.25 + (i % 4) * 0.08 : 0.4 + (i % 4) * 0.06);
      });

      connectionLines.forEach((cl, i) => {
        const pulse = 0.08 + 0.06 * Math.sin(elapsedTime * 0.5 + i * 0.3);
        cl.mat.opacity = pulse * (1 + scrollEnergy * 2) * (isDark() ? 1 : 0.6);
      });

      for (const fp of flowParticles) {
        fp.progress += dt * fp.speed;
        if (fp.progress > 1) fp.progress -= 1;
        fp.mesh.position.lerpVectors(fp.from, fp.to, fp.progress);
        const pulse = Math.sin(fp.progress * Math.PI);
        fp.mat.opacity = 0.2 + 0.4 * pulse + scrollEnergy * 0.3;
        const s = 0.8 + 0.5 * pulse + scrollEnergy * 0.5;
        fp.mesh.scale.set(s, s, s);
        fp.mat.color.copy(accent);
      }

      hub.rotation.y += dt * 0.1;
      hubWire.rotation.y += dt * 0.1;
      hubRing.rotation.z += dt * 0.05 + scrollEnergy * 0.1;

      for (const bar of barAnims) {
        const speedBoost = 1 + scrollEnergy * 3;
        const h = bar.baseH + 0.08 * Math.sin(elapsedTime * bar.speed * speedBoost + bar.phase);
        bar.mesh.scale.y = Math.max(0.01, h);
      }

      for (const arc of arcAnims) {
        arc.burstScale += (scrollEnergy - arc.burstScale) * Math.min(dt * 6, 0.3);
        const burst = arc.burstScale;

        const height = arc.baseHeight + burst * 0.5;
        const spread = 1 + burst * 0.6;

        const sx = arc.start.x * spread, sy = arc.start.y + burst * 0.05, sz = arc.start.z * spread;
        const ex = arc.end.x * spread, ey = arc.end.y + burst * 0.05, ez = arc.end.z * spread;
        const midX = (sx + ex) / 2, midY = height, midZ = (sz + ez) / 2;

        const newPts: THREE.Vector3[] = [];
        for (let t = 0; t <= 20; t++) {
          const u = t / 20, u1 = (1 - u);
          newPts.push(new THREE.Vector3(
            u1 * u1 * sx + 2 * u1 * u * midX + u * u * ex,
            u1 * u1 * sy + 2 * u1 * u * midY + u * u * ey,
            u1 * u1 * sz + 2 * u1 * u * midZ + u * u * ez,
          ));
        }
        arc.line.geometry.dispose();
        arc.line.geometry = new THREE.BufferGeometry().setFromPoints(newPts);
        arc.points = newPts;

        const arcColor = new THREE.Color().setHSL(hue, 0.6, 0.4 + burst * 0.3);
        arc.mat.color.copy(arcColor);
        arc.mat.opacity = (0.08 + arc.i * 0.025) + burst * 0.4;

        arc.progress += dt * (arc.speed + burst * 0.06);
        if (arc.progress > 1) arc.progress -= 1;
        const idx = Math.floor(arc.progress * 20);
        const pt = arc.points[Math.min(idx, 20)];
        if (pt) arc.dot.position.copy(pt);
        const dotPulse = 0.5 + 0.5 * Math.sin(arc.progress * Math.PI);
        arc.dotMat.opacity = 0.15 + 0.5 * dotPulse + burst * 0.3;
        arc.dotMat.color.copy(accent);
        const ds = 0.8 + 0.5 * dotPulse + burst * 1.5;
        arc.dot.scale.set(ds, ds, ds);

        if (scrollEnergy > 0.2 && Math.random() < scrollEnergy * 0.08) {
          spawnBurst(arc.dot.position, scrollEnergy);
        }
      }

      for (const b of burstData) {
        if (!b.active) continue;
        b.life += dt;
        if (b.life > b.maxLife) {
          b.active = false;
          b.mesh.visible = false;
          continue;
        }
        const lifeRatio = b.life / b.maxLife;
        b.mesh.position.x += b.velocity.x * dt;
        b.mesh.position.y += b.velocity.y * dt;
        b.mesh.position.z += b.velocity.z * dt;
        b.velocity.y -= dt * 0.08;
        b.mat.opacity = 0.4 * (1 - lifeRatio);
        const s = 0.8 + 0.6 * (1 - lifeRatio);
        b.mesh.scale.set(s, s, s);
      }

      for (const cp of cicdParticles) {
        cp.progress += dt * cp.speed;
        if (cp.progress > 1) cp.progress -= 1;
        const angle = cp.progress * Math.PI * 2;
        cp.mesh.position.set(Math.cos(angle) * 0.5, Math.sin(angle) * 0.2, 0);
        const pulse = 0.5 + 0.5 * Math.sin(cp.progress * Math.PI * 2);
        cp.mat.opacity = 0.15 + 0.35 * pulse + scrollEnergy * 0.3;
        cp.mat.color.copy(accent);
        const s = 0.7 + 0.5 * pulse + scrollEnergy * 0.3;
        cp.mesh.scale.set(s, s, s);
      }

      // ── Pipeline stage box pulsing ──
      for (let si = 0; si < stageBoxes.length; si++) {
        const sb = stageBoxes[si];
        const phase = elapsedTime * 0.8 + sb.pulsePhase;
        const pulse = 0.5 + 0.5 * Math.sin(phase);
        sb.mat.opacity = (isDark() ? 0.25 : 0.12) + pulse * (isDark() ? 0.15 : 0.08);
        const s = 1 + pulse * 0.3;
        sb.mesh.scale.set(s, 1, s);
      }

      // ── Pod cluster pulsing ──
      for (let pi = 0; pi < podMats.length; pi++) {
        const phase = elapsedTime * 0.6 + pi * 1.1;
        const pulse = 0.5 + 0.5 * Math.sin(phase);
        podMats[pi].opacity = (isDark() ? 0.2 : 0.1) + pulse * (isDark() ? 0.15 : 0.08);
        podMats[pi].color.copy(accent);
      }
      podRingMat.opacity = (isDark() ? 0.1 : 0.05) + 0.05 * Math.sin(elapsedTime * 0.4);

      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      for (let i = 0; i < pCount; i++) {
        posArray[i * 3 + 1] += Math.sin(elapsedTime * pSpeeds[i] + pPhases[i]) * dt * 0.02;
        if (posArray[i * 3 + 1] > 6) posArray[i * 3 + 1] = -0.5;
        if (posArray[i * 3 + 1] < -0.5) posArray[i * 3 + 1] = 6;
      }
      posAttr.needsUpdate = true;
      particleMat.opacity = (isDark() ? 0.08 : 0.04) + 0.06 * (1 - scrollC);

      // ── Dashboard panel float ──
      dashPanel.position.y = 1.1 + Math.sin(elapsedTime * 0.15) * 0.08;
      dashPanel.rotation.z = Math.sin(elapsedTime * 0.1) * 0.02;

      for (const ls of labelSprites) {
        ls.sprite.position.x = ls.x + Math.sin(elapsedTime * ls.speed + ls.phase) * 1.5;
        ls.sprite.position.z = ls.z + Math.cos(elapsedTime * ls.speed * 0.7 + ls.phase) * 1.5;
        ls.sprite.position.y = ls.y + Math.sin(elapsedTime * ls.floatSpeed + ls.phase * 2) * 0.5;
        const dist = camera.position.distanceTo(ls.sprite.position);
        const nearFade = Math.max(0, Math.min(1, 1 - (dist - 2) / 8));
        ls.sprite.material.opacity = ls.opacity * nearFade * (1 - scrollC * 0.3);
      }

      const gridPulse = 1 + scrollEnergy * 0.5 + 0.1 * Math.sin(elapsedTime * 0.3);
      (gridHelper.material as THREE.Material).opacity = Math.min(gridPulse, isDark() ? 2 : 1);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      unsubTheme();
      window.removeEventListener('click', onCanvasClick);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0" />;
};

export default InteractiveBg;

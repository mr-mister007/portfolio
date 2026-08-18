import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function isDark(): boolean {
  return document.documentElement.classList.contains('dark');
}

function watchTheme(onChange: (dark: boolean) => void) {
  const observer = new MutationObserver(() => onChange(isDark()));
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
}

/**
 * Hyper-Smooth 3D Kinetic Cyber Grid Topology Background
 * - Undulating, continuous liquid-wave grid plane with dynamic height displacement.
 * - Floating crystalline DevOps nodes (Hexagonal control planes, data streams).
 * - Smooth camera fly-through parallax synced with page scroll and mouse cursor.
 */
const InteractiveBg: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const scene = new THREE.Scene();
    const darkBg = new THREE.Color(0x060814);
    const lightBg = new THREE.Color(0xf1f5f9);
    scene.background = isDark() ? darkBg : lightBg;
    scene.fog = new THREE.FogExp2(isDark() ? 0x060814 : 0xf1f5f9, 0.03);

    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    camera.position.set(0, 4, 14);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark() ? 0.4 : 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x60a5fa, isDark() ? 1.6 : 0.9);
    keyLight.position.set(5, 12, 8);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x38bdf8, isDark() ? 2.5 : 1.2, 35);
    fillLight.position.set(-6, -2, -4);
    scene.add(fillLight);

    // 1. Undulating Kinetic Terrain Grid (Plane Wireframe Mesh)
    const gridCols = 40;
    const gridRows = 40;
    const planeGeo = new THREE.PlaneGeometry(36, 36, gridCols, gridRows);
    planeGeo.rotateX(-Math.PI / 2);

    const planeMat = new THREE.MeshStandardMaterial({
      color: isDark() ? 0x1e293b : 0xcbd5e1,
      wireframe: true,
      emissive: isDark() ? 0x1d4ed8 : 0x60a5fa,
      emissiveIntensity: isDark() ? 0.25 : 0.1,
      roughness: 0.2,
    });
    const planeMesh = new THREE.Mesh(planeGeo, planeMat);
    planeMesh.position.y = -3;
    scene.add(planeMesh);

    // Initial vertex position store for wave math
    const originalPositions = planeGeo.attributes.position.array.slice() as Float32Array;

    // 2. Floating 3D Crystalline Hex Nodes (Infrastructure Topology)
    const nodeGroup = new THREE.Group();
    nodeGroup.position.set(0, 1, -2);
    scene.add(nodeGroup);

    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      emissive: 0x2563eb,
      emissiveIntensity: 0.5,
    });

    const hexGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.2, 6);
    const nodes: { mesh: THREE.Mesh; basePosY: number; rotSpeed: number }[] = [];

    for (let i = 0; i < 7; i++) {
      const hex = new THREE.Mesh(hexGeo, nodeMat);
      const angle = (i / 6) * Math.PI * 2;
      const radius = i === 0 ? 0 : 3.2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      hex.position.set(x, i === 0 ? 0.5 : (Math.random() - 0.5) * 0.5, z);
      nodeGroup.add(hex);
      nodes.push({ mesh: hex, basePosY: hex.position.y, rotSpeed: 0.2 + Math.random() * 0.3 });
    }

    // 3. Glowing Data Pulse Stream Orbits
    const orbitCount = 20;
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    const pulseGeo = new THREE.SphereGeometry(0.05, 8, 8);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.8 });
    const pulses: { mesh: THREE.Mesh; radius: number; speed: number; angle: number; y: number }[] = [];

    for (let i = 0; i < orbitCount; i++) {
      const mesh = new THREE.Mesh(pulseGeo, pulseMat);
      const radius = 2 + Math.random() * 6;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 4;
      mesh.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      orbitGroup.add(mesh);
      pulses.push({ mesh, radius, speed: 0.005 + Math.random() * 0.01, angle, y });
    }

    // Mouse & Scroll State
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    const unwatch = watchTheme((dark) => {
      scene.background = dark ? darkBg : lightBg;
      scene.fog = new THREE.FogExp2(dark ? 0x060814 : 0xf1f5f9, 0.03);
      planeMat.color.setHex(dark ? 0x1e293b : 0xcbd5e1);
      planeMat.emissive.setHex(dark ? 0x1d4ed8 : 0x60a5fa);
      planeMat.emissiveIntensity = dark ? 0.25 : 0.1;
    });

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      // Smooth mouse tracking
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
      const scrollRatio = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      // Ultra-smooth camera fly-through on scroll
      camera.position.x = Math.sin(scrollRatio * Math.PI * 1.5) * 5 + mouseX * 0.8;
      camera.position.y = 4 - scrollRatio * 6 - mouseY * 0.4;
      camera.position.z = 14 - scrollRatio * 12;
      camera.lookAt(0, -scrollRatio * 3, 0);

      // Undulating Kinetic Mesh Wave deformation
      const posAttr = planeGeo.attributes.position as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;

      for (let i = 0; i < posArr.length; i += 3) {
        const u = originalPositions[i];
        const v = originalPositions[i + 2];
        // Dual sine-wave ripple math
        const wave1 = Math.sin(u * 0.3 + time * 1.2) * 0.4;
        const wave2 = Math.cos(v * 0.3 + time * 1.0) * 0.4;
        posArr[i + 1] = originalPositions[i + 1] + wave1 + wave2;
      }
      posAttr.needsUpdate = true;

      // Rotate nodes & orbital pulses
      nodes.forEach((n) => {
        n.mesh.rotation.y = time * n.rotSpeed;
        n.mesh.rotation.x = Math.sin(time * 0.5) * 0.2;
        n.mesh.position.y = n.basePosY + Math.sin(time * 0.8) * 0.15;
      });

      nodeGroup.rotation.y = time * 0.05 + mouseX * 0.1;

      pulses.forEach((p) => {
        p.angle += p.speed + scrollRatio * 0.01;
        p.mesh.position.x = Math.cos(p.angle) * p.radius;
        p.mesh.position.z = Math.sin(p.angle) * p.radius;
        p.mesh.position.y = p.y + Math.sin(time * 1.5 + p.angle) * 0.2;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      unwatch();
      cancelAnimationFrame(animationFrameId);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.95 }}
    />
  );
};

export default InteractiveBg;

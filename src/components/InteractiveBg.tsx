import React, { useEffect, useRef } from 'react';
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
 * 3D Kinetic Nebula Wave & Particle Field (WebGL Three.js)
 * Fully responsive to Light & Dark modes:
 * - Dark Mode: Deep carbon (#06080C) with Electric Volt Lime (#D4FF00) & Cyan
 * - Light Mode: Crisp studio slate (#F8FAFC) with Emerald (#10B981) & Sky Blue (#0284C7)
 * - Smooth scroll-driven camera glide and wave surge
 * - Interactive cursor ripple physics
 */
export const InteractiveBg: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let darkMode = isDark();

    // 1. Scene & Atmosphere
    const scene = new THREE.Scene();
    const darkBg = new THREE.Color(0x06080c);
    const lightBg = new THREE.Color(0xf8fafc);
    scene.background = darkMode ? darkBg : lightBg;
    scene.fog = new THREE.FogExp2(darkMode ? 0x06080c : 0xf8fafc, 0.024);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 150);
    camera.position.set(0, 10, 24);
    camera.lookAt(0, 0, 0);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 4. Kinetic 3D Particle Wave Mesh (65 x 65 = 4,225 particles)
    const cols = 65;
    const rows = 65;
    const count = cols * rows;
    const spacing = 0.85;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const basePositions = new Float32Array(count * 3);

    // Theme Color Sets
    const darkCrestColor = new THREE.Color(0xd4ff00);
    const darkMidColor = new THREE.Color(0x00f2fe);
    const darkTroughColor = new THREE.Color(0x1e293b);

    const lightCrestColor = new THREE.Color(0x059669);
    const lightMidColor = new THREE.Color(0x0284c7);
    const lightTroughColor = new THREE.Color(0x94a3b8);

    let idx = 0;
    for (let ix = 0; ix < cols; ix++) {
      for (let iz = 0; iz < rows; iz++) {
        const x = (ix - cols / 2) * spacing;
        const z = (iz - rows / 2) * spacing;
        const y = 0;

        positions[idx * 3] = x;
        positions[idx * 3 + 1] = y;
        positions[idx * 3 + 2] = z;

        basePositions[idx * 3] = x;
        basePositions[idx * 3 + 1] = y;
        basePositions[idx * 3 + 2] = z;

        colors[idx * 3] = darkMode ? darkMidColor.r : lightMidColor.r;
        colors[idx * 3 + 1] = darkMode ? darkMidColor.g : lightMidColor.g;
        colors[idx * 3 + 2] = darkMode ? darkMidColor.b : lightMidColor.b;

        idx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Circular Particle Texture
    const createTexture = (dark: boolean) => {
      const cvs = document.createElement('canvas');
      cvs.width = 32;
      cvs.height = 32;
      const ctx = cvs.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        if (dark) {
          grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
          grad.addColorStop(0.3, 'rgba(212, 255, 0, 0.8)');
          grad.addColorStop(0.7, 'rgba(0, 242, 254, 0.3)');
          grad.addColorStop(1, 'transparent');
        } else {
          grad.addColorStop(0, 'rgba(15, 23, 42, 0.9)');
          grad.addColorStop(0.3, 'rgba(16, 185, 129, 0.8)');
          grad.addColorStop(0.7, 'rgba(2, 132, 199, 0.3)');
          grad.addColorStop(1, 'transparent');
        }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(cvs);
    };

    let particleTexture = createTexture(darkMode);

    const material = new THREE.PointsMaterial({
      size: darkMode ? 0.38 : 0.34,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: darkMode ? 0.85 : 0.75,
      blending: darkMode ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, material);
    particleSystem.position.y = -4.5;
    scene.add(particleSystem);

    // 5. Floating Concentric Rings
    const ringGroup = new THREE.Group();
    ringGroup.position.set(0, 2, -10);
    scene.add(ringGroup);

    const ring1Geo = new THREE.TorusGeometry(5, 0.03, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: darkMode ? 0xd4ff00 : 0x059669,
      transparent: true,
      opacity: darkMode ? 0.35 : 0.2,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2.5;
    ringGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(8, 0.02, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: darkMode ? 0x00f2fe : 0x0284c7,
      transparent: true,
      opacity: darkMode ? 0.25 : 0.15,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    ringGroup.add(ring2);

    // Watch Theme Changes
    const unwatchTheme = watchTheme((dark) => {
      darkMode = dark;
      scene.background = dark ? darkBg : lightBg;
      scene.fog = new THREE.FogExp2(dark ? 0x06080c : 0xf8fafc, 0.024);

      particleTexture.dispose();
      particleTexture = createTexture(dark);
      material.map = particleTexture;
      material.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
      material.opacity = dark ? 0.85 : 0.75;
      material.size = dark ? 0.38 : 0.34;
      material.needsUpdate = true;

      ring1Mat.color.setHex(dark ? 0xd4ff00 : 0x059669);
      ring1Mat.opacity = dark ? 0.35 : 0.2;
      ring2Mat.color.setHex(dark ? 0x00f2fe : 0x0284c7);
      ring2Mat.opacity = dark ? 0.25 : 0.15;
    });

    // 6. Interaction State
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    let currentScrollRatio = 0;
    let targetScrollRatio = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
      targetScrollRatio = Math.min(Math.max(scrollY / maxScroll, 0), 1);
    };

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    onScroll();

    let animId: number;
    let clock = new THREE.Clock();

    const render = () => {
      const time = clock.getElapsedTime();

      // Smooth Easing
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      currentScrollRatio += (targetScrollRatio - currentScrollRatio) * 0.05;

      // Camera Motion driven by scroll & mouse
      camera.position.x = Math.sin(currentScrollRatio * Math.PI * 1.2) * 6 + mouseX * 2;
      camera.position.y = 8 - currentScrollRatio * 4 - mouseY * 1.5;
      camera.position.z = 22 - currentScrollRatio * 14;
      camera.lookAt(0, -1 - currentScrollRatio * 2, -5);

      ring1.rotation.z = time * 0.2;
      ring2.rotation.z = -time * 0.15;
      ringGroup.rotation.y = time * 0.08 + mouseX * 0.2;

      // Kinetic Wave & Cursor Physics
      const posArr = geometry.attributes.position.array as Float32Array;
      const colArr = geometry.attributes.color.array as Float32Array;

      const mouseWorldX = mouseX * 16;
      const mouseWorldZ = mouseY * 16;

      const crestCol = darkMode ? darkCrestColor : lightCrestColor;
      const midCol = darkMode ? darkMidColor : lightMidColor;
      const troughCol = darkMode ? darkTroughColor : lightTroughColor;

      let pIdx = 0;
      for (let ix = 0; ix < cols; ix++) {
        for (let iz = 0; iz < rows; iz++) {
          const bx = basePositions[pIdx * 3];
          const bz = basePositions[pIdx * 3 + 2];

          const wave1 = Math.sin(bx * 0.22 + time * 1.4 + currentScrollRatio * 3) * 1.2;
          const wave2 = Math.cos(bz * 0.28 + time * 1.1) * 0.9;
          const wave3 = Math.sin((bx + bz) * 0.15 + time * 0.8) * 0.7;

          const dx = bx - mouseWorldX;
          const dz = bz - mouseWorldZ;
          const distSq = dx * dx + dz * dz;
          const mouseDepression = distSq < 45 ? Math.sin((1 - Math.sqrt(distSq) / 6.7) * Math.PI) * 1.8 : 0;

          const y = wave1 + wave2 + wave3 - mouseDepression;
          posArr[pIdx * 3 + 1] = y;

          const normalizedY = (y + 2) / 4;
          const clamped = Math.max(0, Math.min(1, normalizedY));

          if (clamped > 0.5) {
            const factor = (clamped - 0.5) * 2;
            colArr[pIdx * 3] = midCol.r + (crestCol.r - midCol.r) * factor;
            colArr[pIdx * 3 + 1] = midCol.g + (crestCol.g - midCol.g) * factor;
            colArr[pIdx * 3 + 2] = midCol.b + (crestCol.b - midCol.b) * factor;
          } else {
            const factor = clamped * 2;
            colArr[pIdx * 3] = troughCol.r + (midCol.r - troughCol.r) * factor;
            colArr[pIdx * 3 + 1] = troughCol.g + (midCol.g - troughCol.g) * factor;
            colArr[pIdx * 3 + 2] = troughCol.b + (midCol.b - troughCol.b) * factor;
          }

          pIdx++;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      unwatchTheme();
      cancelAnimationFrame(animId);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-500"
      style={{ opacity: 0.9 }}
    />
  );
};

export default InteractiveBg;

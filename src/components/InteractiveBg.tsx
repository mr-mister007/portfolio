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
 * Revamped Interactive Glowing Particle Constellation Background
 * - Floating interactive particle nodes connected by glowing link lines.
 * - Dynamic cursor force-field interactions and subtle scroll depth parallax.
 */
const InteractiveBg: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const scene = new THREE.Scene();
    const darkBg = new THREE.Color(0x050714);
    const lightBg = new THREE.Color(0xf8fafc);
    scene.background = isDark() ? darkBg : lightBg;
    scene.fog = new THREE.FogExp2(isDark() ? 0x050714 : 0xf8fafc, 0.025);

    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, isDark() ? 0.5 : 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x60a5fa, isDark() ? 2.5 : 1.2, 30);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // Constellation Particles
    const particleCount = 180;
    const positions = new Float32Array(particleCount * 3);
    const velocities: THREE.Vector3[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 26;
      const y = (Math.random() - 0.5) * 18;
      const z = (Math.random() - 0.5) * 14;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015
        )
      );
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: isDark() ? 0x60a5fa : 0x2563eb,
      size: 0.12,
      transparent: true,
      opacity: isDark() ? 0.6 : 0.4,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Constellation Lines
    const maxConnections = particleCount * 6;
    const linePositions = new Float32Array(maxConnections * 3);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMat = new THREE.LineBasicMaterial({
      color: isDark() ? 0x60a5fa : 0x3b82f6,
      transparent: true,
      opacity: isDark() ? 0.15 : 0.08,
      blending: THREE.AdditiveBlending,
    });

    const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineMesh);

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    const mouseVector = new THREE.Vector3();

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseVector.set(targetMouseX * 10, -targetMouseY * 7, 0);
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
      scene.fog = new THREE.FogExp2(dark ? 0x050714 : 0xf8fafc, 0.025);
      particleMat.color.setHex(dark ? 0x60a5fa : 0x2563eb);
      particleMat.opacity = dark ? 0.6 : 0.4;
      lineMat.color.setHex(dark ? 0x60a5fa : 0x3b82f6);
      lineMat.opacity = dark ? 0.15 : 0.08;
    });

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
      const scrollRatio = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      camera.position.x = mouseX * 1.5;
      camera.position.y = -mouseY * 1.5 - scrollRatio * 3;
      camera.position.z = 15 - scrollRatio * 5;
      camera.lookAt(0, -scrollRatio * 3, 0);

      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      let lineVertexIdx = 0;
      const linePosArray = lineGeo.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += velocities[i].x;
        posArray[i * 3 + 1] += velocities[i].y;
        posArray[i * 3 + 2] += velocities[i].z;

        if (Math.abs(posArray[i * 3]) > 13) velocities[i].x *= -1;
        if (Math.abs(posArray[i * 3 + 1]) > 9) velocities[i].y *= -1;
        if (Math.abs(posArray[i * 3 + 2]) > 8) velocities[i].z *= -1;

        const pVec = new THREE.Vector3(posArray[i * 3], posArray[i * 3 + 1], posArray[i * 3 + 2]);
        const distToMouse = pVec.distanceTo(mouseVector);
        if (distToMouse < 3.5) {
          const pushForce = (3.5 - distToMouse) * 0.015;
          const dir = pVec.clone().sub(mouseVector).normalize();
          posArray[i * 3] += dir.x * pushForce;
          posArray[i * 3 + 1] += dir.y * pushForce;
        }

        for (let j = i + 1; j < particleCount; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < 8.5) {
            linePosArray[lineVertexIdx++] = posArray[i * 3];
            linePosArray[lineVertexIdx++] = posArray[i * 3 + 1];
            linePosArray[lineVertexIdx++] = posArray[i * 3 + 2];

            linePosArray[lineVertexIdx++] = posArray[j * 3];
            linePosArray[lineVertexIdx++] = posArray[j * 3 + 1];
            linePosArray[lineVertexIdx++] = posArray[j * 3 + 2];
          }
        }
      }

      posAttr.needsUpdate = true;
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.setDrawRange(0, lineVertexIdx / 3);

      particleSystem.rotation.y = elapsedTime * 0.02;
      lineMesh.rotation.y = elapsedTime * 0.02;

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

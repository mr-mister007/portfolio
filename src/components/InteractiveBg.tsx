import React, { useEffect, useRef } from 'react';

function getThemeAndAccent() {
  const root = document.documentElement;
  const isDark = root.getAttribute('data-theme') === 'dark' || root.classList.contains('dark');
  const accent = root.getAttribute('data-accent') || 'blue';
  return { isDark, accent };
}

export const InteractiveBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let { isDark, accent } = getThemeAndAccent();

    const getAccentRGB = (acc: string, dark: boolean) => {
      if (acc === 'emerald' || acc === 'lime') return dark ? '16, 185, 129' : '5, 150, 105';
      if (acc === 'coral' || acc === 'orange') return dark ? '255, 107, 74' : '225, 65, 30';
      return dark ? '0, 229, 255' : '2, 132, 199'; // Default Bioluminescent Cyan
    };

    let mouseX = -999;
    let mouseY = -999;
    let targetMouseX = -999;
    let targetMouseY = -999;

    const onPointerMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', onPointerMove, { passive: true });

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const observer = new MutationObserver(() => {
      const updated = getThemeAndAccent();
      isDark = updated.isDark;
      accent = updated.accent;
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-accent', 'class'],
    });

    let animId: number;
    let time = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      time += 0.015;

      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      ctx.clearRect(0, 0, width, height);

      const accentRGB = getAccentRGB(accent, isDark);
      const dotBaseColor = isDark ? '210, 230, 242' : '12, 24, 34';
      const baseAlpha = isDark ? 0.08 : 0.05;

      // 1. Soft, slow ambient gradient drift
      const orbX = width * 0.5 + Math.sin(time * 0.5) * (width * 0.25);
      const orbY = height * 0.4 + Math.cos(time * 0.4) * (height * 0.2);
      const ambientGrad = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, Math.min(width, height) * 0.5);
      ambientGrad.addColorStop(0, `rgba(${accentRGB}, ${isDark ? 0.035 : 0.025})`);
      ambientGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = ambientGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Cursor gentle ambient glow
      if (mouseX > 0 && mouseY > 0) {
        const mouseGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 180);
        mouseGrad.addColorStop(0, `rgba(${accentRGB}, ${isDark ? 0.05 : 0.035})`);
        mouseGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = mouseGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 3. Architectural Blueprint Dot Matrix
      const spacing = 38;
      const startX = (width % spacing) / 2;
      const startY = (height % spacing) / 2;

      for (let x = startX; x < width; x += spacing) {
        for (let y = startY; y < height; y += spacing) {
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let dotSize = 1;
          let alpha = baseAlpha;
          let color = dotBaseColor;

          // Subtle interaction: nearby dots brighten softly
          if (dist < 140) {
            const factor = 1 - dist / 140;
            dotSize = 1 + factor * 1.5;
            alpha = baseAlpha + factor * 0.35;
            color = accentRGB;
          }

          ctx.fillStyle = `rgba(${color}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default InteractiveBg;

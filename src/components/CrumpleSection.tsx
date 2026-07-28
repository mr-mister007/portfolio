import { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useElementScrollProgress } from '../contexts/ScrollContext';

/**
 * SVG blueprint of a DevOps infrastructure diagram that opens like paper,
 * then crumples into a ball as the user scrolls through the section.
 *
 * Scroll phases (mapped from useElementScrollProgress 0→1):
 *   0.00–0.15  Paper opens (rotateX unfold)
 *   0.15–0.25  Flat display — blueprint visible
 *   0.25–0.50  Initial crumple — compression, fold lines
 *   0.50–0.75  Aggressive crumple — heavy distortion, spin, glitch
 *   0.75–0.90  Ball formation — rounded, shadowed
 *   0.90–1.00  Shrink & fade out
 */

/* ─── Helpers ─────────────────────────────────────────────────── */

/** 5-point polygon so framer-motion interpolates smoothly. */
function getClipPath(p: number): string {
  if (p < 0.25) return 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%)';
  if (p < 0.5) {
    const t = (p - 0.25) / 0.25;
    const i = 2 * t;
    return `polygon(${i}% ${i * 0.5}%, ${100 - i}% ${i}%, ${100 - i * 0.5}% ${100 - i * 0.8}%, 50% ${100 - i * 0.5}%, ${i}% ${100 - i}%)`;
  }
  if (p < 0.75) {
    const t = (p - 0.5) / 0.25;
    const i = 2 + t * 8;
    return `polygon(${i}% ${i * 0.3}%, ${100 - i * 0.5}% ${i * 0.7}%, ${100 - i * 0.3}% ${100 - i * 0.4}%, 50% ${100 - i * 0.3}%, ${i * 0.7}% ${100 - i * 0.5}%)`;
  }
  return 'polygon(10% 3%, 90% 5%, 88% 92%, 50% 90%, 12% 92%)';
}

/** Diagonal gradient simulating paper crease lines. */
function getFoldGradient(p: number): string {
  if (p < 0.25) return 'none';
  if (p < 0.5) {
    const t = (p - 0.25) / 0.25;
    const a = 0.04 * t;
    return `repeating-linear-gradient(45deg, transparent, transparent ${20 - t * 5}px, rgba(0,0,0,${a}) ${20 - t * 5}px, rgba(0,0,0,${a}) ${21 - t * 5}px, transparent ${21 - t * 5}px, transparent ${40 - t * 10}px)`;
  }
  return [
    'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.08) 10px, rgba(0,0,0,0.08) 11px, transparent 11px, transparent 25px)',
    'repeating-linear-gradient(-45deg, transparent, transparent 18px, rgba(0,0,0,0.06) 18px, rgba(0,0,0,0.06) 19px, transparent 19px, transparent 35px)',
  ].join(', ');
}

/** Combined CSS filter (brightness + blur). */
function getFilter(p: number): string {
  if (p < 0.5) return 'brightness(1)';
  if (p < 0.75) {
    const t = (p - 0.5) / 0.25;
    return `brightness(${1 - t * 0.15})`;
  }
  if (p < 0.9) {
    const t = (p - 0.75) / 0.15;
    return `brightness(${0.85 - t * 0.15})`;
  }
  if (p < 1) {
    const t = (p - 0.9) / 0.1;
    return `brightness(${0.7 - t * 0.3}) blur(${t * 4}px)`;
  }
  return 'brightness(0.4) blur(4px)';
}

/** Drop-shadow → inner-shadow for ball 3D volume. */
function getBoxShadow(p: number): string {
  if (p < 0.25) return '0 0 0 transparent';
  if (p < 0.5) {
    const t = (p - 0.25) / 0.25;
    return `0 ${10 * t}px ${30 * t}px rgba(0,0,0,${0.3 * t})`;
  }
  if (p < 0.75) {
    const t = (p - 0.5) / 0.25;
    return `0 ${30 * t}px ${60 * t}px rgba(0,0,0,${0.5 * t})`;
  }
  if (p < 0.9) {
    const t = (p - 0.75) / 0.15;
    return [
      `inset 0 ${10 * t}px ${20 * t}px rgba(0,0,0,${0.4 * t})`,
      `0 ${30 * (1 - t)}px ${60 * (1 - t)}px rgba(0,0,0,${0.5 * (1 - t)})`,
    ].join(', ');
  }
  return 'inset 0 10px 20px rgba(0,0,0,0.4), 0 0 0 transparent';
}

/** Glitch displacement (horizontal offset that spikes during crumple). */
function getGlitchX(p: number): number {
  if (p < 0.3) return 0;
  if (p < 0.5) {
    const t = (p - 0.3) / 0.2;
    return (Math.random() * 2 - 1) * t * 3;
  }
  if (p < 0.75) return (Math.random() * 2 - 1) * 6;
  if (p < 0.9) return (Math.random() * 2 - 1) * (0.9 - p) / 0.15 * 2;
  return 0;
}

/** Glitch opacity (random flicker stripes). */
function getGlitchOpacity(p: number): number {
  if (p < 0.35) return 0;
  if (p < 0.5) return Math.random() * 0.15;
  if (p < 0.75) return Math.random() * 0.35;
  if (p < 0.9) return Math.random() * 0.15;
  return 0;
}

/* ─── Constants ───────────────────────────────────────────────── */

const FLOATING_SHAPES = [
  { index: 0, size: 'w-24 h-24', shape: 'rounded-full', x: 'left-[8%]', y: 'top-[15%]', delay: 0 },
  { index: 1, size: 'w-16 h-16', shape: 'rounded-lg', x: 'right-[10%]', y: 'top-[25%]', delay: 0.3 },
  { index: 2, size: 'w-20 h-20', shape: '', x: 'left-[12%]', y: 'bottom-[20%]', delay: 0.6, clip: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
  { index: 3, size: 'w-12 h-12', shape: 'rounded-full', x: 'right-[15%]', y: 'bottom-[30%]', delay: 0.9 },
];

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  index: i,
  size: 3 + (i % 3) * 2,
  xEnd: (Math.random() - 0.5) * 400,
  yEnd: (Math.random() - 0.5) * 400,
  rotEnd: Math.random() * 720 - 360,
  delay: Math.random() * 0.2,
}));

/* ─── Component ───────────────────────────────────────────────── */

const CrumpleSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progress = useElementScrollProgress(sectionRef);

  /* Phase 1 — Opening */
  const rotateX = useTransform(
    progress,
    [0, 0.15, 0.25, 0.5, 0.75, 0.9, 1],
    [80, 0, 0, 6, -12, -24, -24],
  );
  const translateZ = useTransform(progress, [0, 0.15], [-120, 0]);
  const entryScale = useTransform(
    progress,
    [0, 0.15, 0.75, 0.9, 1],
    [0.85, 1, 1, 0.85, 0.15],
  );
  const entryOpacity = useTransform(progress, [0, 0.15, 0.9, 1], [0.25, 1, 1, 0]);

  /* Phase 3–4 — Crumpling (now with dramatic full spin!) */
  const scaleY = useTransform(progress, [0.25, 0.5, 0.75], [1, 0.82, 0.55]);
  const scaleX = useTransform(progress, [0.25, 0.5, 0.75, 0.9], [1, 0.95, 0.75, 0.8]);
  const rotateZ = useTransform(progress, [0.25, 0.5, 0.75, 0.9], [0, 2, -8, 12]);
  const skewX = useTransform(progress, [0.25, 0.5, 0.75], [0, 1, -4]);
  const skewY = useTransform(progress, [0.25, 0.5, 0.75], [0, 0.5, 3]);

  /* Phase 5–6 — Ball & disappear */
  const borderRadius = useTransform(
    progress,
    [0.5, 0.75, 0.9],
    ['0%', '5%', '50%'],
  );
  const translateY = useTransform(progress, [0.9, 1], [0, -40]);

  /* Callback-based transforms */
  const clipPath = useTransform(progress, getClipPath);
  const foldOpacity = useTransform(progress, [0.25, 0.5, 0.75, 0.9], [0, 0.3, 0.6, 0.8]);
  const foldBackground = useTransform(progress, getFoldGradient);
  const filter = useTransform(progress, getFilter);
  const boxShadow = useTransform(progress, getBoxShadow);
  const hintOpacity = useTransform(progress, [0, 0.15, 0.25], [0, 1, 0]);

  /* Glitch effect — uses callback to inject randomness per frame */
  const glitchX = useTransform(progress, getGlitchX);
  const glitchOpacity = useTransform(progress, getGlitchOpacity);

  /* Parallax background shapes — move at different depths */
  const bgParallaxY = useTransform(progress, [0, 1], [0, 120]);
  const bg2ParallaxY = useTransform(progress, [0, 1], [0, -80]);
  const bgParallaxRotate = useTransform(progress, [0, 1], [0, 45]);

  /* Floating debris particles — fly outward during crumple */
  const particleOpacity = useTransform(
    progress,
    [0.25, 0.35, 0.75, 0.85],
    [0, 1, 1, 0],
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 py-24 overflow-hidden"
    >
      {/* ── Parallax floating shapes (background layer) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgParallaxY }}
      >
        {FLOATING_SHAPES.slice(0, 2).map((s) => (
          <div
            key={s.index}
            className={`absolute ${s.size} ${s.shape} ${s.x} ${s.y} border border-accent/10`}
            style={s.clip ? { clipPath: s.clip } : undefined}
          >
            <motion.div
              className="w-full h-full"
              animate={{ y: [0, -12, 0], rotate: [0, s.delay * 10, 0] }}
              transition={{ duration: 6 + s.delay * 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        ))}
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bg2ParallaxY, rotate: bgParallaxRotate }}
      >
        {FLOATING_SHAPES.slice(2).map((s) => (
          <div
            key={s.index}
            className={`absolute ${s.size} ${s.shape} ${s.x} ${s.y} border border-accent/10`}
            style={s.clip ? { clipPath: s.clip } : undefined}
          >
            <motion.div
              className="w-full h-full"
              animate={{ y: [0, 14, 0], rotate: [0, -s.delay * 8, 0] }}
              transition={{ duration: 7 + s.delay * 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        ))}
      </motion.div>

      {/* ── Glitch horizontal displacement bars ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
        style={{ opacity: glitchOpacity }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-[2px] bg-accent/20"
            style={{
              top: `${10 + i * 15}%`,
              x: glitchX,
              filter: 'blur(1px)',
            }}
          />
        ))}
        <motion.div
          className="absolute w-full h-[60px] bg-accent/5"
          style={{ top: '40%', x: glitchX, filter: 'blur(4px)' }}
        />
      </motion.div>

      {/* ── Scanline overlay ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          opacity: useTransform(progress, [0.3, 0.5, 0.75, 0.9], [0, 0.06, 0.12, 0]),
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(96,165,250,0.06) 2px, rgba(96,165,250,0.06) 3px)',
          backgroundSize: '100% 3px',
        }}
      />

      <div className="max-w-4xl mx-auto w-full flex flex-col items-center relative z-20">
        {/* ── Kinetic heading ── */}
        <div className="mb-8 md:mb-12 text-center overflow-hidden">
          <span className="section-label">Blueprint</span>
          <motion.h2
            className="section-heading text-[clamp(2rem,6vw,4rem)] text-text-primary mt-2"
            style={{
              x: useTransform(progress, [0.25, 0.5, 0.75], [0, -8, 16]),
              opacity: useTransform(progress, [0, 0.2, 0.8, 1], [1, 1, 0.6, 0]),
              filter: useTransform(
                progress,
                (p) =>
                  p > 0.5
                    ? `blur(${((p - 0.5) / 0.5) * 3}px)`
                    : 'blur(0px)',
              ),
            }}
          >
            Infrastructure{' '}
            <motion.span
              className="text-accent inline-block"
              style={{
                rotate: useTransform(progress, [0.3, 0.6, 0.8], [0, -5, 12]),
                scale: useTransform(progress, [0.3, 0.6, 0.8], [1, 1.1, 0.5]),
              }}
            >
              as Code
            </motion.span>
          </motion.h2>
        </div>

        {/* ── Paper wrapper (3D perspective parent) ── */}
        <motion.div
          className="w-full flex justify-center"
          style={{ perspective: 1000, rotateX, translateZ }}
        >
          {/* ── Paper surface ── */}
          <motion.div
            className="relative w-[90%] max-w-[700px] aspect-[4/3] cursor-default select-none"
            style={{
              scale: entryScale,
              scaleX,
              scaleY,
              rotateZ,
              skewX,
              skewY,
              borderRadius,
              opacity: entryOpacity,
              clipPath,
              filter,
              translateY,
              x: glitchX,
              willChange: 'transform, clip-path, border-radius, opacity, filter',
            }}
          >
            {/* Paper card */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                borderRadius: 'inherit',
                background: '#060D1A',
                border: '1px solid rgba(96, 165, 250, 0.2)',
              }}
            >
              {/* ═══ BLUEPRINT SVG ═══ */}
              <svg viewBox="0 0 800 600" className="w-full h-full">
                <defs>
                  <pattern id="bp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(96,165,250,0.06)" strokeWidth="0.5" />
                  </pattern>
                  <pattern id="bp-grid-dense" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(96,165,250,0.02)" strokeWidth="0.3" />
                  </pattern>
                  <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(96,165,250,0.4)" />
                  </marker>
                </defs>

                <rect width="800" height="600" fill="url(#bp-grid-dense)" />
                <rect width="800" height="600" fill="url(#bp-grid)" />

                {/* Border frame */}
                <rect x="10" y="10" width="780" height="580" fill="none" stroke="rgba(96,165,250,0.12)" strokeWidth="1" />
                <rect x="20" y="20" width="760" height="560" fill="none" stroke="rgba(96,165,250,0.06)" strokeWidth="0.5" />

                {/* Corner brackets */}
                <path d="M 15 35 L 15 15 L 35 15" fill="none" stroke="rgba(96,165,250,0.25)" strokeWidth="1.5" />
                <path d="M 785 35 L 785 15 L 765 15" fill="none" stroke="rgba(96,165,250,0.25)" strokeWidth="1.5" />
                <path d="M 15 565 L 15 585 L 35 585" fill="none" stroke="rgba(96,165,250,0.25)" strokeWidth="1.5" />
                <path d="M 785 565 L 785 585 L 765 585" fill="none" stroke="rgba(96,165,250,0.25)" strokeWidth="1.5" />

                {/* ── Title ── */}
                <text x="400" y="50" textAnchor="middle" fill="#60A5FA" opacity="0.6" fontSize="11" fontFamily="monospace" letterSpacing="4">
                  INFRASTRUCTURE BLUEPRINT
                </text>
                <line x1="140" y1="58" x2="660" y2="58" stroke="rgba(96,165,250,0.2)" strokeWidth="0.5" />
                <text x="400" y="72" textAnchor="middle" fill="rgba(96,165,250,0.35)" fontSize="8" fontFamily="monospace" letterSpacing="2">
                  REV 2.4.1 — PLATFORM ENGINEERING
                </text>

                {/* ── K8s Cluster ── */}
                <rect
                  x="60" y="90" width="320" height="200"
                  fill="rgba(96,165,250,0.02)" stroke="rgba(96,165,250,0.3)"
                  strokeWidth="1" strokeDasharray="6,3" rx="6"
                />
                <text x="220" y="84" textAnchor="middle" fill="rgba(96,165,250,0.4)" fontSize="9" fontFamily="monospace">
                  KUBERNETES CLUSTER
                </text>

                {/* Service */}
                <circle cx="78" cy="170" r="20" fill="none" stroke="rgba(96,165,250,0.3)" strokeWidth="1" />
                <circle cx="78" cy="170" r="6" fill="none" stroke="#60A5FA" strokeWidth="1.5" opacity="0.5" />
                <text x="78" y="205" textAnchor="middle" fill="rgba(96,165,250,0.4)" fontSize="7" fontFamily="monospace">Service</text>

                {/* Pod: api-server */}
                <rect x="110" y="110" width="110" height="60" fill="rgba(96,165,250,0.04)" stroke="rgba(96,165,250,0.35)" strokeWidth="1" rx="4" />
                <rect x="118" y="118" width="24" height="24" fill="rgba(96,165,250,0.06)" stroke="rgba(96,165,250,0.25)" strokeWidth="0.5" rx="3" />
                <circle cx="130" cy="130" r="4" fill="none" stroke="#60A5FA" strokeWidth="1.5" opacity="0.5" />
                <text x="148" y="130" fill="rgba(96,165,250,0.7)" fontSize="8" fontFamily="monospace">api-server</text>
                <text x="118" y="156" fill="rgba(96,165,250,0.3)" fontSize="7" fontFamily="monospace">READY: 1/1</text>

                {/* Pod: web-app */}
                <rect x="240" y="115" width="110" height="60" fill="rgba(96,165,250,0.04)" stroke="rgba(96,165,250,0.35)" strokeWidth="1" rx="4" />
                <rect x="248" y="123" width="24" height="24" fill="rgba(96,165,250,0.06)" stroke="rgba(96,165,250,0.25)" strokeWidth="0.5" rx="3" />
                <rect x="253" y="128" width="14" height="14" fill="none" stroke="#60A5FA" strokeWidth="1" opacity="0.5" rx="2" />
                <text x="278" y="135" fill="rgba(96,165,250,0.7)" fontSize="8" fontFamily="monospace">web-app</text>
                <text x="248" y="161" fill="rgba(96,165,250,0.3)" fontSize="7" fontFamily="monospace">READY: 1/1</text>

                {/* Pod: worker */}
                <rect x="175" y="195" width="110" height="60" fill="rgba(96,165,250,0.04)" stroke="rgba(96,165,250,0.35)" strokeWidth="1" rx="4" />
                <rect x="183" y="203" width="24" height="24" fill="rgba(96,165,250,0.06)" stroke="rgba(96,165,250,0.25)" strokeWidth="0.5" rx="3" />
                <circle cx="195" cy="215" r="4" fill="none" stroke="#60A5FA" strokeWidth="1" opacity="0.5" />
                <circle cx="195" cy="215" r="1.5" fill="#60A5FA" opacity="0.3" />
                <text x="213" y="215" fill="rgba(96,165,250,0.7)" fontSize="8" fontFamily="monospace">worker</text>
                <text x="183" y="241" fill="rgba(96,165,250,0.3)" fontSize="7" fontFamily="monospace">READY: 1/1</text>

                {/* Connection lines */}
                <line x1="98" y1="162" x2="110" y2="135" stroke="rgba(96,165,250,0.2)" strokeWidth="0.5" />
                <line x1="98" y1="170" x2="240" y2="140" stroke="rgba(96,165,250,0.2)" strokeWidth="0.5" />
                <line x1="98" y1="180" x2="175" y2="220" stroke="rgba(96,165,250,0.2)" strokeWidth="0.5" />

                {/* Annotations */}
                <text x="400" y="110" fill="rgba(96,165,250,0.25)" fontSize="7" fontFamily="monospace">{'<— 3 replicas —>'}</text>
                <line x1="290" y1="106" x2="380" y2="106" stroke="rgba(96,165,250,0.15)" strokeWidth="0.5" />
                <line x1="290" y1="103" x2="290" y2="109" stroke="rgba(96,165,250,0.15)" strokeWidth="0.5" />
                <line x1="380" y1="103" x2="380" y2="109" stroke="rgba(96,165,250,0.15)" strokeWidth="0.5" />

                {/* ── CI/CD Pipeline ── */}
                <text x="400" y="290" textAnchor="middle" fill="rgba(96,165,250,0.35)" fontSize="8" fontFamily="monospace" letterSpacing="2">
                  CI/CD PIPELINE
                </text>
                <line x1="80" y1="295" x2="720" y2="295" stroke="rgba(96,165,250,0.08)" strokeWidth="0.5" />

                {/* Stage boxes */}
                {[
                  { label: 'GIT', sub: 'push', x: 95 },
                  { label: 'BUILD', sub: 'docker', x: 255 },
                  { label: 'TEST', sub: 'verify', x: 415 },
                  { label: 'DEPLOY', sub: 'helm', x: 575 },
                ].map((s, i) => (
                  <g key={s.label}>
                    <rect
                      x={s.x} y="305" width="120" height="42"
                      fill="rgba(96,165,250,0.02)" stroke="rgba(96,165,250,0.35)"
                      strokeWidth="0.8" rx="4"
                    />
                    <text x={s.x + 60} y="325" textAnchor="middle" fill="#60A5FA" fontSize="10" fontFamily="monospace" letterSpacing="1" opacity="0.7">
                      {s.label}
                    </text>
                    <text x={s.x + 60} y="338" textAnchor="middle" fill="rgba(96,165,250,0.25)" fontSize="7" fontFamily="monospace">
                      {s.sub}
                    </text>
                    {i < 3 && (
                      <>
                        <line x1={s.x + 120} y1="325" x2={s.x + 145} y2="325" stroke="rgba(96,165,250,0.3)" strokeWidth="0.8" markerEnd="url(#arrow)" />
                        <circle cx={s.x + 132} cy="325" r="1.5" fill="#60A5FA" opacity="0.4" />
                      </>
                    )}
                  </g>
                ))}

                {/* Rollback arc */}
                <path d="M 665 347 Q 665 370 400 370 Q 135 370 135 347" fill="none" stroke="rgba(96,165,250,0.12)" strokeWidth="0.6" strokeDasharray="3,2" />
                <text x="400" y="383" textAnchor="middle" fill="rgba(96,165,250,0.15)" fontSize="7" fontFamily="monospace">rollback</text>

                {/* ── Terminal window ── */}
                <rect x="120" y="410" width="560" height="120" fill="rgba(0,0,0,0.35)" stroke="rgba(96,165,250,0.2)" strokeWidth="0.8" rx="4" />
                {/* Title bar */}
                <rect x="120" y="410" width="560" height="24" fill="rgba(96,165,250,0.04)" rx="4" />
                <circle cx="136" cy="422" r="3.5" fill="rgba(255,100,100,0.5)" />
                <circle cx="150" cy="422" r="3.5" fill="rgba(255,200,50,0.5)" />
                <circle cx="164" cy="422" r="3.5" fill="rgba(100,200,100,0.5)" />
                <text x="400" y="425" textAnchor="middle" fill="rgba(96,165,250,0.25)" fontSize="7" fontFamily="monospace">
                  ~/workspace — kubectl — 80×24
                </text>

                {/* Output */}
                <text x="140" y="455" fill="rgba(96,165,250,0.55)" fontSize="8" fontFamily="monospace">{'$ kubectl get pods -n production'}</text>
                <text x="140" y="470" fill="rgba(96,165,250,0.3)" fontSize="7" fontFamily="monospace">{'NAME                           READY   STATUS    RESTARTS   AGE'}</text>
                <text x="140" y="485" fill="rgba(96,165,250,0.5)" fontSize="7" fontFamily="monospace">{'api-server-7d4f8b96c6          1/1     Running   0          12d'}</text>
                <text x="140" y="500" fill="rgba(96,165,250,0.5)" fontSize="7" fontFamily="monospace">{'web-app-9f2e1d3b4a             1/1     Running   0          12d'}</text>
                <text x="140" y="515" fill="rgba(96,165,250,0.5)" fontSize="7" fontFamily="monospace">{'worker-3b6d1f8a2c              1/1     Running   0          11d'}</text>
                <rect x="236" y="513" width="5" height="9" fill="#60A5FA" opacity="0.6">
                  <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1s" repeatCount="indefinite" />
                </rect>

                {/* ── Footer info ── */}
                <line x1="120" y1="550" x2="680" y2="550" stroke="rgba(96,165,250,0.08)" strokeWidth="0.5" />
                <text x="400" y="563" textAnchor="middle" fill="rgba(96,165,250,0.2)" fontSize="7" fontFamily="monospace">
                  v1.24.3 • commit a3f2b1d • 3 nodes • us-east-1
                </text>

                {/* Mini hex node */}
                <polygon
                  points="748,555 755,558 755,564 748,567 741,564 741,558"
                  fill="none" stroke="rgba(96,165,250,0.15)" strokeWidth="0.5"
                />
                <circle cx="748" cy="561" r="1.5" fill="rgba(96,165,250,0.2)" />
              </svg>
            </div>

            {/* ── Fold overlay ── */}
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-[inherit]"
              style={{
                opacity: foldOpacity,
                background: foldBackground,
                mixBlendMode: 'multiply' as const,
              }}
            />

            {/* ── Shadow overlay ── */}
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-[inherit]"
              style={{ boxShadow }}
            />
          </motion.div>
        </motion.div>

        {/* ── Floating debris particles ── */}
        {PARTICLES.map((p) => (
          <motion.div
            key={p.index}
            className="absolute z-30 rounded-full bg-accent/30 pointer-events-none"
            style={{
              width: p.size,
              height: p.size,
              opacity: particleOpacity,
              x: useTransform(progress, [0.35, 0.75], [0, p.xEnd]),
              y: useTransform(progress, [0.35, 0.75], [0, p.yEnd]),
              rotate: useTransform(progress, [0.35, 0.75], [0, p.rotEnd]),
              transitionDelay: `${p.delay}s`,
            }}
          />
        ))}

        {/* ── Scroll hint ── */}
        <motion.p
          className="section-label mt-8 text-center"
          style={{ opacity: hintOpacity }}
        >
          ↓ Scroll to crumple
        </motion.p>
      </div>
    </section>
  );
};

export default CrumpleSection;

import { motion, useTransform, useScroll } from 'framer-motion';
import { Typewriter } from './Typewriter';
import TiltCard from './TiltCard';
import StatusBadge from './StatusBadge';

const HeroSection: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const fgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* 3D parallax background layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY, perspective: 1000 }}
      >
        <motion.div
          className="absolute top-[15%] right-[10%] w-32 h-32 border border-accent/10 rounded-full"
          animate={{ y: [0, -16, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[8%] w-24 h-24 border border-accent/10 rounded-lg"
          animate={{ y: [0, 12, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-[30%] left-[15%] w-16 h-16 border border-accent/10 rounded-full"
          animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute bottom-[30%] right-[15%] w-20 h-20 border border-accent/10"
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          animate={{ y: [0, 14, 0], rotate: [0, -12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
      </motion.div>

      {/* Foreground content — parallax forward */}
      <motion.div className="relative z-10 flex flex-col items-center" style={{ y: fgY }}>
        <motion.span
          className="section-label mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          DevOps &amp; Platform Engineering
        </motion.span>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <StatusBadge />
        </motion.div>

        <motion.h1
          className="hero-heading text-[clamp(3.5rem,15vw,10rem)] text-center select-none mb-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1000 }}
        >
          <span className="text-text-primary">Hi, I&apos;m </span>
          <span className="text-accent">Aravind</span>
        </motion.h1>

        <motion.p
          className="text-text-secondary text-[clamp(0.9rem,1.4vw,1.15rem)] font-light max-w-[520px] text-center leading-relaxed mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          Building reliable, scalable infrastructure — from Kubernetes clusters to CI/CD pipelines.
        </motion.p>

        {/* Terminal with 3D tilt */}
        <motion.div
          className="w-full max-w-[520px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1200 }}
        >
          <TiltCard maxTilt={4} scale={1.005} glare={false}>
            <div className="card overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="text-text-secondary text-xs font-mono ml-2">~/workspace</span>
              </div>
              <div className="p-5 min-h-[160px] flex items-end">
                <Typewriter
                  lines={[
                    '$ kubectl get pods --all-namespaces',
                    'NAMESPACE     NAME                    READY   STATUS    RESTARTS',
                    'default       api-server-7d4f8b96c6   1/1     Running   0',
                    'default       web-app-9f2e1d3b4a      1/1     Running   0',
                    'production    backend-5c8a2e7f9d      1/1     Running   0',
                    'production    worker-3b6d1f8a2c       1/1     Running   0',
                  ]}
                  speed={28}
                  delay={1.0}
                />
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

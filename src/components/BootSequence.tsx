import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLines = [
  { text: '$ systemctl start portfolio.service', delay: 200, isCommand: true },
  { text: '  ● Loading infrastructure topology...', delay: 350 },
  { text: '  ● Connecting to cluster nodes...', delay: 350 },
  { text: '  ● Initializing render pipeline...', delay: 350 },
  { text: '  ✓ All systems operational', delay: 400, isSuccess: true },
];

interface BootSequenceProps {
  onComplete: () => void;
}

/**
 * Full-screen boot / terminal intro.
 * Types out lines on a dark terminal card, then fades away.
 */
const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    let idx = 0;
    let timeouts: ReturnType<typeof setTimeout>[] = [];

    const showNext = () => {
      if (idx < bootLines.length) {
        const line = bootLines[idx];
        const t = setTimeout(() => {
          setVisibleLines((v) => v + 1);
          idx++;
          showNext();
        }, line.delay);
        timeouts.push(t);
      } else {
        // All lines shown → wait, blink "Ready", then fade
        const t = setTimeout(() => {
          setFadingOut(true);
          setTimeout(onComplete, 600);
        }, 800);
        timeouts.push(t);
      }
    };

    showNext();

    // Cursor blink
    const cursorTimer = setInterval(() => {
      setShowCursor((c) => !c);
    }, 500);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(cursorTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!fadingOut && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05050A]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Terminal card */}
          <div className="w-full max-w-[480px] mx-6">
            {/* Chrome dots */}
            <div className="flex items-center gap-2 px-4 py-3 rounded-t-xl border-x border-t border-border/40 bg-black/80">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              <span className="text-text-secondary text-xs font-mono ml-2">bootstrap.sh</span>
            </div>

            {/* Terminal body */}
            <div className="px-5 py-5 rounded-b-xl border-x border-b border-border/40 bg-black/60 min-h-[200px]">
              <pre className="font-mono text-sm leading-relaxed">
                {bootLines.slice(0, visibleLines).map((line, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className={
                      line.isSuccess
                        ? 'text-green-400/90'
                        : line.isCommand
                          ? 'text-white/80'
                          : 'text-text-secondary'
                    }
                  >
                    {line.text}
                    {'\n'}
                  </motion.span>
                ))}
                {visibleLines < bootLines.length && (
                  <span
                    className="text-white/60"
                    style={{ opacity: showCursor ? 1 : 0 }}
                  >
                    _
                  </span>
                )}
                {visibleLines >= bootLines.length && (
                  <span className="text-green-400/70 animate-pulse">_</span>
                )}
              </pre>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;

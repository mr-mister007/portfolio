import { useState, useEffect } from 'react';

interface TypewriterProps {
  lines: string[];
  className?: string;
  speed?: number;
  delay?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({
  lines,
  className = '',
  speed = 40,
  delay = 1.5,
}) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    if (visibleLines >= lines.length) return;

    const target = lines[visibleLines];
    let i = 0;
    let cancelled = false;

    const type = () => {
      if (cancelled) return;
      if (i <= target.length) {
        setCurrentText(target.slice(0, i));
        i++;
        setTimeout(type, speed);
      } else {
        setTimeout(() => {
          setVisibleLines((v) => v + 1);
          setCurrentText('');
        }, delay * 1000);
      }
    };

    const startTimer = setTimeout(type, visibleLines === 0 ? delay * 1000 : 200);

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
    };
  }, [visibleLines, lines, speed, delay]);

  return (
    <div className={`font-mono text-[clamp(0.5rem,0.9vw,0.75rem)] leading-relaxed ${className}`}>
      {lines.slice(0, visibleLines).map((line, i) => (
        <p key={i} className="text-white/70">{line}</p>
      ))}
      {visibleLines < lines.length && (
        <p>
          <span className="text-green-400">user@infra</span>
          <span className="text-white/30">:</span>
          <span className="text-cyan-400">~</span>
          <span className="text-white/30">$ </span>
          <span className="text-white/80">{currentText}</span>
          <span className="text-cyan-400 animate-pulse ml-0.5">▌</span>
        </p>
      )}
    </div>
  );
};

export { Typewriter };
export default Typewriter;

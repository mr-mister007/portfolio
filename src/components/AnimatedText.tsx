import { useRef, useEffect, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  charDelay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  delay = 0,
  charDelay = 0.025,
}) => {
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || started) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const total = text.length;
    // Start revealing after the delay
    const delayTimer = setTimeout(() => {
      for (let i = 0; i <= total; i++) {
        setTimeout(() => setCount(i), i * charDelay * 1000);
      }
    }, delay * 1000);

    return () => clearTimeout(delayTimer);
  }, [started, text, delay, charDelay]);

  return (
    <span ref={ref} className={className}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          style={{
            opacity: i < count ? 1 : 0.1,
            transition: 'opacity 0.25s ease-out',
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export { AnimatedText };
export default AnimatedText;

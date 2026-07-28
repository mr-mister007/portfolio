import React, { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { MotionValue, useMotionValue } from 'framer-motion';

type ScrollListener = (scroll: number) => void;

interface ScrollContextValue {
  subscribe: (fn: ScrollListener) => () => void;
  scrollTo: (target: number | string | HTMLElement, opts?: { immediate?: boolean; duration?: number }) => void;
  scrollY: MotionValue<number>;
}

const ScrollContext = createContext<ScrollContextValue>({
  subscribe: () => () => {},
  scrollTo: () => {},
  scrollY: { get: () => 0, set: () => {}, attach: () => {}, detach: () => {} } as unknown as MotionValue<number>,
});

export const useLenis = () => useContext(ScrollContext);

/**
 * Tracks a section element's scroll progress through the viewport
 * using getBoundingClientRect. Returns a 0→1 MotionValue.
 */
export function useElementScrollProgress(
  ref: React.RefObject<HTMLElement | null>
): MotionValue<number> {
  const mv = useMotionValue(0);
  const { subscribe } = useLenis();
  const refCache = useRef(ref);
  refCache.current = ref;

  useEffect(() => {
    const unsub = subscribe(() => {
      const el = refCache.current?.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = vh + rect.height;
      const scrolled = vh - rect.top;
      mv.set(Math.max(0, Math.min(1, scrolled / total)));
    });
    return unsub;
  }, [subscribe, mv]);

  return mv;
}

export function useLenisProgress(): MotionValue<number> {
  const mv = useMotionValue(0);
  const { scrollY } = useLenis();

  useEffect(() => {
    const unsub = scrollY.on('change', (val) => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      mv.set(val / max);
    });
    return unsub;
  }, [scrollY, mv]);

  return mv;
}

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const listenersRef = useRef<Set<ScrollListener>>(new Set());
  const scrollYMV = useMotionValue(0);

  useEffect(() => {
    // Prevent browser scroll restoration — always start at top
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    // Native scroll mode — no wrapper/content refs
    // Lenis smooths native scroll, and `position: sticky` works natively.
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => { const s = 1 - t; return 1 - s * s * s; },
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      gestureOrientation: 'vertical',
      autoRaf: true,
    });

    lenis.on('scroll', (e: { scroll: number }) => {
      scrollYMV.set(e.scroll);
      listenersRef.current.forEach((fn) => fn(e.scroll));
    });

    lenisRef.current = lenis;

    return () => { lenis.destroy(); };
  }, [scrollYMV]);

  const subscribe = useCallback((fn: ScrollListener) => {
    listenersRef.current.add(fn);
    return () => { listenersRef.current.delete(fn); };
  }, []);

  const scrollTo = useCallback(
    (target: number | string | HTMLElement, opts?: { immediate?: boolean; duration?: number }) => {
      lenisRef.current?.scrollTo(target, { immediate: opts?.immediate, duration: opts?.duration ?? 1 });
    },
    []
  );

  return (
    <ScrollContext.Provider value={{ subscribe, scrollTo, scrollY: scrollYMV }}>
      {children}
    </ScrollContext.Provider>
  );
};

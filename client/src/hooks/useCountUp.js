import { useState, useCallback, useRef } from 'react';

export default function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  const start = useCallback(() => {
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return { count, start };
}

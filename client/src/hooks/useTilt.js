import { useRef, useCallback } from 'react';

export default function useTilt(intensity = 0.15) {
  const ref = useRef(null);

  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    const rotateX = (50 - yPct) * intensity;
    const rotateY = (xPct - 50) * intensity;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    el.style.transition = 'transform 0.05s linear';
    el.style.setProperty('--mx', `${xPct}%`);
    el.style.setProperty('--my', `${yPct}%`);
  }, [intensity]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    el.style.transition = 'transform 0.4s var(--ease-out-expo, cubic-bezier(0.19,1,0.22,1))';
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}

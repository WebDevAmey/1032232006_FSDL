import { useRef, useCallback } from 'react';

export default function useMagnet(strength = 0.3) {
  const ref = useRef(null);

  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      el.style.transition = 'transform 0.1s var(--ease-spring, cubic-bezier(0.34,1.56,0.64,1))';
    }
  }, [strength]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0,0)';
    el.style.transition = 'transform 0.4s var(--ease-spring, cubic-bezier(0.34,1.56,0.64,1))';
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}

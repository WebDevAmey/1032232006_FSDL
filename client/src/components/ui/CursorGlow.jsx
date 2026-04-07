import './CursorGlow.css';
import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    if ('ontouchstart' in window || window.innerWidth <= 768) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    };

    const animate = () => {
      const { x, y } = posRef.current;
      ringPos.current.x += (x - ringPos.current.x) * 0.12;
      ringPos.current.y += (y - ringPos.current.y) * 0.12;
      ring.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnterHover = () => ring.classList.add('hover');
    const onLeaveHover = () => ring.classList.remove('hover');

    const hoverEls = document.querySelectorAll('a, button, [data-hover]');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', onEnterHover);
      el.addEventListener('mouseleave', onLeaveHover);
    });

    window.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      hoverEls.forEach(el => {
        el.removeEventListener('mouseenter', onEnterHover);
        el.removeEventListener('mouseleave', onLeaveHover);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="kg-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="kg-cursor-ring" aria-hidden="true" />
    </>
  );
}

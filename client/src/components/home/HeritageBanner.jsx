import './HeritageBanner.css';
import { useEffect, useRef } from 'react';
import useCountUp from '../../hooks/useCountUp';

function StatItem({ target, label, delay }) {
  const ref = useRef(null);
  const { count, start } = useCountUp(target, 1500);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(start, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [start, delay]);

  return (
    <div className="kg-heritage__stat" ref={ref}>
      <span className="kg-heritage__number">{count}+</span>
      <span className="kg-heritage__label">{label}</span>
    </div>
  );
}

export default function HeritageBanner() {
  return (
    <div className="kg-heritage">
      <div className="kg-heritage__inner">
        <StatItem target={140} label="Artisans" delay={0} />
        <div className="kg-heritage__divider" />
        <StatItem target={9} label="Neighbourhoods" delay={200} />
        <div className="kg-heritage__divider" />
        <div className="kg-heritage__stat">
          <span className="kg-heritage__number">100%</span>
          <span className="kg-heritage__label">Handcrafted</span>
        </div>
      </div>
    </div>
  );
}

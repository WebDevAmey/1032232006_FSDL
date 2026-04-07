import './CountdownTimer.css';
import { useEffect, useState } from 'react';

export default function CountdownTimer({ targetDate, endDate, compact = false }) {
  const [label, setLabel] = useState('');

  useEffect(() => {
    // Support both targetDate (for haat start) and endDate (for festival countdown to end)
    const reference = targetDate || endDate;

    const tick = () => {
      const now = new Date();
      const target = new Date(reference);
      const diff = target - now;

      if (targetDate) {
        // Haat countdown mode
        const end = endDate ? new Date(endDate) : null;
        if (end && now > end) { setLabel('Finished'); return; }
        if (diff <= 0) { setLabel('Happening now'); return; }
      } else {
        // Festival countdown to a date
        if (diff <= 0) { setLabel('Today!'); return; }
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);

      if (compact) {
        setLabel(d > 0 ? `${d}d ${h}h` : `${h}h ${m}m`);
      } else {
        setLabel(`${d}d ${h}h ${m}m`);
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate, endDate, compact]);

  let cls = 'kg-countdown';
  if (label === 'Happening now') cls += ' kg-countdown--live';
  if (label === 'Finished') cls += ' kg-countdown--done';
  if (label === 'Today!') cls += ' kg-countdown--live';

  return <span className={cls}>{label || '—'}</span>;
}

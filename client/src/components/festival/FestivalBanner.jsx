import './FestivalBanner.css';
import { useEffect, useState } from 'react';
import { useFestival } from '../../context/FestivalContext';

function getCountdown(target) {
  const diff = target - Date.now();
  if (diff <= 0) {
    return '00:00:00';
  }
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

const FEST_END = Date.now() + 48 * 3600 * 1000;
const MARQUEE_ITEMS = [
  '✦ Diwali Special — 15% off all handmade',
  '🪔 Artisan drops from Pune makers',
  '✦ Festive packaging on every order',
  '🌿 Craft with heart, wear with pride',
  '✦ Limited festival stock — shop now',
];

export default function FestivalBanner() {
  const { isFestival } = useFestival();
  const [countdown, setCountdown] = useState(getCountdown(FEST_END));

  useEffect(() => {
    if (!isFestival) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setCountdown(getCountdown(FEST_END));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isFestival]);

  if (!isFestival) {
    return null;
  }

  const marqueeText = MARQUEE_ITEMS.join('   ');

  return (
    <div className="kg-fest-banner" aria-label="Festival promotion banner">
      <div className="kg-fest-banner__stripe" aria-hidden="true" />
      <div className="kg-fest-banner__content">
        <span className="kg-fest-banner__label">🪔 Diwali Special</span>
        <div className="kg-fest-banner__marquee-wrap" aria-hidden="true">
          <span className="kg-fest-banner__marquee">
            {marqueeText}
            {'   '}
            {marqueeText}
          </span>
        </div>
        <span className="kg-fest-banner__countdown">Ends in {countdown}</span>
      </div>
    </div>
  );
}

import './AnnouncementBar.css';
import { useEffect, useState } from 'react';
import { useFestival } from '../../context/FestivalContext';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);
  const { isFestival } = useFestival();

  useEffect(() => {
    const dismissed = sessionStorage.getItem('kg_ann');
    if (!dismissed) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className={`kg-announcement${isFestival ? ' kg-announcement--festival' : ''}`}>
      <span>
        {isFestival
          ? '🪔 Diwali Special — 15% off everything today!'
          : 'Free delivery on orders ₹999+ · Handmade, not mass-made'}
      </span>
      <button
        className="kg-announcement__close"
        onClick={() => {
          sessionStorage.setItem('kg_ann', '1');
          setVisible(false);
        }}
        aria-label="Dismiss"
        type="button"
      >
        ×
      </button>
    </div>
  );
}

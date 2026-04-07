import './FestivalModal.css';
import { useEffect, useState } from 'react';
import { useFestival } from '../../context/FestivalContext';

function Rangoli() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="kg-fest-modal__rangoli" aria-hidden="true">
      <circle cx="100" cy="100" r="8" fill="#FFD600" />
      <circle cx="100" cy="100" r="20" fill="none" stroke="#FF6F00" strokeWidth="2" opacity="0.8" />
      <circle cx="100" cy="100" r="35" fill="none" stroke="#E91E8C" strokeWidth="1.5" opacity="0.6" />
      <circle cx="100" cy="100" r="50" fill="none" stroke="#FFD600" strokeWidth="2" opacity="0.7" />
      <circle cx="100" cy="100" r="70" fill="none" stroke="#FF6F00" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

export default function FestivalModal() {
  const { isFestival, firstVisit, setFirstVisitDone } = useFestival();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isFestival || !firstVisit) {
      setVisible(false);
      return undefined;
    }

    setVisible(true);
    setProgress(100);

    const duration = 3500;
    const interval = 50;
    const step = (interval / duration) * 100;
    const timer = window.setInterval(() => {
      setProgress(value => {
        if (value <= 0) {
          window.clearInterval(timer);
          setVisible(false);
          setFirstVisitDone();
          return 0;
        }
        return value - step;
      });
    }, interval);

    return () => window.clearInterval(timer);
  }, [firstVisit, isFestival, setFirstVisitDone]);

  const handleClose = () => {
    setVisible(false);
    setFirstVisitDone();
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="kg-fest-modal" onClick={handleClose}>
      <div className="kg-fest-modal__box" onClick={(event) => event.stopPropagation()}>
        <Rangoli />
        <p className="kg-fest-modal__overline">🪔 Diwali Mela</p>
        <h2 className="kg-fest-modal__title">Karagiri celebrates the festival of lights with you</h2>
        <div className="kg-fest-modal__highlights">
          <span>✦ Festival drops by Pune artisans</span>
          <span>✦ Festive packaging on all orders</span>
          <span>✦ Share the craft love</span>
        </div>
        <div className="kg-fest-modal__progress">
          <svg viewBox="0 0 40 40" className="kg-fest-modal__ring" aria-hidden="true">
            <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,214,0,0.2)" strokeWidth="2" />
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke="#FFD600"
              strokeWidth="2"
              strokeDasharray={`${(progress / 100) * 100.5} 100.5`}
              strokeLinecap="round"
              transform="rotate(-90 20 20)"
            />
          </svg>
        </div>
        <button className="kg-fest-modal__close" onClick={handleClose} type="button">
          Let's Explore →
        </button>
      </div>
    </div>
  );
}

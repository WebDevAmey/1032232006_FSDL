import './FestivalButton.css';
import { useFestival } from '../../context/FestivalContext';

export default function FestivalButton() {
  const { isFestival, toggle } = useFestival();

  return (
    <button
      className={`kg-fest-btn${isFestival ? ' kg-fest-btn--active' : ''}`}
      onClick={toggle}
      type="button"
      aria-label={isFestival ? 'End festival mode' : 'Start festival mode'}
    >
      <span className="kg-fest-btn__star">✦</span>
      {isFestival ? 'Festival Mode' : 'Festival Mode'}
    </button>
  );
}

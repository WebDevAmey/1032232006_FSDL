import './HaatCard.css';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import CountdownTimer from './CountdownTimer';

const fmt = (date) => new Date(date).toLocaleDateString('en-IN', {
  month: 'short', day: 'numeric',
});

export default function HaatCard({ haat }) {
  const start = new Date(haat.startDate);
  const end = new Date(haat.endDate);
  const now = new Date();
  const upcoming = start > now;
  const ongoing = start <= now && end >= now;

  const approved = (haat.participants || []).filter(p => p.status === 'approved');
  const avatars = approved.slice(0, 4);
  const extra = approved.length - avatars.length;

  return (
    <Link to={`/haats/${haat.slug}`} className="kg-haat-card">
      <img src={haat.coverImage} alt={haat.title} className="kg-haat-card__cover" />
      <div className="kg-haat-card__body">
        <div className="kg-haat-card__type">
          {haat.category} · {haat.isOnline ? 'ONLINE' : haat.location?.split(',')[0]}
        </div>
        <div className="kg-haat-card__title">{haat.title}</div>
        <div className="kg-haat-card__date">
          {fmt(start)} – {fmt(end)}
          {upcoming && <span className="kg-haat-card__countdown"><CountdownTimer targetDate={haat.startDate} endDate={haat.endDate} /></span>}
        </div>
        <div className="kg-haat-card__location">{haat.location}</div>

        <div className="kg-haat-card__avatars">
          {avatars.map((p, i) => (
            <img
              key={i}
              src={p.artisanId?.profileImage}
              alt={p.artisanId?.shopName}
              className="kg-haat-card__avatar"
              style={{ left: `${i * 22}px` }}
            />
          ))}
          {extra > 0 && <span className="kg-haat-card__more">+{extra} more</span>}
        </div>

        <div className="kg-haat-card__footer">
          <span className="kg-haat-card__rsvp">{haat.rsvpCount} attending</span>
          {upcoming && <Button size="sm" variant="primary">RSVP Free</Button>}
          {ongoing && <Button size="sm" variant="secondary">Ongoing</Button>}
          {!upcoming && !ongoing && <Button size="sm" variant="ghost">Past</Button>}
        </div>
      </div>
    </Link>
  );
}

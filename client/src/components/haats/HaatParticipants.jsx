import './HaatParticipants.css';
import { Link } from 'react-router-dom';
import SectionHeader from '../common/SectionHeader';

export default function HaatParticipants({ participants = [] }) {
  return (
    <div className="kg-haat-participants">
      <SectionHeader overline="Participating Makers" title="Participating Makers" />
      <div className="kg-haat-participants__grid">
        {participants.map((p) => (
          <div key={p.artisanId?._id} className="kg-haat-participants__card">
            <img src={p.artisanId?.profileImage} alt={p.artisanId?.shopName} />
            <div>
              <div className="kg-haat-participants__name">{p.artisanId?.shopName}</div>
              <div className="kg-haat-participants__craft">{p.artisanId?.craft}</div>
              <Link to={`/makers/${p.artisanId?.slug}`} className="kg-haat-participants__link">
                View Shop →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

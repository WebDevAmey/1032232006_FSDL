import './NeighborhoodGrid.css';
import { Link } from 'react-router-dom';

const data = [
  { name: 'Koregaon Park', count: 28, q: 'koregaon-park' },
  { name: 'Baner', count: 19, q: 'baner' },
  { name: 'Viman Nagar', count: 22, q: 'viman-nagar' },
  { name: 'Kothrud', count: 15, q: 'kothrud' },
];

export default function NeighborhoodGrid() {
  return (
    <div className="kg-neighborhood-grid">
      {data.map((n, i) => (
        <Link
          key={n.q}
          to={`/shop?neighborhood=${n.q}`}
          className={`kg-neighborhood-card ${i % 2 === 0 ? 'kg-neighborhood-card--a' : 'kg-neighborhood-card--b'}`}
        >
          <div className="kg-neighborhood-card__name">{n.name}</div>
          <div className="kg-neighborhood-card__count">{n.count} makers</div>
        </Link>
      ))}
    </div>
  );
}

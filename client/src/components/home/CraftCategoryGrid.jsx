import './CraftCategoryGrid.css';
import { Link } from 'react-router-dom';

const crafts = [
  'Pottery', 'Textiles', 'Handloom', 'Jewellery',
  'Bakery', 'Ceramics', 'Leather', 'Candles',
];

export default function CraftCategoryGrid() {
  return (
    <div className="kg-craft-grid">
      {crafts.map((craft, i) => (
        <Link
          key={craft}
          to={`/shop?category=${encodeURIComponent(craft)}`}
          className={`kg-craft-grid__item ${i % 2 === 0 ? 'kg-craft-grid__item--a' : 'kg-craft-grid__item--b'}`}
        >
          {craft}
        </Link>
      ))}
    </div>
  );
}

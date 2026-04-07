import './FilterBar.css';
import Tag from '../ui/Tag';

const categories = [
  'All', 'Pottery', 'Textiles', 'Bakery', 'Jewelry',
  'Candles', 'Leather', 'Ceramics', 'Handloom',
];

export default function FilterBar({ active, onChange }) {
  return (
    <div className="kg-filterbar">
      {categories.map(cat => (
        <Tag
          key={cat}
          active={active === cat || (!active && cat === 'All')}
          onClick={() => onChange(cat)}
        >
          {cat}
        </Tag>
      ))}
    </div>
  );
}

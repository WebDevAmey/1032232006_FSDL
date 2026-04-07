import './SortDropdown.css';

export default function SortDropdown({ value, onChange }) {
  return (
    <select
      className="kg-sort"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="newest">Newest</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
    </select>
  );
}

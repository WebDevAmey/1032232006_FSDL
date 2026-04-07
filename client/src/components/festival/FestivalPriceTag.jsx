import './FestivalPriceTag.css';

export default function FestivalPriceTag({ price }) {
  const festivalPrice = Math.round(price * 0.85);

  return (
    <div className="kg-fest-price">
      <span className="kg-fest-price__label">MRP</span>
      <span className="kg-fest-price__original">₹{price.toLocaleString('en-IN')}</span>
      <span className="kg-fest-price__label kg-fest-price__label--highlight">Festival</span>
      <span className="kg-fest-price__value">₹{festivalPrice.toLocaleString('en-IN')}</span>
      <span className="kg-fest-price__badge">🪔 -15%</span>
      <span className="kg-fest-price__note">Festive display price</span>
    </div>
  );
}

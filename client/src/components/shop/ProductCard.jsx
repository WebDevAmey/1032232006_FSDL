import './ProductCard.css';
import { Link, useNavigate } from 'react-router-dom';
import StockBadge from './StockBadge';
import Badge from '../ui/Badge';
import useTilt from '../../hooks/useTilt';
import { useFestival } from '../../context/FestivalContext';
import { getStoredCraftDNA, isCraftDNAMatch } from '../../utils/craftDNA';

export default function ProductCard({
  _id,
  name,
  slug,
  price,
  comparePrice,
  images,
  stock,
  category,
  artisanId,
  style,
}) {
  const navigate = useNavigate();
  const { ref, onMouseMove, onMouseLeave } = useTilt(0.15);
  const { isFestival } = useFestival();
  const craftDNA = getStoredCraftDNA();
  const dnaMatch = isCraftDNAMatch(category, craftDNA);

  const onQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${slug}`);
  };
  const onMakerClick = (e) => {
    e.stopPropagation();
  };

  const festivalPrice = isFestival ? Math.round(price * 0.85) : null;

  return (
    <Link to={`/product/${slug}`} className="kg-product-card" style={style}>
      <div
        ref={ref}
        className="kg-product-card__image"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <img src={images?.[0]} alt={name} loading="lazy" />
        <div className="kg-product-card__shine" aria-hidden="true" />
        <div className="kg-product-card__overlay">
          <button className="kg-product-card__quick" onClick={onQuickView} type="button">
            Quick View
          </button>
        </div>
      </div>
      <div className="kg-product-card__body">
        <div className="kg-product-card__meta">
          <div className="kg-product-card__category">{category}</div>
          {dnaMatch && <div className="kg-product-card__dna">DNA match</div>}
        </div>
        <div className="kg-product-card__name">{name}</div>
        <div className="kg-product-card__maker">
          by{' '}
          <Link to={`/makers/${artisanId?.slug}`} onClick={onMakerClick}>
            {artisanId?.shopName}
          </Link>
        </div>
        <div className="kg-product-card__footer">
          <div className="kg-product-card__price">
            {isFestival ? (
              <>
                <span className="kg-product-card__price-label">Festival</span>
                <span className="kg-product-card__fest-price">₹{festivalPrice.toLocaleString('en-IN')}</span>
                <span className="kg-product-card__price-label kg-product-card__price-label--muted">MRP</span>
                <span className="kg-product-card__compare">₹{price.toLocaleString('en-IN')}</span>
                <span className="kg-product-card__fest-badge">🪔 -15%</span>
              </>
            ) : (
              <>
                ₹{price?.toLocaleString('en-IN')}
                {comparePrice > price && (
                  <span className="kg-product-card__compare">
                    ₹{comparePrice?.toLocaleString('en-IN')}
                  </span>
                )}
              </>
            )}
          </div>
          {comparePrice > price && !isFestival && <Badge color="rust">Sale</Badge>}
          <StockBadge stock={stock} productId={_id} />
        </div>
      </div>
    </Link>
  );
}

import './ArtisanCard.css';
import { Link, useNavigate } from 'react-router-dom';

export default function ArtisanCard({
  shopName,
  slug,
  craft,
  profileImage,
  neighborhood,
  products,
  story,
  process,
  isVerified,
  style,
  flip = true,
}) {
  const navigate = useNavigate();

  const backContent = (
    <div className="kg-acard-back">
      <div className="kg-acard-back__tag">{craft}</div>
      <div className="kg-acard-back__name">{shopName}</div>
      <p className="kg-acard-back__story line-clamp-3">
        {story || 'A maker with a craft and a story worth knowing.'}
      </p>
      {process?.length > 0 && (
        <div className="kg-acard-back__process">
          {process.slice(0, 2).map((item, index) => (
            <div key={`${item.step}-${index}`} className="kg-acard-back__step">
              <span className="kg-acard-back__step-num">0{index + 1}</span>
              {item.step}
            </div>
          ))}
        </div>
      )}
      <button className="kg-acard-back__cta" onClick={() => navigate(`/makers/${slug}`)} type="button">
        Visit Shop →
      </button>
    </div>
  );

  if (!flip) {
    return (
      <Link to={`/makers/${slug}`} className="kg-artisan-card" style={style}>
        <div className="kg-artisan-card__image">
          <img src={profileImage} alt={shopName} loading="lazy" />
        </div>
        <div className="kg-artisan-card__body">
          <div className="kg-artisan-card__craft">{craft}</div>
          <div className="kg-artisan-card__name">{shopName}</div>
          <div className="kg-artisan-card__location">· {neighborhood}</div>
          <div className="kg-artisan-card__footer">
            <span>{products?.length || 0} pieces</span>
            <span>View Shop →</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="kg-acard-3d" style={style}>
      <div className="kg-acard-inner">
        <div className="kg-acard-front">
          <div className="kg-artisan-card__image">
            <img src={profileImage} alt={shopName} loading="lazy" />
          </div>
          <div className="kg-artisan-card__body">
            <div className="kg-artisan-card__craft">{craft}</div>
            <div className="kg-artisan-card__name">
              {shopName}
              {isVerified && <span className="kg-artisan-card__verified">✓</span>}
            </div>
            <div className="kg-artisan-card__location">· {neighborhood}</div>
            <div className="kg-artisan-card__footer">
              <span>{products?.length || 0} pieces</span>
              <span>Hover to explore →</span>
            </div>
          </div>
        </div>
        {backContent}
      </div>
    </div>
  );
}

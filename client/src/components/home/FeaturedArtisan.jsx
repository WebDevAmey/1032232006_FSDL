import './FeaturedArtisan.css';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

export default function FeaturedArtisan({ artisan }) {
  const navigate = useNavigate();
  if (!artisan) return null;
  return (
    <div className="kg-featured">
      <div className="kg-featured__image">
        <img src={artisan.coverImage} alt={artisan.shopName} />
      </div>
      <div className="kg-featured__body">
        <div className="kg-featured__overline">FEATURED MAKER</div>
        <div className="kg-featured__name">{artisan.shopName}</div>
        <div className="kg-featured__craft">{artisan.craft}</div>
        <div className="kg-featured__tagline">{artisan.tagline}</div>
        <div className="kg-featured__bio">{artisan.bio}</div>
        {artisan.isVerified && <div className="kg-featured__verified">✦ Verified Maker</div>}
        <Button variant="ghost" size="md" onClick={() => navigate(`/makers/${artisan.slug}`)}>
          Visit their shop →
        </Button>
      </div>
    </div>
  );
}

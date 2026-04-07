import './ArtisanProfileHeader.css';

export default function ArtisanProfileHeader({ artisan, productsCount }) {
  if (!artisan) return null;
  return (
    <div className="kg-artisan-header">
      <div className="kg-artisan-header__inner">
        <img
          src={artisan.profileImage}
          alt={artisan.shopName}
          className="kg-artisan-header__image"
        />
        <div className="kg-artisan-header__content">
          <div className="kg-artisan-header__craft">{artisan.craft}</div>
          <h1 className="kg-artisan-header__name">{artisan.shopName}</h1>
          <div className="kg-artisan-header__tagline">{artisan.tagline}</div>
          <div className="kg-artisan-header__meta">
            {artisan.neighborhood} · {artisan.city} · {productsCount} pieces
          </div>
          {artisan.isVerified && (
            <div className="kg-artisan-header__verified">✦ Verified Maker</div>
          )}
        </div>
      </div>
    </div>
  );
}

import './CraftStoryBanner.css';

export default function CraftStoryBanner() {
  return (
    <section className="kg-story-banner">
      <div className="kg-story-banner__grid">
        <div className="kg-story-banner__quote">
          Every crack in the clay is the maker's signature.
        </div>
        <div className="kg-story-banner__right">
          <img
            src="/images/jewelry/gold-necklace.jpg"
            alt="Jewelry craftsmanship"
            className="kg-story-banner__image"
          />
          <p className="kg-story-banner__body">
            Karagiri brings together artisans across Pune, spotlighting the
            quiet genius in every hand-thrown, hand-woven, and hand-fired piece.
          </p>
          <a className="kg-story-banner__link" href="/makers">Our story →</a>
        </div>
      </div>
    </section>
  );
}

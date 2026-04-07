import './ArtisanStory.css';

export default function ArtisanStory({ story, coverImage }) {
  if (!story) return null;
  return (
    <div className="kg-artisan-story">
      <div className="kg-artisan-story__left">
        <div className="kg-artisan-story__overline">THEIR STORY</div>
        <div className="kg-artisan-story__text">{story}</div>
      </div>
      <div className="kg-artisan-story__right">
        <img src={coverImage} alt="Artisan story" />
      </div>
    </div>
  );
}

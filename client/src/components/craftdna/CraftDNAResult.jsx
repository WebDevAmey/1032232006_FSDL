import './CraftDNAResult.css';
import { useNavigate } from 'react-router-dom';

export default function CraftDNAResult({ persona, onClose }) {
  const navigate = useNavigate();

  const handleShop = () => {
    onClose?.();
    navigate(`/shop?category=${encodeURIComponent(persona.categories[0])}`);
  };

  const handleShare = async () => {
    const text = `I'm "${persona.name}" on Karagiri. Discover yours -> karagiri.in/craftdna`;

    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      }
    } catch {}
  };

  return (
    <div className="kg-dna-result">
      <div className="kg-dna-result__icon" style={{ color: persona.accent }}>{persona.icon}</div>
      <h2 className="kg-dna-result__name">{persona.name}</h2>
      <p className="kg-dna-result__tagline" style={{ color: persona.accent }}>{persona.tagline}</p>
      <p className="kg-dna-result__desc">{persona.desc}</p>
      <div className="kg-dna-result__cats">
        {persona.categories.map(category => (
          <span key={category} className="kg-dna-result__cat">{category}</span>
        ))}
      </div>
      <div className="kg-dna-result__actions">
        <button className="kg-dna-result__btn kg-dna-result__btn--primary" onClick={handleShop} type="button">
          Shop My Picks
        </button>
        <button className="kg-dna-result__btn kg-dna-result__btn--secondary" onClick={handleShare} type="button">
          Share my Craft DNA
        </button>
      </div>
    </div>
  );
}

import './GaneshIdolSection.css';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export default function GaneshIdolSection() {
  const navigate = useNavigate();
  return (
    <div className="kg-ganesh">
      <div className="kg-ganesh__content">
        <div className="kg-ganesh__eyebrow">ECO-FRIENDLY FESTIVAL EDIT</div>
        <h3 className="kg-ganesh__title">Artisanal Lord Ganesh Idols</h3>
        <p className="kg-ganesh__body">
          Hand-sculpted from river clay and finished with natural, non-toxic pigments.
          These idols are crafted for gentle immersion and a lighter environmental footprint.
        </p>
        <div className="kg-ganesh__features">
          <span>Natural clay + plant dyes</span>
          <span>Small-batch, handmade detailing</span>
          <span>Immersion-safe and biodegradable</span>
        </div>
        <div className="kg-ganesh__cta">
          <Button variant="primary" size="md" onClick={() => navigate('/shop?category=Ceramics')}>
            Explore idols
          </Button>
          <Button variant="ghost" size="md" onClick={() => navigate('/makers')}>
            Meet the idol makers →
          </Button>
        </div>
      </div>
      <div className="kg-ganesh__image">
        <img src="/images/festival/diya-tray.jpg" alt="Festival diya tray with warm handcrafted lighting" />
      </div>
    </div>
  );
}

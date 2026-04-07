import './MarqueeStrip.css';
import { useFestival } from '../../context/FestivalContext';

const normalText = 'POTTERY · TEXTILES · HANDLOOM · JEWELLERY · BAKERY · CERAMICS · LEATHER · CANDLES · ';
const festivalText = '🪔 DIWALI DROPS · FESTIVAL CRAFT · HANDMADE GIFTS · CELEBRATE LOCAL · ';

export default function MarqueeStrip() {
  const { isFestival } = useFestival();
  const text = isFestival ? festivalText : normalText;

  return (
    <div className={`kg-marquee${isFestival ? ' kg-marquee--festival' : ''}`}>
      <div className="kg-marquee__track">
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}

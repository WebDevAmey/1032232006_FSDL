import './ProductImages.css';
import { useEffect, useState } from 'react';

export default function ProductImages({ images = [], name }) {
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const main = images[active] || images[0];

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setZoomOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <div className="kg-product-images">
        <button className="kg-product-images__main" onClick={() => setZoomOpen(true)} type="button">
          {main && <img src={main} alt={name} loading="lazy" />}
        </button>
        <div className="kg-product-images__thumbs">
          {images.map((img, i) => (
            <button
              key={`${img}-${i}`}
              className={`kg-product-images__thumb ${i === active ? 'kg-product-images__thumb--active' : ''}`}
              onClick={() => setActive(i)}
              type="button"
            >
              <img src={img} alt={`${name} ${i + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      </div>
      {zoomOpen && main && (
        <div className="kg-product-images__lightbox" onClick={() => setZoomOpen(false)}>
          <img src={main} alt={name} onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </>
  );
}

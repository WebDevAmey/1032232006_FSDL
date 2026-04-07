import './ProductDetail.css';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct, getProducts } from '../api';
import { useCart } from '../context/CartContext';
import { useFestival } from '../context/FestivalContext';
import SEOHead from '../components/common/SEOHead';
import AnnouncementBar from '../components/nav/AnnouncementBar';
import Navbar from '../components/nav/Navbar';
import Section from '../components/layout/Section';
import Container from '../components/layout/Container';
import SectionHeader from '../components/common/SectionHeader';
import ProductImages from '../components/product/ProductImages';
import ProductGrid from '../components/shop/ProductGrid';
import Footer from '../components/common/Footer';
import FestivalBanner from '../components/festival/FestivalBanner';
import FestivalPriceTag from '../components/festival/FestivalPriceTag';
import Toast from '../components/common/Toast';

export default function ProductDetail() {
  const { slug } = useParams();
  const { addItem } = useCart();
  const { isFestival } = useFestival();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [qty, setQty] = useState(1);
  const [addState, setAddState] = useState('idle');
  const [showSticky, setShowSticky] = useState(false);
  const [toast, setToast] = useState(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      setError('');

      try {
        const productRes = await getProduct(slug);
        const nextProduct = productRes.data;
        if (!alive) {
          return;
        }
        setProduct(nextProduct);
        setQty(1);
        setAddState(nextProduct.stock === 0 ? 'soldout' : 'idle');

        const relatedRes = await getProducts({ category: nextProduct.category, limit: 5 });
        if (!alive) {
          return;
        }
        setRelated((relatedRes.data || []).filter(item => item.slug !== slug).slice(0, 4));
      } catch (err) {
        if (alive) {
          setError(err?.response?.data?.message || err.message || 'Could not load product.');
        }
      } finally {
        if (alive) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!buttonRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setShowSticky(!entry.isIntersecting);
    });

    observer.observe(buttonRef.current);
    return () => observer.disconnect();
  }, [product]);

  const handleAdd = async () => {
    if (!product || addState === 'soldout' || addState === 'loading') {
      return;
    }

    setAddState('loading');
    await new Promise(resolve => window.setTimeout(resolve, 800));
    addItem(product, qty);
    setAddState('added');
    setToast({ message: `${product.name} added to cart ✦`, type: 'success' });
    window.setTimeout(() => {
      setAddState(product.stock === 0 ? 'soldout' : 'idle');
    }, 1500);
  };

  const labelMap = {
    idle: isFestival ? 'Add to Diwali Cart 🪔' : 'Add to Cart',
    loading: 'Adding...',
    added: 'Added! ✦',
    soldout: 'Sold Out',
  };

  if (loading) {
    return (
      <>
        <AnnouncementBar />
        <Navbar />
        <Section>
          <Container>
            <div className="kg-pd__skeleton">
              <div className="skeleton" style={{ minHeight: '520px' }} />
              <div className="skeleton" style={{ minHeight: '400px' }} />
            </div>
          </Container>
        </Section>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <AnnouncementBar />
        <Navbar />
        <Section>
          <Container>
            <p>{error || 'Product not found.'}</p>
          </Container>
        </Section>
      </>
    );
  }

  return (
    <>
      <SEOHead title={product.name} description={product.description} image={product.images?.[0]} type="product" />
      <AnnouncementBar />
      {isFestival && <FestivalBanner />}
      <Navbar />
      <Section>
        <Container>
          <div className="kg-pd">
            <div className="kg-pd__images">
              <ProductImages images={product.images || []} name={product.name} />
            </div>
            <div className="kg-pd__info">
              <p className="kg-pd__category">{product.category}</p>
              <h1 className="kg-pd__name">{product.name}</h1>
              <div className="kg-pd__price">
                {isFestival ? (
                  <FestivalPriceTag price={product.price} />
                ) : (
                  <>
                    <span className="kg-pd__price-val">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.comparePrice > product.price && (
                      <span className="kg-pd__compare">₹{product.comparePrice.toLocaleString('en-IN')}</span>
                    )}
                  </>
                )}
              </div>
              <p className="kg-pd__desc">{product.description}</p>
              {product.stock > 0 && (
                <div className="kg-pd__qty">
                  <button className="kg-pd__qty-btn" onClick={() => setQty(value => Math.max(1, value - 1))} disabled={qty <= 1} type="button">−</button>
                  <span className="kg-pd__qty-val">{qty}</span>
                  <button className="kg-pd__qty-btn" onClick={() => setQty(value => Math.min(product.stock, value + 1))} disabled={qty >= product.stock} type="button">+</button>
                  <span className="kg-pd__stock-hint">{product.stock} available</span>
                </div>
              )}
              <button
                ref={buttonRef}
                className={`kg-pd__add kg-pd__add--${addState}`}
                onClick={handleAdd}
                disabled={addState === 'loading' || addState === 'soldout'}
                type="button"
              >
                {addState === 'loading' ? <span className="kg-btn__spinner" /> : labelMap[addState]}
              </button>
              {product.tags?.length > 0 && (
                <div className="kg-pd__tags">
                  {product.tags.map(tag => (
                    <span key={tag} className="kg-pd__tag">{tag}</span>
                  ))}
                </div>
              )}
              {product.artisanId && (
                <Link to={`/makers/${product.artisanId.slug}`} className="kg-pd__artisan">
                  <div className="kg-pd__artisan-img">
                    {product.artisanId.profileImage ? (
                      <img src={product.artisanId.profileImage} alt={product.artisanId.shopName} loading="lazy" />
                    ) : (
                      <span>{product.artisanId.shopName?.[0] || 'A'}</span>
                    )}
                  </div>
                  <div className="kg-pd__artisan-info">
                    <span className="kg-pd__artisan-name">
                      {product.artisanId.shopName}
                      {product.artisanId.isVerified && <span className="kg-pd__artisan-check">✓</span>}
                    </span>
                    <span className="kg-pd__artisan-craft">{product.artisanId.craft}</span>
                  </div>
                  <span className="kg-pd__artisan-cta">Browse their studio →</span>
                </Link>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section bg="var(--c-surface)">
          <Container>
            <SectionHeader overline="FROM THE STUDIO" title="You might also like" />
            <ProductGrid products={related} cols={4} />
          </Container>
        </Section>
      )}

      <Footer />

      {showSticky && (
        <div className="kg-pd__sticky">
          <span className="kg-pd__sticky-name line-clamp-2">{product.name}</span>
          <span className="kg-pd__sticky-price">₹{product.price.toLocaleString('en-IN')}</span>
          <button className="kg-pd__sticky-btn" onClick={handleAdd} disabled={addState === 'loading' || addState === 'soldout'} type="button">
            {addState === 'soldout' ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

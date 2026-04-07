import './ArtisanDashboard.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArtisanDashboard } from '../api';
import SEOHead from '../components/common/SEOHead';
import AnnouncementBar from '../components/nav/AnnouncementBar';
import Navbar from '../components/nav/Navbar';
import Section from '../components/layout/Section';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import Footer from '../components/common/Footer';

export default function ArtisanDashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const response = await getArtisanDashboard();
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Could not load dashboard');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <>
      <SEOHead title="Artisan Dashboard — Karagiri" />
      <AnnouncementBar />
      <Navbar />
      <Section>
        <Container className="kg-artisan-dashboard">
          <div className="kg-artisan-dashboard__head">
            <div>
              <div className="kg-artisan-dashboard__overline">ARTISAN DASHBOARD</div>
              <h1>{data?.artisan?.brandName || data?.artisan?.shopName || 'Your studio'}</h1>
              <p>Manage your brand story, products, and marketplace presence from one place.</p>
            </div>
            <div className="kg-artisan-dashboard__actions">
              <Link to="/artisan/onboarding"><Button variant="secondary">Edit profile</Button></Link>
              <Link to="/artisan/onboarding?step=products"><Button variant="primary">Add product</Button></Link>
            </div>
          </div>

          {loading && <div className="kg-artisan-dashboard__skeleton skeleton" />}
          {error && <div className="kg-artisan-dashboard__error">{error}</div>}

          {data && (
            <>
              <div className="kg-artisan-dashboard__stats">
                <div className="kg-stat-card"><span>Total products</span><strong>{data.stats.totalProducts}</strong></div>
                <div className="kg-stat-card"><span>Total orders</span><strong>{data.stats.totalOrders}</strong></div>
                <div className="kg-stat-card"><span>Haats joined</span><strong>{data.stats.haatsJoined}</strong></div>
              </div>

              <div className="kg-artisan-dashboard__grid">
                <section className="card-section">
                  <h2>Profile summary</h2>
                  <div className="kg-artisan-dashboard__summary">
                    <img
                      src={data.artisan.profileImage || '/images/artisan/artisan-sewing.jpg'}
                      alt={data.artisan.shopName}
                      loading="lazy"
                    />
                    <div>
                      <h3>{data.artisan.shopName}</h3>
                      <p>{data.artisan.shortBio || data.artisan.bio || 'Add a short bio to introduce your storefront.'}</p>
                      <ul>
                        <li>Category: {data.artisan.category || data.artisan.craft}</li>
                        <li>City: {data.artisan.city || 'Pune'}</li>
                        <li>Custom orders: {data.artisan.acceptsCustomOrders ? 'Yes' : 'No'}</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="card-section">
                  <h2>Haat participation</h2>
                  <p>You have joined or hosted {data.stats.haatsJoined} haat{data.stats.haatsJoined === 1 ? '' : 's'} so far.</p>
                  <div className="kg-artisan-dashboard__haat-actions">
                    <Link to="/haats"><Button variant="secondary">Browse haats</Button></Link>
                    <Link to="/haats/create"><Button variant="primary">Create haat</Button></Link>
                  </div>
                </section>
              </div>

              <section className="card-section">
                <div className="kg-artisan-dashboard__products-head">
                  <h2>Products list</h2>
                  <Link to="/artisan/onboarding?step=products"><Button variant="secondary">Add product</Button></Link>
                </div>
                <div className="kg-artisan-dashboard__products">
                  {data.products.map((product) => (
                    <div key={product._id} className="kg-artisan-dashboard__product">
                      <img src={product.images?.[0] || '/images/pottery/terracotta-pots.jpg'} alt={product.name} loading="lazy" />
                      <div className="kg-artisan-dashboard__product-copy">
                        <strong>{product.name}</strong>
                        <span>{product.category}</span>
                        <span>₹{Number(product.price || 0).toLocaleString('en-IN')}</span>
                        <span>{product.stock} in stock</span>
                      </div>
                      <Link className="kg-artisan-dashboard__edit" to={`/artisan/onboarding?step=products&product=${product._id}`}>Edit product</Link>
                    </div>
                  ))}
                  {data.products.length === 0 && (
                    <div className="kg-artisan-dashboard__empty">
                      No products yet. Add your first product to bring your storefront live.
                    </div>
                  )}
                </div>
              </section>
            </>
          )}
        </Container>
      </Section>
      <Footer />
    </>
  );
}

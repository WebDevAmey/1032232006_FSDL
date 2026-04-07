import './Orders.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyOrders } from '../api';
import { useAuth } from '../context/AuthContext';
import SEOHead from '../components/common/SEOHead';
import AnnouncementBar from '../components/nav/AnnouncementBar';
import Navbar from '../components/nav/Navbar';
import Section from '../components/layout/Section';
import Container from '../components/layout/Container';
import SectionHeader from '../components/common/SectionHeader';
import EmptyState from '../components/common/EmptyState';
import Badge from '../components/ui/Badge';
import Footer from '../components/common/Footer';

const fmt = (date) => new Date(date).toLocaleDateString('en-IN', {
  month: 'short', day: 'numeric', year: 'numeric',
});

export default function Orders() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    async function load() {
      const { data } = await getMyOrders();
      setOrders(data || []);
    }
    load();
  }, [isLoggedIn, navigate]);

  return (
    <>
      <SEOHead title="My Orders — Karagiri" />
      <AnnouncementBar />
      <Navbar />
      <Section>
        <Container>
          <SectionHeader overline="MY ORDERS" title="Your purchases" />
          {orders.length === 0 ? (
            <EmptyState
              heading="No orders yet"
              subtext="Your future purchases will appear here."
              cta={{ label: 'Go to shop', onClick: () => navigate('/shop') }}
            />
          ) : (
            <div className="kg-orders">
              {orders.map(o => (
                <div className="kg-order-card" key={o._id}>
                  <div className="kg-order-card__header">
                    <span>{fmt(o.createdAt)}</span>
                    <Badge color="gray">{o.status}</Badge>
                  </div>
                  <ul className="kg-order-card__items">
                    {o.items.map((it, i) => (
                      <li key={i}>{it.name} × {it.qty}</li>
                    ))}
                  </ul>
                  <div className="kg-order-card__total">Total: ₹{o.totalAmount}</div>
                  {o.shippingAddress?.line1 && (
                    <div className="kg-order-card__address">
                      Ship to: {o.shippingAddress.name}, {o.shippingAddress.line1}, {o.shippingAddress.city}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Container>
      </Section>
      <Footer />
    </>
  );
}

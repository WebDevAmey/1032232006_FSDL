import './Cart.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { placeOrder } from '../api';
import { useCart } from '../context/CartContext';
import SEOHead from '../components/common/SEOHead';
import AnnouncementBar from '../components/nav/AnnouncementBar';
import Navbar from '../components/nav/Navbar';
import Section from '../components/layout/Section';
import Container from '../components/layout/Container';
import SectionHeader from '../components/common/SectionHeader';
import CartItem from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';
import EmptyState from '../components/common/EmptyState';
import Footer from '../components/common/Footer';

export default function Cart() {
  const { items, count, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onPlaceOrder = async () => {
    setLoading(true);
    try {
      await placeOrder({ items, totalAmount: total });
      clearCart();
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead title="Your Cart — Karagiri" />
      <AnnouncementBar />
      <Navbar />
      {count === 0 ? (
        <Section>
          <Container>
            <EmptyState
              heading="Your cart is empty"
              subtext="Browse the shop to add something beautiful."
              cta={{ label: 'Go to shop', onClick: () => navigate('/shop') }}
            />
          </Container>
        </Section>
      ) : (
        <Section>
          <Container>
            <div className="kg-cart-page">
              <div>
                <SectionHeader title="Your Cart" />
                {items.map(item => <CartItem key={item.productId} item={item} />)}
                <Link className="kg-cart-page__continue" to="/shop">Continue Shopping</Link>
              </div>
              <OrderSummary items={items} total={total} onPlaceOrder={onPlaceOrder} loading={loading} />
            </div>
          </Container>
        </Section>
      )}
      <Footer />
    </>
  );
}

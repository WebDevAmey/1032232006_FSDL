import './Checkout.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../api';
import { useCart } from '../context/CartContext';
import SEOHead from '../components/common/SEOHead';
import AnnouncementBar from '../components/nav/AnnouncementBar';
import Navbar from '../components/nav/Navbar';
import Section from '../components/layout/Section';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import Footer from '../components/common/Footer';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    line1: '',
    city: '',
    state: '',
    pin: '',
    phone: '',
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await placeOrder({
      items,
      totalAmount: total,
      shippingAddress: form,
    });
    clearCart();
    navigate('/orders');
  };

  return (
    <>
      <SEOHead title="Checkout — Karagiri" />
      <AnnouncementBar />
      <Navbar />
      <Section>
        <Container size="narrow">
          <form className="kg-checkout" onSubmit={onSubmit}>
            <h2>Shipping Address</h2>
            <input name="name" placeholder="Full name" value={form.name} onChange={onChange} required />
            <input name="line1" placeholder="Address line 1" value={form.line1} onChange={onChange} required />
            <input name="city" placeholder="City" value={form.city} onChange={onChange} required />
            <input name="state" placeholder="State" value={form.state} onChange={onChange} required />
            <input name="pin" placeholder="PIN code" value={form.pin} onChange={onChange} required />
            <input name="phone" placeholder="Phone" value={form.phone} onChange={onChange} required />
            <Button variant="primary" fullWidth type="submit">Place Order</Button>
          </form>
        </Container>
      </Section>
      <Footer />
    </>
  );
}

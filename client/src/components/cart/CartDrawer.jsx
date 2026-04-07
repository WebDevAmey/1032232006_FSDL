import './CartDrawer.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import EmptyState from '../common/EmptyState';
import Button from '../ui/Button';

export default function CartDrawer({ isOpen, onClose }) {
  const { items, count, total } = useCart();
  const navigate = useNavigate();

  return (
    <>
      {isOpen && <div className="kg-cart-backdrop" onClick={onClose} />}
      <div className={`kg-cart-drawer ${isOpen ? 'kg-cart-drawer--open' : ''}`}>
        <div className="kg-cart-drawer__header">
          <div>Your cart ({count})</div>
          <button onClick={onClose} type="button">×</button>
        </div>
        <div className="kg-cart-drawer__body">
          {count === 0 ? (
            <EmptyState heading="Cart is empty" subtext="Add something special." />
          ) : (
            items.map(item => <CartItem key={item.productId} item={item} />)
          )}
        </div>
        <div className="kg-cart-drawer__footer">
          <div className="kg-cart-drawer__subtotal">
            <span>Subtotal</span>
            <strong>₹{total}</strong>
          </div>
          <div className="kg-cart-drawer__note">Free delivery on orders above ₹999</div>
          <Button
            variant="primary"
            fullWidth
            onClick={() => { onClose(); navigate('/cart'); }}
          >
            Go to Cart
          </Button>
        </div>
      </div>
    </>
  );
}

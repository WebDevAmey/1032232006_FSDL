import './OrderSummary.css';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

export default function OrderSummary({ items = [], total = 0, onPlaceOrder, loading }) {
  const count = items.reduce((s, i) => s + i.qty, 0);
  const delivery = total > 999 ? 0 : 99;
  const grand = total + delivery;

  return (
    <div className="kg-summary">
      <div className="kg-summary__row">
        <span>Items ({count})</span>
        <span>₹{total}</span>
      </div>
      <div className="kg-summary__row">
        <span>Delivery</span>
        <span>{delivery === 0 ? 'Free' : `₹${delivery}`}</span>
      </div>
      <div className="kg-summary__divider" />
      <div className="kg-summary__row kg-summary__total">
        <span>Total</span>
        <span>₹{grand}</span>
      </div>
      <Button variant="primary" fullWidth onClick={onPlaceOrder} disabled={loading}>
        {loading ? <Spinner /> : 'Place Order'}
      </Button>
    </div>
  );
}

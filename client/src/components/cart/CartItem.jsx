import './CartItem.css';
import { useCart } from '../../context/CartContext';

export default function CartItem({ item }) {
  const { removeItem, updateQty } = useCart();
  return (
    <div className="kg-cart-item">
      <img src={item.image} alt={item.name} className="kg-cart-item__image" />
      <div className="kg-cart-item__body">
        <div className="kg-cart-item__name">{item.name}</div>
        <div className="kg-cart-item__artisan">{item.artisanName}</div>
        <div className="kg-cart-item__row">
          <div className="kg-cart-item__qty">
            <button onClick={() => updateQty(item.productId, item.qty - 1)} type="button">−</button>
            <span>{item.qty}</span>
            <button onClick={() => updateQty(item.productId, item.qty + 1)} type="button">+</button>
          </div>
          <div className="kg-cart-item__price">₹{item.price}</div>
        </div>
        <button className="kg-cart-item__remove" onClick={() => removeItem(item.productId)} type="button">
          Remove
        </button>
      </div>
    </div>
  );
}

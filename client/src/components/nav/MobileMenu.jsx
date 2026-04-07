import './MobileMenu.css';
import { Link } from 'react-router-dom';

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <div className={`kg-mobile-menu ${isOpen ? 'kg-mobile-menu--open' : ''}`}>
      <div className="kg-mobile-menu__backdrop" onClick={onClose} />
      <div className="kg-mobile-menu__panel">
        <button className="kg-mobile-menu__close" onClick={onClose} type="button">×</button>
        <Link className="kg-mobile-menu__link" to="/shop" onClick={onClose}>Shop</Link>
        <Link className="kg-mobile-menu__link" to="/makers" onClick={onClose}>Makers</Link>
        <Link className="kg-mobile-menu__link" to="/haats" onClick={onClose}>Haats</Link>
        <Link className="kg-mobile-menu__link" to="/cart" onClick={onClose}>Cart</Link>
        <Link className="kg-mobile-menu__link" to="/login" onClick={onClose}>Login</Link>
      </div>
    </div>
  );
}

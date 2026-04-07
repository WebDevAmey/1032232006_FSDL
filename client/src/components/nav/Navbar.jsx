import './Navbar.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useFestival } from '../../context/FestivalContext';
import CartDrawer from '../cart/CartDrawer';
import MobileMenu from './MobileMenu';
import FestivalButton from '../festival/FestivalButton';

export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const { count } = useCart();
  const { isFestival } = useFestival();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setScrollPct(0);
        return;
      }
      setScrollPct((window.scrollY / docHeight) * 100);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`kg-navbar${isFestival ? ' kg-navbar--festival' : ''}`}>
        <div className="kg-navbar__left">
          <Link to="/" className="kg-navbar__brand">KARAGIRI</Link>
        </div>
        <div className="kg-navbar__center">
          <NavLink to="/shop" className={({ isActive }) => `kg-navbar__link${isActive ? ' active' : ''}`}>Shop</NavLink>
          <NavLink to="/makers" className={({ isActive }) => `kg-navbar__link${isActive ? ' active' : ''}`}>Makers</NavLink>
          <NavLink to="/haats" className={({ isActive }) => `kg-navbar__link${isActive ? ' active' : ''}`}>Haats</NavLink>
        </div>
        <div className="kg-navbar__right">
          <FestivalButton />
          <button className="kg-navbar__cart" onClick={() => setCartOpen(true)} type="button" aria-label="Open cart">
            <svg viewBox="0 0 24 24" className="kg-navbar__icon" aria-hidden="true">
              <path d="M6 7h12l-1.2 12H7.2L6 7Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 7V6a3 3 0 0 1 6 0v1" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            {count > 0 && <span className="kg-navbar__badge">{count}</span>}
          </button>
          {isLoggedIn ? (
            <div className="kg-navbar__auth">
              <span className="kg-navbar__user">{user?.name?.split(' ')[0]}</span>
              <button
                className="kg-navbar__logout"
                onClick={() => { logout(); navigate('/'); }}
                type="button"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="kg-navbar__auth">
              <Link to="/login" className="kg-navbar__link">Login</Link>
              <Link to="/register" className="kg-navbar__join">Join</Link>
            </div>
          )}
          <button
            className="kg-navbar__hamburger"
            onClick={() => setMenuOpen(true)}
            type="button"
            aria-label="Open menu"
          >
            ≡
          </button>
        </div>
        <div className="kg-navbar__progress" style={{ width: `${scrollPct}%` }} aria-hidden="true" />
      </nav>
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

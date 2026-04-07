import './Footer.css';

export default function Footer() {
  return (
    <footer className="kg-footer">
      <div className="kg-footer__grid">
        <div className="kg-footer__col">
          <div className="kg-footer__brand">KARAGIRI</div>
          <div className="kg-footer__tagline">Where craft finds its people.</div>
          <div className="kg-footer__meta">Crafted in Pune · 2025</div>
        </div>
        <div className="kg-footer__col">
          <div className="kg-footer__heading">Explore</div>
          <a className="kg-footer__link" href="/shop">Shop</a>
          <a className="kg-footer__link" href="/makers">Makers</a>
          <a className="kg-footer__link" href="/haats">Haats</a>
          <a className="kg-footer__link" href="/cart">Cart</a>
        </div>
        <div className="kg-footer__col">
          <div className="kg-footer__heading">Community</div>
          <a className="kg-footer__link" href="/register">Join as Maker</a>
          <a className="kg-footer__link" href="/haats/create">Host a Haat</a>
          <a className="kg-footer__link" href="/orders">Your Orders</a>
          <a className="kg-footer__link" href="/login">Login</a>
        </div>
        <div className="kg-footer__col">
          <div className="kg-footer__heading">Support</div>
          <a className="kg-footer__link" href="/shop">Shipping</a>
          <a className="kg-footer__link" href="/shop">Returns</a>
          <a className="kg-footer__link" href="/makers">Contact</a>
          <a className="kg-footer__link" href="/haats">FAQs</a>
        </div>
      </div>
      <div className="kg-footer__bottom">
        <span>© 2025 Karagiri. All rights reserved.</span>
        <span>Made for Full Stack Development Laboratory</span>
      </div>
    </footer>
  );
}

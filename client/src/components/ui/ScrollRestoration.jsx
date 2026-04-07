import './ScrollRestoration.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollRestoration() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <div className="kg-scroll-restoration" aria-hidden="true" />;
}

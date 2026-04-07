import './PageTransition.css';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }) {
  const location = useLocation();
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.animation = 'none';
      void ref.current.offsetHeight;
      ref.current.style.animation = 'pageIn 0.4s cubic-bezier(0.19,1,0.22,1) forwards';
    }
  }, [location.pathname]);

  return (
    <div ref={ref} className="kg-page-transition">
      {children}
    </div>
  );
}

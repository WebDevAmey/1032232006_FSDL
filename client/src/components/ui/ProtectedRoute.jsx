import './ProtectedRoute.css';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, artisanOnly = false }) {
  const { isLoggedIn, isArtisan, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!isLoggedIn) {
      localStorage.setItem('kg_redirect_after_login', location.pathname + location.search);
      navigate('/login', { replace: true });
      return;
    }

    if (artisanOnly && !isArtisan) {
      navigate('/', { replace: true });
    }
  }, [artisanOnly, isArtisan, isLoggedIn, loading, location.pathname, location.search, navigate]);

  if (loading || !isLoggedIn || (artisanOnly && !isArtisan)) {
    return <div className="kg-protected-route" aria-hidden="true" />;
  }

  return children;
}

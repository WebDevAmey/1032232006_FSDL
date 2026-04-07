import './AuthContext.css';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem('kg_token');
    const u = localStorage.getItem('kg_user');
    if (t && u) {
      setToken(t);
      try { setUser(JSON.parse(u)); } catch {}
    }
    setLoading(false);
  }, []);

  const login = (tok, usr) => {
    setToken(tok); setUser(usr);
    localStorage.setItem('kg_token', tok);
    localStorage.setItem('kg_user', JSON.stringify(usr));
  };

  const logout = () => {
    setToken(null); setUser(null);
    localStorage.removeItem('kg_token');
    localStorage.removeItem('kg_user');
  };

  return (
    <AuthContext.Provider value={{
      user, token, loading,
      login, logout,
      isArtisan: user?.role === 'artisan',
      isLoggedIn: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

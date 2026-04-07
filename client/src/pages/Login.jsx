import './Login.css';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import { useAuth } from '../context/AuthContext';
import SEOHead from '../components/common/SEOHead';
import AnnouncementBar from '../components/nav/AnnouncementBar';
import Navbar from '../components/nav/Navbar';
import Section from '../components/layout/Section';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import Footer from '../components/common/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = await loginUser({ email, password });
    login(data.token, data.user);
    const to = location.state?.from || '/';
    navigate(to);
  };

  return (
    <>
      <SEOHead title="Login — Karagiri" />
      <AnnouncementBar />
      <Navbar />
      <Section>
        <Container size="narrow">
          <form className="kg-auth" onSubmit={onSubmit}>
            <h2>Welcome back</h2>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <Button variant="primary" fullWidth type="submit">Login</Button>
            <div className="kg-auth__switch">
              New here? <Link to="/register">Create an account</Link>
            </div>
          </form>
        </Container>
      </Section>
      <Footer />
    </>
  );
}

import './NotFound.css';
import { Link } from 'react-router-dom';
import Navbar from '../components/nav/Navbar';
import Container from '../components/layout/Container';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <Container>
        <div className="kg-notfound">
          <div className="kg-notfound__icon">∅</div>
          <h1 className="kg-notfound__title">Page not found</h1>
          <p className="kg-notfound__text">This page has wandered off the loom.</p>
          <Link to="/" className="kg-notfound__link">
            ← Back to home
          </Link>
        </div>
      </Container>
    </>
  );
}

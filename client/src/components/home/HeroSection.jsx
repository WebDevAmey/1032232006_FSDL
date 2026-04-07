import './HeroSection.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Container from '../layout/Container';
import Button from '../ui/Button';
import { getStoredCraftDNA } from '../../utils/craftDNA';

export default function HeroSection() {
  const navigate = useNavigate();
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const rafRef = useRef(null);
  const [personaName, setPersonaName] = useState('');
  const line1 = ['Crafted', 'hands.'];
  const line2 = ['Local', 'roots.'];

  useEffect(() => {
    try {
      const saved = getStoredCraftDNA();
      if (saved?.persona) {
        setPersonaName(saved.persona);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (img1Ref.current) {
          img1Ref.current.style.transform = `translateY(${scrollY * 0.08}px)`;
        }
        if (img2Ref.current) {
          img2Ref.current.style.transform = `translateY(${scrollY * -0.04}px)`;
        }
        if (img3Ref.current) {
          img3Ref.current.style.transform = `translateY(${scrollY * 0.06}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="kg-hero">
      <Container>
        <div className="kg-hero__grid">
          <div className="kg-hero__left">
            <div className="kg-hero__overline">EST. 2025 · PUNE, INDIA</div>
            {personaName && (
              <div className="kg-hero__dna-pill">
                Welcome back, {personaName}
                <button
                  className="kg-hero__dna-link"
                  onClick={() => document.querySelector('.kg-home__curated')?.scrollIntoView({ behavior: 'smooth' })}
                  type="button"
                >
                  Your curated picks
                </button>
              </div>
            )}
            <h1 className="kg-hero__title">
              <span className="kg-hero__line">
                {line1.map((word, index) => (
                  <span key={word} className="kg-hero__word-wrap">
                    <span className="kg-hero__word" style={{ animationDelay: `${index * 80}ms` }}>{word}</span>
                  </span>
                ))}
              </span>
              <span className="kg-hero__line kg-hero__indent">
                {line2.map((word, index) => (
                  <span key={word} className="kg-hero__word-wrap">
                    <span className="kg-hero__word" style={{ animationDelay: `${240 + index * 80}ms` }}>{word}</span>
                  </span>
                ))}
              </span>
            </h1>
            <p className="kg-hero__body">
              Discover hyperlocal artisans, studio-made craft, and the slow rituals
              that shape each piece.
            </p>
            <div className="kg-hero__cta">
              <Button variant="primary" size="lg" onClick={() => navigate('/shop')}>
                Explore the shop
              </Button>
              <Link className="kg-hero__ghost" to="/makers">Meet the makers →</Link>
            </div>
          </div>
          <div className="kg-hero__right">
            <div className="kg-hero__images">
              <img ref={img1Ref} src="/images/pottery/terracotta-pots.jpg" alt="Pottery" className="kg-hero__img kg-hero__img--tall" loading="lazy" />
              <img ref={img2Ref} src="/images/textile/loom-weaving.jpg" alt="Weaving" className="kg-hero__img" loading="lazy" />
              <img ref={img3Ref} src="/images/jewelry/gold-jewelry-set.jpg" alt="Handmade jewelry" className="kg-hero__img" loading="lazy" />
            </div>
            <div className="kg-hero__stat">140+ Makers · 9 Neighbourhoods</div>
          </div>
        </div>
        <button
          className="kg-hero__scroll-hint"
          onClick={() => document.querySelector('.kg-marquee')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Scroll down"
          type="button"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        </button>
      </Container>
    </div>
  );
}

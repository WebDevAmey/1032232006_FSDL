import './Home.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArtisans, getProducts, getHaats } from '../api';
import { useFestival } from '../context/FestivalContext';
import SEOHead from '../components/common/SEOHead';
import AnnouncementBar from '../components/nav/AnnouncementBar';
import Navbar from '../components/nav/Navbar';
import HeroSection from '../components/home/HeroSection';
import MarqueeStrip from '../components/home/MarqueeStrip';
import HeritageBanner from '../components/home/HeritageBanner';
import Section from '../components/layout/Section';
import Container from '../components/layout/Container';
import SectionHeader from '../components/common/SectionHeader';
import CraftCategoryGrid from '../components/home/CraftCategoryGrid';
import FeaturedArtisan from '../components/home/FeaturedArtisan';
import ProductGrid from '../components/shop/ProductGrid';
import CraftStoryBanner from '../components/home/CraftStoryBanner';
import Grid from '../components/layout/Grid';
import HaatCard from '../components/haats/HaatCard';
import NeighborhoodGrid from '../components/home/NeighborhoodGrid';
import Footer from '../components/common/Footer';
import FestivalBanner from '../components/festival/FestivalBanner';
import FestivalParticles from '../components/festival/FestivalParticles';
import FestivalModal from '../components/festival/FestivalModal';
import Button from '../components/ui/Button';
import CraftDNAQuiz from '../components/craftdna/CraftDNAQuiz';
import { getStoredCraftDNA } from '../utils/craftDNA';

const FESTIVAL_GIFT_FINDER = [
  {
    title: 'Pottery Decor',
    subtitle: 'Warm ceramics for festive corners',
    image: '/images/pottery/blue-pottery.jpg',
    href: '/shop?category=Pottery',
  },
  {
    title: 'Textile Gifts',
    subtitle: 'Handwoven color for homes and hosts',
    image: '/images/textile/colorful-weaving.jpg',
    href: '/shop?category=Textiles',
  },
  {
    title: 'Jewellery Picks',
    subtitle: 'Bright statement pieces for gifting',
    image: '/images/jewelry/gold-jewelry-set.jpg',
    href: '/shop?category=Jewelry',
  },
  {
    title: 'Candlelight Craft',
    subtitle: 'Warm candle pieces for festive evenings',
    image: '/images/candles/ornate-candles.jpg',
    href: '/shop?category=Candles',
  },
];

export default function Home() {
  const [artisans, setArtisans] = useState([]);
  const [products, setProducts] = useState([]);
  const [haats, setHaats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [dna, setDna] = useState(null);
  const { isFestival } = useFestival();

  useEffect(() => {
    async function load() {
      try {
        const [a, p, h] = await Promise.all([
          getArtisans(),
          getProducts({ sort: 'newest', limit: 8 }),
          getHaats({ upcoming: true, limit: 3 }),
        ]);
        setArtisans(a.data || []);
        setProducts(p.data || []);
        setHaats(h.data || []);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    try {
      setDna(getStoredCraftDNA());
    } catch {
      setDna(null);
    }
  }, [showQuiz]);

  const curatedProducts = products.filter(product => dna?.categories?.includes(product.category)).slice(0, 4);

  return (
    <>
      <SEOHead
        title="Home"
        description="Karagiri — hyperlocal artisan marketplace Pune. Discover handmade pottery, textiles, jewellery and more."
      />
      <AnnouncementBar />
      {isFestival && <FestivalBanner />}
      <Navbar />
      <main className="kg-home">
        <HeroSection />
        <MarqueeStrip />
        <HeritageBanner />
        <Section>
          <Container>
            <SectionHeader
              overline="EXPLORE BY CRAFT"
              title="Find what speaks to you"
              align="center"
            />
            <CraftCategoryGrid />
          </Container>
        </Section>
        {isFestival && (
          <Section className="kg-home__giftfinder-section">
            <Container>
              <div className="kg-home__giftfinder-head">
                <div className="kg-home__giftfinder-overline">FESTIVAL GIFT FINDER</div>
                <h2 className="kg-home__giftfinder-title">Pick a festive mood. We’ll take you there.</h2>
              </div>
              <div className="kg-home__giftfinder-grid">
                {FESTIVAL_GIFT_FINDER.map((item) => (
                  <Link key={item.title} to={item.href} className="kg-home__giftfinder-card">
                    <img src={item.image} alt={item.title} className="kg-home__giftfinder-image" loading="lazy" />
                    <div className="kg-home__giftfinder-copy">
                      <div className="kg-home__giftfinder-cardtitle">{item.title}</div>
                      <div className="kg-home__giftfinder-subtitle">{item.subtitle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </Container>
          </Section>
        )}
        <Section className="kg-home__dna-section" py="80px">
          <Container className="kg-home__dna-wrap">
            <div className="kg-home__dna-overline">CRAFT DNA</div>
            <h2 className="kg-home__dna-title">Which maker are you?</h2>
            <p className="kg-home__dna-subtitle">3 questions. Your personalised craft feed.</p>
            <div className="kg-home__dna-button">
              <Button variant="primary" size="lg" onClick={() => setShowQuiz(true)}>
                Take the Quiz →
              </Button>
            </div>
          </Container>
        </Section>
        <Section bg="var(--c-surface)">
          <Container>
            <SectionHeader overline="FEATURED MAKER" title="In the spotlight" />
            {artisans[0] && <FeaturedArtisan artisan={artisans[0]} />}
          </Container>
        </Section>
        <Section>
          <Container>
            <SectionHeader
              overline="FRESH ARRIVALS"
              title="Just from the studio"
              cta={{ label: 'View all', href: '/shop' }}
            />
            <ProductGrid products={products} cols={4} loading={loading} />
          </Container>
        </Section>
        {dna && curatedProducts.length > 0 && (
          <Section className="kg-home__curated">
            <Container>
              <SectionHeader
                overline="RECOMMENDED FOR YOU"
                title="Recommended for your craft taste"
                subtitle="A small edit based on your Craft DNA."
              />
              <ProductGrid products={curatedProducts} cols={4} />
            </Container>
          </Section>
        )}
        <CraftStoryBanner />
        <Section bg="var(--c-clay-bg)">
          <Container>
            <SectionHeader
              overline="UPCOMING HAATS"
              title="The bazaar is calling"
              subtitle="Where makers gather, together."
              cta={{ label: 'See all Haats', href: '/haats' }}
            />
            <Grid cols={3}>
              {haats.map((h, i) => (
                <HaatCard key={h._id} haat={h} style={{ '--delay': i }} />
              ))}
            </Grid>
          </Container>
        </Section>
        <Section>
          <Container>
            <SectionHeader overline="FIND BY AREA" title="Your neighbourhood" />
            <NeighborhoodGrid />
          </Container>
        </Section>
      </main>
      <Footer />
      <FestivalParticles />
      <FestivalModal />
      {showQuiz && <CraftDNAQuiz onClose={() => setShowQuiz(false)} />}
    </>
  );
}

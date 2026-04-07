import './Haats.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHaats } from '../api';
import { useAuth } from '../context/AuthContext';
import SEOHead from '../components/common/SEOHead';
import AnnouncementBar from '../components/nav/AnnouncementBar';
import Navbar from '../components/nav/Navbar';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import Grid from '../components/layout/Grid';
import Button from '../components/ui/Button';
import HaatCard from '../components/haats/HaatCard';
import EmptyState from '../components/common/EmptyState';
import Footer from '../components/common/Footer';

export default function Haats() {
  const [haats, setHaats] = useState([]);
  const [tab, setTab] = useState('upcoming');
  const { isArtisan } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const { data } = await getHaats(tab === 'upcoming' ? { upcoming: true } : {});
      const now = new Date();
      let filtered = data || [];
      if (tab === 'ongoing') {
        filtered = filtered.filter(h => new Date(h.startDate) <= now && new Date(h.endDate) >= now);
      }
      if (tab === 'past') {
        filtered = filtered.filter(h => new Date(h.endDate) < now);
      }
      setHaats(filtered);
    }
    load();
  }, [tab]);

  return (
    <>
      <SEOHead title="The Haats — Karagiri" />
      <AnnouncementBar />
      <Navbar />

      <div className="kg-haats-hero">
        <Container>
          <div className="kg-haats-hero__title">The Haats</div>
          <div className="kg-haats-hero__subtitle">Artisans. Together. In one place.</div>
          {isArtisan && (
            <Button
              variant="secondary"
              onClick={() => navigate('/haats/create')}
            >
              Host a Haat →
            </Button>
          )}
        </Container>
      </div>

      <div className="kg-haats-tabs">
        <Container>
          <button
            className={`kg-haats-tab ${tab === 'upcoming' ? 'kg-haats-tab--active' : ''}`}
            onClick={() => setTab('upcoming')}
            type="button"
          >
            Upcoming
          </button>
          <button
            className={`kg-haats-tab ${tab === 'ongoing' ? 'kg-haats-tab--active' : ''}`}
            onClick={() => setTab('ongoing')}
            type="button"
          >
            Ongoing
          </button>
          <button
            className={`kg-haats-tab ${tab === 'past' ? 'kg-haats-tab--active' : ''}`}
            onClick={() => setTab('past')}
            type="button"
          >
            Past
          </button>
        </Container>
      </div>

      <Section>
        <Container>
          {haats.length === 0 ? (
            <EmptyState heading="No haats found" subtext="Try another tab." />
          ) : (
            <Grid cols={3}>
              {haats.map(h => <HaatCard key={h._id} haat={h} />)}
            </Grid>
          )}
        </Container>
      </Section>
      <Footer />
    </>
  );
}

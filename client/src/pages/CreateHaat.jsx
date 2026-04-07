import './CreateHaat.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArtisans } from '../api';
import { useAuth } from '../context/AuthContext';
import SEOHead from '../components/common/SEOHead';
import AnnouncementBar from '../components/nav/AnnouncementBar';
import Navbar from '../components/nav/Navbar';
import Section from '../components/layout/Section';
import Container from '../components/layout/Container';
import SectionHeader from '../components/common/SectionHeader';
import HaatForm from '../components/haats/HaatForm';
import Footer from '../components/common/Footer';

export default function CreateHaat() {
  const { isArtisan, user } = useAuth();
  const navigate = useNavigate();
  const [currentArtisan, setCurrentArtisan] = useState(null);

  useEffect(() => {
    if (!isArtisan) {
      navigate('/login');
      return;
    }
    async function load() {
      const { data } = await getArtisans();
      const match = (data || []).find(a => a.userId === user?._id || a.userId?._id === user?._id);
      setCurrentArtisan(match || null);
    }
    load();
  }, [isArtisan, navigate, user?._id]);

  return (
    <>
      <SEOHead title="Host a Haat — Karagiri" />
      <AnnouncementBar />
      <Navbar />
      <Section>
        <Container size="narrow">
          <SectionHeader overline="HOST AN EVENT" title="Create your Haat" />
          {currentArtisan && <HaatForm hostArtisanId={currentArtisan._id} />}
        </Container>
      </Section>
      <Footer />
    </>
  );
}

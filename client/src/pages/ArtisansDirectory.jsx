import './ArtisansDirectory.css';
import { useEffect, useState } from 'react';
import { getArtisans } from '../api';
import SEOHead from '../components/common/SEOHead';
import AnnouncementBar from '../components/nav/AnnouncementBar';
import Navbar from '../components/nav/Navbar';
import Section from '../components/layout/Section';
import Container from '../components/layout/Container';
import SectionHeader from '../components/common/SectionHeader';
import Grid from '../components/layout/Grid';
import ArtisanCard from '../components/artisan/ArtisanCard';
import Footer from '../components/common/Footer';

export default function ArtisansDirectory() {
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    async function load() {
      const { data } = await getArtisans();
      setArtisans(data || []);
    }
    load();
  }, []);

  return (
    <>
      <SEOHead title="Meet the Makers — Karagiri" />
      <AnnouncementBar />
      <Navbar />
      <Section>
        <Container>
          <SectionHeader
            overline="OUR COMMUNITY"
            title="Meet the makers"
            subtitle="Every artisan behind every piece."
          />
          <Grid cols={3}>
            {artisans.map((a, i) => (
              <div key={a._id} className="reveal" style={{ '--delay': i }}>
                <ArtisanCard {...a} />
              </div>
            ))}
          </Grid>
        </Container>
      </Section>
      <Footer />
    </>
  );
}

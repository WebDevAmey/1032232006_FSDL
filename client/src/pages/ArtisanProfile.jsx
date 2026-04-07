import './ArtisanProfile.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArtisan } from '../api';
import SEOHead from '../components/common/SEOHead';
import AnnouncementBar from '../components/nav/AnnouncementBar';
import Navbar from '../components/nav/Navbar';
import ArtisanProfileHeader from '../components/artisan/ArtisanProfileHeader';
import Section from '../components/layout/Section';
import Container from '../components/layout/Container';
import ArtisanStory from '../components/artisan/ArtisanStory';
import SectionHeader from '../components/common/SectionHeader';
import ProcessTimeline from '../components/artisan/ProcessTimeline';
import ProductGrid from '../components/shop/ProductGrid';
import Footer from '../components/common/Footer';

export default function ArtisanProfile() {
  const { slug } = useParams();
  const [artisan, setArtisan] = useState(null);

  useEffect(() => {
    async function load() {
      const { data } = await getArtisan(slug);
      setArtisan(data);
    }
    load();
  }, [slug]);

  return (
    <>
      <SEOHead title={artisan?.shopName} description={artisan?.bio} />
      <AnnouncementBar />
      <Navbar />
      <ArtisanProfileHeader artisan={artisan} productsCount={artisan?.products?.length || 0} />
      {artisan?.story && (
        <Section bg="var(--c-surface)">
          <Container>
            <ArtisanStory story={artisan.story} coverImage={artisan.coverImage} />
          </Container>
        </Section>
      )}
      {artisan?.process?.length > 0 && (
        <Section>
          <Container>
            <SectionHeader overline="THE PROCESS" title="How it's made" />
            <ProcessTimeline process={artisan.process} />
          </Container>
        </Section>
      )}
      <Section>
        <Container>
          <SectionHeader
            overline="THEIR WORK"
            title={artisan ? `Pieces by ${artisan.shopName}` : 'Their work'}
          />
          <ProductGrid products={artisan?.products || []} cols={4} />
        </Container>
      </Section>
      <Footer />
    </>
  );
}

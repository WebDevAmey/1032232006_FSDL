import './CraftDNAPage.css';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import AnnouncementBar from '../components/nav/AnnouncementBar';
import Navbar from '../components/nav/Navbar';
import Footer from '../components/common/Footer';
import CraftDNAQuiz from '../components/craftdna/CraftDNAQuiz';

export default function CraftDNAPage() {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead title="Craft DNA — Karagiri" description="Discover your craft persona in three questions." />
      <AnnouncementBar />
      <Navbar />
      <main className="kg-dna-page">
        <CraftDNAQuiz onClose={() => navigate('/')} />
      </main>
      <Footer />
    </>
  );
}

import './HaatDetail.css';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHaat, rsvpHaat } from '../api';
import { useSocket } from '../hooks/useSocket';
import SEOHead from '../components/common/SEOHead';
import AnnouncementBar from '../components/nav/AnnouncementBar';
import Navbar from '../components/nav/Navbar';
import Section from '../components/layout/Section';
import Container from '../components/layout/Container';
import CountdownTimer from '../components/haats/CountdownTimer';
import HaatParticipants from '../components/haats/HaatParticipants';
import Button from '../components/ui/Button';
import Footer from '../components/common/Footer';

const fmtLong = (date) => new Date(date).toLocaleDateString('en-IN', {
  weekday: 'short', month: 'short', day: 'numeric',
});

export default function HaatDetail() {
  const { slug } = useParams();
  const [haat, setHaat] = useState(null);
  const [rsvpDone, setRsvpDone] = useState(false);
  const socket = useSocket();

  useEffect(() => {
    async function load() {
      const { data } = await getHaat(slug);
      setHaat(data);
    }
    load();
  }, [slug]);

  useEffect(() => {
    if (!socket || !haat?._id) return;
    const onUpdate = (payload) => {
      if (payload.haatId === haat._id && payload.rsvpCount !== undefined) {
        setHaat(prev => ({ ...prev, rsvpCount: payload.rsvpCount }));
      }
    };
    socket.on('haat_update', onUpdate);
    return () => socket.off('haat_update', onUpdate);
  }, [socket, haat?._id]);

  if (!haat) return null;

  const approved = (haat.participants || []).filter(p => p.status === 'approved');

  return (
    <>
      <SEOHead title={haat.title} description={haat.description} image={haat.coverImage} />
      <AnnouncementBar />
      <Navbar />
      <img src={haat.coverImage} alt={haat.title} className="kg-haat-detail__cover" />
      <Section>
        <Container>
          <div className="kg-haat-detail">
            <div className="kg-haat-detail__main">
              <h1>{haat.title}</h1>
              <div className="kg-haat-detail__meta">
                {fmtLong(haat.startDate)} – {fmtLong(haat.endDate)} · {haat.location} · {haat.category}
              </div>
              <p className="kg-haat-detail__desc">{haat.description}</p>
              <div className="kg-haat-detail__participants">
                <HaatParticipants participants={approved} />
              </div>
            </div>
            <aside className="kg-haat-detail__aside">
              <div className="kg-haat-detail__card">
                <div className="kg-haat-detail__card-title">Event Details</div>
                <div className="kg-haat-detail__card-row">{fmtLong(haat.startDate)} – {fmtLong(haat.endDate)}</div>
                <CountdownTimer targetDate={haat.startDate} endDate={haat.endDate} />
                <div className="kg-haat-detail__card-row">{haat.location}</div>
                <div className="kg-haat-detail__rsvp">{haat.rsvpCount} people attending</div>
                <Button
                  variant="primary"
                  fullWidth
                  disabled={rsvpDone}
                  style={rsvpDone ? { background: 'var(--c-sage)' } : undefined}
                  onClick={async () => {
                    const { data } = await rsvpHaat(haat._id);
                    setHaat(prev => ({ ...prev, rsvpCount: data.rsvpCount }));
                    setRsvpDone(true);
                  }}
                >
                  {rsvpDone ? "✓ You're attending" : 'RSVP to Attend'}
                </Button>
                <div className="kg-haat-detail__divider" />
                <div className="kg-haat-detail__host">Hosted by</div>
                <div className="kg-haat-detail__host-row">
                  <img src={haat.hostArtisan?.profileImage} alt={haat.hostArtisan?.shopName} />
                  <div>
                    <div className="kg-haat-detail__host-name">{haat.hostArtisan?.shopName}</div>
                    <div className="kg-haat-detail__host-craft">{haat.hostArtisan?.craft}</div>
                    <Link to={`/makers/${haat.hostArtisan?.slug}`}>View shop →</Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
      <Footer />
    </>
  );
}

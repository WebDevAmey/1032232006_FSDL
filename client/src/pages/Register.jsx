import './Register.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api';
import { useAuth } from '../context/AuthContext';
import SEOHead from '../components/common/SEOHead';
import AnnouncementBar from '../components/nav/AnnouncementBar';
import Navbar from '../components/nav/Navbar';
import Section from '../components/layout/Section';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import Footer from '../components/common/Footer';

const CATEGORY_OPTIONS = ['Pottery', 'Textiles', 'Jewelry', 'Bakery', 'Leather', 'Candles', 'Art'];

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const [brandName, setBrandName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Pune');
  const [category, setCategory] = useState('Pottery');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [shortBio, setShortBio] = useState('');
  const [story, setStory] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [instagram, setInstagram] = useState('');
  const [website, setWebsite] = useState('');
  const [isHomeBasedBusiness, setIsHomeBasedBusiness] = useState(true);
  const [acceptsCustomOrders, setAcceptsCustomOrders] = useState(false);
  const [businessType, setBusinessType] = useState('individual');
  const [teamSize, setTeamSize] = useState('1');
  const [foundedYear, setFoundedYear] = useState('');
  const [materialsUsed, setMaterialsUsed] = useState('');
  const [processDescription, setProcessDescription] = useState('');
  const [sustainabilityNote, setSustainabilityNote] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = await registerUser({ name, email, password, role });
    login(data.token, data.user);

    if (role === 'artisan') {
      localStorage.setItem('kg_artisan_draft', JSON.stringify({
        artisanName: name,
        brandName: brandName || `${name}'s Studio`,
        email,
        phone,
        city,
        category,
        yearsOfExperience: Number(yearsOfExperience) || 0,
        shortBio,
        story,
        profileImage,
        bannerImage,
        socialLinks: { instagram, website },
        businessType,
        teamSize: Number(teamSize) || 1,
        foundedYear: Number(foundedYear) || '',
        materialsUsed,
        processDescription,
        sustainabilityNote,
        isHomeBasedBusiness,
        acceptsCustomOrders,
      }));
      navigate('/artisan/onboarding');
      return;
    }

    navigate('/');
  };

  return (
    <>
      <SEOHead title="Join Karagiri" />
      <AnnouncementBar />
      <Navbar />
      <Section>
        <Container size="narrow">
          <form className="kg-auth" onSubmit={onSubmit}>
            <h2>Join Karagiri</h2>
            <div className="card-section">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Full name</label>
                  <input id="name" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input id="password" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
              </div>
            </div>
            <div className="kg-auth__role">
              <label>
                <input type="radio" name="role" value="buyer" checked={role === 'buyer'} onChange={() => setRole('buyer')} />
                Buyer
              </label>
              <label>
                <input type="radio" name="role" value="artisan" checked={role === 'artisan'} onChange={() => setRole('artisan')} />
                Artisan
              </label>
            </div>
            {role === 'artisan' && (
              <>
                <section className="card-section">
                  <div className="kg-auth__section-head">
                    <h3>Artisan Profile</h3>
                    <p>Start shaping how your storefront will look to shoppers.</p>
                  </div>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="brandName">Brand name</label>
                      <input id="brandName" value={brandName} onChange={e => setBrandName(e.target.value)} placeholder="Mitti Studio" required={role === 'artisan'} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input id="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="9876543210" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input id="city" value={city} onChange={e => setCity(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="category">Category</label>
                      <select id="category" value={category} onChange={e => setCategory(e.target.value)}>
                        {CATEGORY_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="experience">Years of experience</label>
                      <input id="experience" type="number" min="0" value={yearsOfExperience} onChange={e => setYearsOfExperience(e.target.value)} placeholder="5" />
                    </div>
                    <div className="form-group form-group--full">
                      <label htmlFor="shortBio">Short bio</label>
                      <textarea id="shortBio" rows="3" value={shortBio} onChange={e => setShortBio(e.target.value)} placeholder="A quick intro buyers will see first." />
                    </div>
                    <div className="form-group form-group--full">
                      <label htmlFor="story">Craft story</label>
                      <textarea id="story" rows="4" value={story} onChange={e => setStory(e.target.value)} placeholder="Tell people how your craft began and what makes it special." />
                    </div>
                    <div className="form-group">
                      <label htmlFor="profileImage">Profile image URL</label>
                      <input id="profileImage" value={profileImage} onChange={e => setProfileImage(e.target.value)} placeholder="/images/artisan/artisan-sewing.jpg" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="bannerImage">Banner image URL</label>
                      <input id="bannerImage" value={bannerImage} onChange={e => setBannerImage(e.target.value)} placeholder="/images/textile/loom-weaving.jpg" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="instagram">Instagram</label>
                      <input id="instagram" value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="@yourbrand" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="website">Website</label>
                      <input id="website" value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://yourbrand.com" />
                    </div>
                  </div>
                  <div className="kg-auth__checks">
                    <label><input type="checkbox" checked={isHomeBasedBusiness} onChange={e => setIsHomeBasedBusiness(e.target.checked)} /> Home-based business</label>
                    <label><input type="checkbox" checked={acceptsCustomOrders} onChange={e => setAcceptsCustomOrders(e.target.checked)} /> Accept custom orders</label>
                  </div>
                </section>

                <section className="card-section">
                  <div className="kg-auth__section-head">
                    <h3>Your Craft Business</h3>
                    <p>Small details here make the dashboard and onboarding feel much more complete.</p>
                  </div>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="businessType">Business type</label>
                      <select id="businessType" value={businessType} onChange={e => setBusinessType(e.target.value)}>
                        <option value="individual">Individual</option>
                        <option value="family">Family</option>
                        <option value="small brand">Small brand</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="teamSize">Team size</label>
                      <input id="teamSize" type="number" min="1" value={teamSize} onChange={e => setTeamSize(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="foundedYear">Founded year</label>
                      <input id="foundedYear" type="number" min="1900" max="2100" value={foundedYear} onChange={e => setFoundedYear(e.target.value)} />
                    </div>
                    <div className="form-group form-group--full">
                      <label htmlFor="materialsUsed">Materials used</label>
                      <textarea id="materialsUsed" rows="2" value={materialsUsed} onChange={e => setMaterialsUsed(e.target.value)} placeholder="Clay, natural dyes, brass fittings..." />
                    </div>
                    <div className="form-group form-group--full">
                      <label htmlFor="processDescription">Process description</label>
                      <textarea id="processDescription" rows="3" value={processDescription} onChange={e => setProcessDescription(e.target.value)} placeholder="Explain how you make your work." />
                    </div>
                    <div className="form-group form-group--full">
                      <label htmlFor="sustainabilityNote">Sustainability note</label>
                      <textarea id="sustainabilityNote" rows="2" value={sustainabilityNote} onChange={e => setSustainabilityNote(e.target.value)} placeholder="Packaging, sourcing, or low-waste practices." />
                    </div>
                  </div>
                </section>
              </>
            )}
            <Button variant="primary" fullWidth type="submit">Create account</Button>
            <div className="kg-auth__switch">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </form>
        </Container>
      </Section>
      <Footer />
    </>
  );
}

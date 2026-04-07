import './ArtisanOnboarding.css';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  createArtisan,
  createProduct,
  getArtisanDashboard,
  getMyArtisanProfile,
  updateArtisan,
  updateProduct,
} from '../api';
import { useAuth } from '../context/AuthContext';
import SEOHead from '../components/common/SEOHead';
import AnnouncementBar from '../components/nav/AnnouncementBar';
import Navbar from '../components/nav/Navbar';
import Section from '../components/layout/Section';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import Footer from '../components/common/Footer';

const STEPS = ['profile', 'story', 'products', 'finish'];
const CATEGORY_OPTIONS = ['Pottery', 'Textiles', 'Jewelry', 'Bakery', 'Leather', 'Candles', 'Art'];

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function makeEmptyProduct() {
  return {
    title: '',
    slug: '',
    category: 'Pottery',
    price: '',
    discountPrice: '',
    description: '',
    images: '',
    stock: '1',
    tags: '',
    isFestivalEligible: true,
    isCustomizable: false,
  };
}

export default function ArtisanOnboarding() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialStep = Math.max(0, STEPS.indexOf(searchParams.get('step') || 'profile'));
  const editProductId = searchParams.get('product');
  const [stepIndex, setStepIndex] = useState(initialStep);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [artisanId, setArtisanId] = useState('');
  const [profile, setProfile] = useState({
    brandName: '',
    artisanName: '',
    email: user?.email || '',
    phone: '',
    city: 'Pune',
    category: 'Pottery',
    yearsOfExperience: '',
    shortBio: '',
    story: '',
    profileImage: '',
    bannerImage: '',
    socialLinks: { instagram: '', website: '' },
    isHomeBasedBusiness: true,
    acceptsCustomOrders: false,
    businessType: 'individual',
    teamSize: '1',
    foundedYear: '',
    materialsUsed: '',
    processDescription: '',
    sustainabilityNote: '',
  });
  const [products, setProducts] = useState([makeEmptyProduct()]);

  useEffect(() => {
    async function hydrate() {
      try {
        const draft = JSON.parse(localStorage.getItem('kg_artisan_draft') || 'null');
        if (draft) {
          setProfile(prev => ({
            ...prev,
            ...draft,
            socialLinks: {
              instagram: draft.socialLinks?.instagram || draft.instagram || '',
              website: draft.socialLinks?.website || draft.website || '',
            },
          }));
        }

        const existingArtisan = await getMyArtisanProfile().catch(() => null);
        if (existingArtisan?.data) {
          const artisan = existingArtisan.data;
          setArtisanId(artisan._id);
          setProfile(prev => ({
            ...prev,
            ...artisan,
            brandName: artisan.brandName || artisan.shopName || prev.brandName,
            artisanName: artisan.artisanName || user?.name || prev.artisanName,
            email: user?.email || prev.email,
            category: artisan.category || artisan.craft || prev.category,
            bannerImage: artisan.bannerImage || artisan.coverImage || prev.bannerImage,
            socialLinks: {
              instagram: artisan.socialLinks?.instagram || artisan.instagram || '',
              website: artisan.socialLinks?.website || artisan.website || '',
            },
          }));
        }

        const dashboard = await getArtisanDashboard().catch(() => null);
        const dashboardProducts = dashboard?.data?.products || [];
        if (dashboardProducts.length) {
          const mapped = dashboardProducts.map((product) => ({
            _id: product._id,
            title: product.name || '',
            slug: product.slug || '',
            category: product.category || 'Pottery',
            price: product.price || '',
            discountPrice: product.comparePrice || '',
            description: product.description || '',
            images: (product.images || []).join('\n'),
            stock: product.stock ?? '1',
            tags: (product.tags || []).join(', '),
            isFestivalEligible: product.isFestivalEligible !== false,
            isCustomizable: Boolean(product.isCustomizable),
          }));
          if (editProductId) {
            const selected = mapped.find((product) => product._id === editProductId);
            setProducts(selected ? [selected] : mapped);
          } else {
            setProducts(mapped);
          }
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Could not load onboarding details');
      } finally {
        setLoading(false);
      }
    }

    hydrate();
  }, [editProductId, user?.email, user?.name]);

  const updateProfile = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const updateSocial = (field, value) => {
    setProfile(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, [field]: value } }));
  };

  const updateProductField = (index, field, value) => {
    setProducts(prev => prev.map((product, productIndex) => {
      if (productIndex !== index) return product;
      const next = { ...product, [field]: value };
      if (field === 'title' && !product._id) {
        next.slug = slugify(value);
      }
      return next;
    }));
  };

  const addProductCard = () => setProducts(prev => [...prev, makeEmptyProduct()]);

  const removeProductCard = (index) => {
    setProducts(prev => prev.length === 1 ? prev : prev.filter((_, productIndex) => productIndex !== index));
  };

  const saveAll = async () => {
    setSaving(true);
    setError('');

    try {
      const artisanPayload = {
        brandName: profile.brandName,
        artisanName: profile.artisanName || user?.name || '',
        phone: profile.phone,
        city: profile.city || 'Pune',
        category: profile.category,
        yearsOfExperience: Number(profile.yearsOfExperience) || 0,
        shortBio: profile.shortBio,
        story: profile.story,
        profileImage: profile.profileImage,
        bannerImage: profile.bannerImage,
        socialLinks: profile.socialLinks,
        isHomeBasedBusiness: profile.isHomeBasedBusiness,
        acceptsCustomOrders: profile.acceptsCustomOrders,
        businessType: profile.businessType,
        teamSize: Number(profile.teamSize) || 1,
        foundedYear: Number(profile.foundedYear) || null,
        materialsUsed: profile.materialsUsed,
        processDescription: profile.processDescription,
        sustainabilityNote: profile.sustainabilityNote,
      };

      const artisanResponse = artisanId
        ? await updateArtisan(artisanId, artisanPayload)
        : await createArtisan(artisanPayload);

      const currentArtisanId = artisanResponse.data?._id || artisanId;
      if (currentArtisanId && !artisanId) {
        setArtisanId(currentArtisanId);
      }

      const validProducts = products.filter(product => product.title && product.price);
      for (const product of validProducts) {
        const payload = {
          title: product.title,
          slug: product.slug || slugify(product.title),
          category: product.category,
          price: Number(product.price) || 0,
          discountPrice: Number(product.discountPrice) || 0,
          description: product.description,
          images: product.images
            .split('\n')
            .map((value) => value.trim())
            .filter(Boolean),
          stock: Number(product.stock) || 0,
          tags: product.tags,
          isFestivalEligible: product.isFestivalEligible,
          isCustomizable: product.isCustomizable,
          artisanId: currentArtisanId,
        };

        if (product._id) {
          await updateProduct(product._id, payload);
        } else {
          await createProduct(payload);
        }
      }

      localStorage.removeItem('kg_artisan_draft');
      setStepIndex(3);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Could not save onboarding');
    } finally {
      setSaving(false);
    }
  };

  const nextStep = async () => {
    if (stepIndex < 2) {
      setStepIndex(prev => prev + 1);
      return;
    }
    await saveAll();
  };

  if (loading) {
    return (
      <>
        <AnnouncementBar />
        <Navbar />
        <Section><Container><div className="kg-artisan-onboarding__loading skeleton" /></Container></Section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEOHead title="Artisan Onboarding — Karagiri" />
      <AnnouncementBar />
      <Navbar />
      <Section>
        <Container className="kg-artisan-onboarding">
          <div className="kg-artisan-onboarding__hero">
            <div>
              <div className="kg-artisan-onboarding__overline">ARTISAN ONBOARDING</div>
              <h1>Build your craft storefront in four simple steps</h1>
            </div>
            <div className="kg-artisan-onboarding__steps">
              {STEPS.map((step, index) => (
                <div key={step} className={`kg-artisan-onboarding__step${index <= stepIndex ? ' is-active' : ''}`}>
                  <span>Step {index + 1}</span>
                  <strong>{step === 'story' ? 'Brand story' : step}</strong>
                </div>
              ))}
            </div>
          </div>

          {error && <div className="kg-artisan-onboarding__error">{error}</div>}

          {stepIndex === 0 && (
            <div className="card-section">
              <h2>Profile</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="brandName">Brand name</label>
                  <input id="brandName" value={profile.brandName} onChange={e => updateProfile('brandName', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="artisanName">Artisan name</label>
                  <input id="artisanName" value={profile.artisanName} onChange={e => updateProfile('artisanName', e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" value={profile.email || user?.email || ''} readOnly />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" value={profile.phone} onChange={e => updateProfile('phone', e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input id="city" value={profile.city} onChange={e => updateProfile('city', e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select id="category" value={profile.category} onChange={e => updateProfile('category', e.target.value)}>
                    {CATEGORY_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="years">Years of experience</label>
                  <input id="years" type="number" min="0" value={profile.yearsOfExperience} onChange={e => updateProfile('yearsOfExperience', e.target.value)} />
                </div>
                <div className="form-group form-group--full">
                  <label htmlFor="shortBio">Short bio</label>
                  <textarea id="shortBio" rows="3" value={profile.shortBio} onChange={e => updateProfile('shortBio', e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="profileImage">Profile image</label>
                  <input id="profileImage" value={profile.profileImage} onChange={e => updateProfile('profileImage', e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="bannerImage">Banner image</label>
                  <input id="bannerImage" value={profile.bannerImage} onChange={e => updateProfile('bannerImage', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {stepIndex === 1 && (
            <div className="card-section">
              <h2>Brand story</h2>
              <div className="form-grid">
                <div className="form-group form-group--full">
                  <label htmlFor="story">Story</label>
                  <textarea id="story" rows="5" value={profile.story} onChange={e => updateProfile('story', e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="instagram">Instagram</label>
                  <input id="instagram" value={profile.socialLinks.instagram} onChange={e => updateSocial('instagram', e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="website">Website</label>
                  <input id="website" value={profile.socialLinks.website} onChange={e => updateSocial('website', e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="businessType">Business type</label>
                  <select id="businessType" value={profile.businessType} onChange={e => updateProfile('businessType', e.target.value)}>
                    <option value="individual">Individual</option>
                    <option value="family">Family</option>
                    <option value="small brand">Small brand</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="teamSize">Team size</label>
                  <input id="teamSize" type="number" min="1" value={profile.teamSize} onChange={e => updateProfile('teamSize', e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="foundedYear">Founded year</label>
                  <input id="foundedYear" type="number" value={profile.foundedYear} onChange={e => updateProfile('foundedYear', e.target.value)} />
                </div>
                <div className="form-group form-group--full">
                  <label htmlFor="materialsUsed">Materials used</label>
                  <textarea id="materialsUsed" rows="2" value={profile.materialsUsed} onChange={e => updateProfile('materialsUsed', e.target.value)} />
                </div>
                <div className="form-group form-group--full">
                  <label htmlFor="processDescription">Process description</label>
                  <textarea id="processDescription" rows="3" value={profile.processDescription} onChange={e => updateProfile('processDescription', e.target.value)} />
                </div>
                <div className="form-group form-group--full">
                  <label htmlFor="sustainabilityNote">Sustainability note</label>
                  <textarea id="sustainabilityNote" rows="2" value={profile.sustainabilityNote} onChange={e => updateProfile('sustainabilityNote', e.target.value)} />
                </div>
              </div>
              <div className="kg-artisan-onboarding__checks">
                <label><input type="checkbox" checked={profile.isHomeBasedBusiness} onChange={e => updateProfile('isHomeBasedBusiness', e.target.checked)} /> Home-based business</label>
                <label><input type="checkbox" checked={profile.acceptsCustomOrders} onChange={e => updateProfile('acceptsCustomOrders', e.target.checked)} /> Accept custom orders</label>
              </div>
            </div>
          )}

          {stepIndex === 2 && (
            <div className="card-section">
              <div className="kg-artisan-onboarding__products-head">
                <div>
                  <h2>Add products</h2>
                  <p>Add your first few listings now. We will use the existing product system under the hood.</p>
                </div>
                <Button variant="secondary" onClick={addProductCard}>Add another product</Button>
              </div>
              <div className="kg-artisan-onboarding__product-stack">
                {products.map((product, index) => (
                  <div key={product._id || index} className="kg-artisan-onboarding__product-card">
                    <div className="kg-artisan-onboarding__product-bar">
                      <strong>Product {index + 1}</strong>
                      {products.length > 1 && (
                        <button type="button" onClick={() => removeProductCard(index)}>Remove</button>
                      )}
                    </div>
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor={`title-${index}`}>Title</label>
                        <input id={`title-${index}`} value={product.title} onChange={e => updateProductField(index, 'title', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label htmlFor={`slug-${index}`}>Slug</label>
                        <input id={`slug-${index}`} value={product.slug} onChange={e => updateProductField(index, 'slug', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label htmlFor={`category-${index}`}>Category</label>
                        <select id={`category-${index}`} value={product.category} onChange={e => updateProductField(index, 'category', e.target.value)}>
                          {CATEGORY_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor={`price-${index}`}>Price</label>
                        <input id={`price-${index}`} type="number" min="0" value={product.price} onChange={e => updateProductField(index, 'price', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label htmlFor={`discount-${index}`}>Discount price</label>
                        <input id={`discount-${index}`} type="number" min="0" value={product.discountPrice} onChange={e => updateProductField(index, 'discountPrice', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label htmlFor={`stock-${index}`}>Stock</label>
                        <input id={`stock-${index}`} type="number" min="0" value={product.stock} onChange={e => updateProductField(index, 'stock', e.target.value)} />
                      </div>
                      <div className="form-group form-group--full">
                        <label htmlFor={`description-${index}`}>Description</label>
                        <textarea id={`description-${index}`} rows="3" value={product.description} onChange={e => updateProductField(index, 'description', e.target.value)} />
                      </div>
                      <div className="form-group form-group--full">
                        <label htmlFor={`images-${index}`}>Images</label>
                        <textarea id={`images-${index}`} rows="3" value={product.images} onChange={e => updateProductField(index, 'images', e.target.value)} placeholder="One image URL per line" />
                      </div>
                      <div className="form-group form-group--full">
                        <label htmlFor={`tags-${index}`}>Tags</label>
                        <input id={`tags-${index}`} value={product.tags} onChange={e => updateProductField(index, 'tags', e.target.value)} placeholder="handmade, gift, festive" />
                      </div>
                    </div>
                    <div className="kg-artisan-onboarding__checks">
                      <label><input type="checkbox" checked={product.isFestivalEligible} onChange={e => updateProductField(index, 'isFestivalEligible', e.target.checked)} /> Festival eligible</label>
                      <label><input type="checkbox" checked={product.isCustomizable} onChange={e => updateProductField(index, 'isCustomizable', e.target.checked)} /> Customizable</label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {stepIndex === 3 && (
            <div className="card-section kg-artisan-onboarding__finish">
              <h2>You’re ready to launch</h2>
              <p>Your profile and product setup are saved. Next up, we can manage listings and track activity from the artisan dashboard.</p>
              <div className="kg-artisan-onboarding__finish-actions">
                <Button variant="primary" onClick={() => navigate('/artisan/dashboard')}>Go to dashboard</Button>
                <Button variant="secondary" onClick={() => navigate('/shop')}>Preview marketplace</Button>
              </div>
            </div>
          )}

          <div className="kg-artisan-onboarding__footer">
            <Button variant="secondary" onClick={() => setStepIndex(prev => Math.max(0, prev - 1))} disabled={stepIndex === 0 || saving}>
              Back
            </Button>
            {stepIndex < 3 && (
              <Button variant="primary" onClick={nextStep} disabled={saving}>
                {saving ? 'Saving...' : stepIndex === 2 ? 'Finish setup' : 'Continue'}
              </Button>
            )}
          </div>
        </Container>
      </Section>
      <Footer />
    </>
  );
}

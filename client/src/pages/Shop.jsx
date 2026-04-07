import './Shop.css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../api';
import SEOHead from '../components/common/SEOHead';
import AnnouncementBar from '../components/nav/AnnouncementBar';
import Navbar from '../components/nav/Navbar';
import Section from '../components/layout/Section';
import Container from '../components/layout/Container';
import SectionHeader from '../components/common/SectionHeader';
import FilterBar from '../components/shop/FilterBar';
import SortDropdown from '../components/shop/SortDropdown';
import ProductGrid from '../components/shop/ProductGrid';
import Footer from '../components/common/Footer';
import { clearCraftDNA, getStoredCraftDNA } from '../utils/craftDNA';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState('newest');
  const [dna, setDna] = useState(null);

  useEffect(() => {
    if (category && category !== 'All') {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  }, [category, setSearchParams]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const params = { sort };
      if (category && category !== 'All') params.category = category;
      const { data } = await getProducts(params);
      setProducts(data || []);
      setLoading(false);
    }
    load();
  }, [category, sort]);

  useEffect(() => {
    try {
      setDna(getStoredCraftDNA());
    } catch {
      setDna(null);
    }
  }, []);

  return (
    <>
      <SEOHead title="Shop — Karagiri" />
      <AnnouncementBar />
      <Navbar />
      <Section bg="var(--c-surface)" py="40px">
        <Container className="kg-shop-header">
          <SectionHeader overline="ALL PRODUCTS" title="The collection" />
        </Container>
      </Section>
      <Section>
        <Container>
          {dna && (
            <div className="kg-shop__dna-badge">
              <span>✦ Matches your craft taste</span>
              <button
                className="kg-shop__dna-reset"
                onClick={() => {
                  clearCraftDNA();
                  setDna(null);
                }}
                type="button"
              >
                Retake quiz
              </button>
            </div>
          )}
          <div className="kg-shop-controls">
            <FilterBar active={category} onChange={setCategory} />
            <SortDropdown value={sort} onChange={setSort} />
          </div>
          <ProductGrid products={products} cols={4} loading={loading} />
        </Container>
      </Section>
      <Footer />
    </>
  );
}

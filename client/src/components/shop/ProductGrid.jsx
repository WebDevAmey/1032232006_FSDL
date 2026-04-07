import './ProductGrid.css';
import Grid from '../layout/Grid';
import EmptyState from '../common/EmptyState';
import ProductCard from './ProductCard';

export default function ProductGrid({ products = [], cols = 4, loading = false, emptyMessage }) {
  if (loading) {
    return (
      <div className="kg-product-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="kg-product-grid__skeleton" key={i} style={{ '--delay': i }} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <EmptyState
        heading="Nothing here yet"
        subtext={emptyMessage || 'Try a different filter or check back soon.'}
      />
    );
  }

  return (
    <Grid cols={cols}>
      {products.map((p, i) => (
        <div key={p._id} className="reveal" style={{ '--delay': i }}>
          <ProductCard {...p} />
        </div>
      ))}
    </Grid>
  );
}

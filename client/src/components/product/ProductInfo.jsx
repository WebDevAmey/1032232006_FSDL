import './ProductInfo.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import StockBadge from '../shop/StockBadge';
import Tag from '../ui/Tag';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function ProductInfo({ product, onAddToCart }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const maxQty = product.stock > 0 ? product.stock : 1;
  const discount = product.comparePrice > product.price
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  const handleAdd = () => {
    if (product.stock === 0) return;
    if (onAddToCart) onAddToCart(qty);
    else addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="kg-product-info">
      <div className="kg-product-info__crumb">
        <Link to="/shop">Shop</Link> /{' '}
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`}>{product.category}</Link> / {product.name}
      </div>

      <div className="kg-product-info__category">{product.category}</div>
      <h1 className="kg-product-info__title">{product.name}</h1>
      <div className="kg-product-info__maker">
        by <Link to={`/makers/${product.artisanId?.slug}`}>{product.artisanId?.shopName}</Link>
      </div>

      <div className="kg-product-info__price-row">
        <div className="kg-product-info__price">₹{product.price}</div>
        {product.comparePrice > product.price && (
          <div className="kg-product-info__compare">₹{product.comparePrice}</div>
        )}
        {discount > 0 && <Badge color="rust">{discount}% off</Badge>}
      </div>

      <div className="kg-product-info__stock">
        <StockBadge stock={product.stock} productId={product._id} />
      </div>

      <div className="kg-product-info__desc">{product.description}</div>

      <div className="kg-product-info__qty">
        <button onClick={() => setQty(q => Math.max(1, q - 1))} type="button">−</button>
        <span>{qty}</span>
        <button onClick={() => setQty(q => Math.min(maxQty, q + 1))} type="button">+</button>
      </div>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        disabled={product.stock === 0}
        onClick={handleAdd}
      >
        {product.stock === 0 ? 'Sold Out' : (added ? 'Added to cart' : 'Add to Cart')}
      </Button>

      <div className="kg-product-info__tags">
        {product.tags?.map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </div>
  );
}

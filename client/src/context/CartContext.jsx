import './CartContext.css';
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('kg_cart')) || []; }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('kg_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.productId === product._id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || '',
        artisanName: product.artisanId?.shopName || '',
        slug: product.slug,
        qty,
      }];
    });
  };

  const removeItem = (productId) =>
    setItems(prev => prev.filter(i => i.productId !== productId));

  const updateQty = (productId, qty) => {
    if (qty <= 0) return removeItem(productId);
    setItems(prev => prev.map(i =>
      i.productId === productId ? { ...i, qty } : i
    ));
  };

  const clearCart = () => setItems([]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{
      items, count, total,
      addItem, removeItem, updateQty, clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

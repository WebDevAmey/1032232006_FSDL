import './StockBadge.css';
import { useEffect, useState } from 'react';
import { useSocket } from '../../hooks/useSocket';

export default function StockBadge({ stock = 0, productId }) {
  const [currentStock, setCurrentStock] = useState(stock);
  const socket = useSocket();

  useEffect(() => {
    setCurrentStock(stock);
  }, [stock]);

  useEffect(() => {
    if (!socket) return;
    const onUpdate = (payload) => {
      if (payload.productId === productId) {
        setCurrentStock(payload.stock);
      }
    };
    socket.on('stock_update', onUpdate);
    return () => {
      socket.off('stock_update', onUpdate);
    };
  }, [socket, productId]);

  let label = 'In stock';
  let tone = 'gray';
  if (currentStock === 0) {
    label = 'Sold out';
  } else if (currentStock <= 4) {
    label = `Last ${currentStock}!`;
    tone = 'rust';
  } else if (currentStock <= 10) {
    label = `Only ${currentStock} left`;
    tone = 'clay';
  }

  return (
    <div className={`kg-stock kg-stock--${tone}`}>
      <span className="kg-stock__dot" />
      <span className={`kg-stock__text ${currentStock === 0 ? 'kg-stock__text--strike' : ''}`}>
        {label}
      </span>
    </div>
  );
}

import './MakersLiveBoard.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import useSocket from '../../hooks/useSocket';
import { useFestival } from '../../context/FestivalContext';

const ARTISANS = ['Mitti Studio', 'The Thread House', "Anika's Bakehouse", 'Amber & Ore'];
const PRODUCTS = ['Blue Ash Glaze Bowl', 'Ikat Silk Cushion', 'Country Sourdough', 'Silver Stack Ring', 'Mug Set'];
const AREAS = ['Baner', 'Viman Nagar', 'Koregaon Park', 'Kothrud', 'Aundh'];

function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function makeActivity() {
  const templates = [
    () => `Someone in ${randomFrom(AREAS)} is browsing Pottery right now`,
    () => `${randomFrom(ARTISANS)} just updated their collection`,
    () => `A ${randomFrom(PRODUCTS)} was added to someone's cart`,
    () => `${Math.floor(Math.random() * 18) + 5} people have viewed this product today`,
    () => `New piece added: ${randomFrom(PRODUCTS)}`,
  ];

  return randomFrom(templates)();
}

export default function MakersLiveBoard() {
  const socket = useSocket();
  const { isFestival } = useFestival();
  const [notifications, setNotifications] = useState([]);
  const timeoutIds = useRef([]);
  const loopRef = useRef(null);

  const addNotification = useCallback((message) => {
    const id = `${Date.now()}-${Math.random()}`;
    setNotifications(prev => [...prev.slice(-1), { id, message }]);

    const timeoutId = window.setTimeout(() => {
      setNotifications(prev => prev.filter(item => item.id !== id));
    }, 4000);

    timeoutIds.current.push(timeoutId);
  }, []);

  useEffect(() => {
    const schedule = () => {
      const delay = 8000 + Math.random() * 4000;
      loopRef.current = window.setTimeout(() => {
        addNotification(makeActivity());
        schedule();
      }, delay);
    };

    schedule();

    return () => {
      if (loopRef.current) {
        window.clearTimeout(loopRef.current);
      }
      timeoutIds.current.forEach(id => window.clearTimeout(id));
      timeoutIds.current = [];
    };
  }, [addNotification]);

  useEffect(() => {
    if (!socket) {
      return undefined;
    }

    const onStock = (data) => {
      if (data?.product) {
        addNotification(`Someone just grabbed the last 3 ${data.product}`);
      }
    };

    const onHaat = (data) => {
      if (data?.title && data?.rsvpCount) {
        addNotification(`${data.rsvpCount} people are attending ${data.title}`);
      }
    };

    socket.on('stock_update', onStock);
    socket.on('haat_update', onHaat);

    return () => {
      socket.off('stock_update', onStock);
      socket.off('haat_update', onHaat);
    };
  }, [addNotification, socket]);

  if (!notifications.length) {
    return null;
  }

  return (
    <div className="kg-live-board" aria-live="polite">
      {notifications.map(item => (
        <div key={item.id} className={`kg-live-pill${isFestival ? ' kg-live-pill--festival' : ''}`}>
          <span className="kg-live-pill__dot" aria-hidden="true" />
          <span className="kg-live-pill__text">{isFestival ? `🪔 ${item.message}` : item.message}</span>
          <span className="kg-live-pill__time">just now</span>
        </div>
      ))}
    </div>
  );
}

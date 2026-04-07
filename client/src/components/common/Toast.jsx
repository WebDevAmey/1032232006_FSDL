import './Toast.css';
import { useEffect } from 'react';

export default function Toast({ message, type = 'success', visible = true, onClose }) {
  useEffect(() => {
    if (!onClose) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      onClose();
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`kg-toast kg-toast--${type} ${visible ? 'kg-toast--show' : ''}`}>
      {message}
    </div>
  );
}

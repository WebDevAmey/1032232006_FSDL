import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const FestivalContext = createContext(null);

export function FestivalProvider({ children }) {
  const [isFestival, setIsFestival] = useState(() => {
    return localStorage.getItem('kg_fest') === 'true';
  });
  const [firstVisit, setFirstVisit] = useState(false);

  useEffect(() => {
    if (isFestival) {
      document.documentElement.setAttribute('data-festival', 'true');
      if (!sessionStorage.getItem('kg_fest_shown')) {
        setFirstVisit(true);
      }
    } else {
      document.documentElement.removeAttribute('data-festival');
      setFirstVisit(false);
    }
    localStorage.setItem('kg_fest', isFestival);
  }, [isFestival]);

  useEffect(() => {
    const stored = localStorage.getItem('kg_fest') === 'true';
    if (stored) {
      document.documentElement.setAttribute('data-festival', 'true');
    }
  }, []);

  const toggle = () => setIsFestival(prev => !prev);

  const setFirstVisitDone = () => {
    sessionStorage.setItem('kg_fest_shown', '1');
    setFirstVisit(false);
  };

  const value = useMemo(() => ({
    isFestival,
    toggle,
    firstVisit,
    setFirstVisitDone,
  }), [firstVisit, isFestival]);

  return (
    <FestivalContext.Provider value={value}>
      {children}
    </FestivalContext.Provider>
  );
}

export const useFestival = () => useContext(FestivalContext);

import './FestivalParticles.css';
import { useEffect, useRef } from 'react';
import { useFestival } from '../../context/FestivalContext';

const COLORS = ['#FF6F00', '#FFD600', '#E91E8C', '#00BCD4', '#9C27B0', '#AEEA00', '#FFFFFF'];
const SHAPES = ['50%', '0%', 'polygon(50% 0%, 0% 100%, 100% 100%)'];

export default function FestivalParticles() {
  const { isFestival } = useFestival();
  const confettiRef = useRef(null);
  const fireflyRef = useRef(null);
  const diyaRef = useRef(null);

  useEffect(() => {
    const confetti = confettiRef.current;
    const fireflies = fireflyRef.current;
    const diyas = diyaRef.current;

    if (!confetti || !fireflies || !diyas) {
      return undefined;
    }

    confetti.innerHTML = '';
    fireflies.innerHTML = '';
    diyas.innerHTML = '';

    if (!isFestival) {
      return undefined;
    }

    for (let index = 0; index < 40; index += 1) {
      const piece = document.createElement('div');
      const size = 6 + Math.random() * 4;
      piece.className = 'kg-p-confetti';
      piece.style.width = `${size}px`;
      piece.style.height = `${size}px`;
      piece.style.left = `${Math.random() * 110 - 5}%`;
      piece.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
      piece.style.borderRadius = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      piece.style.setProperty('--dx', `${(Math.random() - 0.5) * 400}px`);
      piece.style.setProperty('--dy', `${110 + Math.random() * 20}vh`);
      piece.style.setProperty('--dr', `${(Math.random() - 0.5) * 1440}deg`);
      piece.style.animationDuration = `${4 + Math.random() * 4}s`;
      piece.style.animationDelay = `${Math.random() * 4}s`;
      confetti.appendChild(piece);
    }

    const fireflyIntervals = [];
    for (let index = 0; index < 20; index += 1) {
      const firefly = document.createElement('div');
      const updatePosition = () => {
        firefly.style.left = `${Math.random() * 100}%`;
        firefly.style.top = `${Math.random() * 100}%`;
        firefly.style.setProperty('--fx', `${(Math.random() - 0.5) * 300}px`);
        firefly.style.setProperty('--fy', `${(Math.random() - 0.5) * 300}px`);
      };

      firefly.className = 'kg-p-firefly';
      updatePosition();
      firefly.style.animationDuration = `${3 + Math.random() * 3}s`;
      firefly.style.animationDelay = `${Math.random() * 3}s`;
      fireflyIntervals.push(window.setInterval(updatePosition, (3 + Math.random() * 3) * 1000));
      fireflies.appendChild(firefly);
    }

    const diyaSvg = `
      <svg width="20" height="28" viewBox="0 0 20 28" xmlns="http://www.w3.org/2000/svg" fill="none">
        <ellipse cx="10" cy="24" rx="8" ry="4" fill="#B8892A"/>
        <path d="M10,20 Q6,10 10,4 Q14,10 10,20Z" fill="#FF6F00"/>
        <path d="M10,18 Q8,12 10,8 Q12,12 10,18Z" fill="#FFD600"/>
      </svg>
    `;

    for (let index = 0; index < 6; index += 1) {
      const lamp = document.createElement('div');
      lamp.className = 'kg-p-diya';
      lamp.innerHTML = diyaSvg;
      lamp.style.left = `${8 + index * 16}vw`;
      lamp.style.animationDelay = `${Math.random() * 1.2}s`;
      lamp.style.animationDuration = `${0.8 + Math.random() * 0.4}s`;
      diyas.appendChild(lamp);
    }

    return () => {
      fireflyIntervals.forEach(id => window.clearInterval(id));
      confetti.innerHTML = '';
      fireflies.innerHTML = '';
      diyas.innerHTML = '';
    };
  }, [isFestival]);

  if (!isFestival) {
    return null;
  }

  return (
    <>
      <div ref={confettiRef} className="kg-particles-layer" aria-hidden="true" />
      <div ref={fireflyRef} className="kg-particles-layer" aria-hidden="true" />
      <div ref={diyaRef} className="kg-particles-diya" aria-hidden="true" />
    </>
  );
}

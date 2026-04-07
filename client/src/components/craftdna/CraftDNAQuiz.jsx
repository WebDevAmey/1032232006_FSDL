import './CraftDNAQuiz.css';
import { useState } from 'react';
import CraftDNAResult from './CraftDNAResult';
import {
  CRAFT_DNA_PERSONAS,
  CRAFT_DNA_QUESTIONS,
  calculatePersona,
  saveCraftDNA,
} from '../../utils/craftDNA';

export default function CraftDNAQuiz({ onClose }) {
  const [phase, setPhase] = useState('intro');
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [persona, setPersona] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  const qIndex = ['q0', 'q1', 'q2'].indexOf(phase);
  const currentQ = qIndex >= 0 ? CRAFT_DNA_QUESTIONS[qIndex] : null;
  const progress = phase === 'intro' ? 0 : phase === 'result' ? 100 : ((qIndex + 1) / 3) * 100;

  const handleStart = () => {
    setPhase('q0');
    setSelected(null);
  };

  const handleSelect = (opt) => {
    if (transitioning) return;
    setSelected(opt.id);
    setTransitioning(true);
    setTimeout(() => {
      const newAnswers = { ...answers, [currentQ.id]: opt.points };
      setAnswers(newAnswers);
      setSelected(null);
      if (qIndex < 2) {
        setPhase(`q${qIndex + 1}`);
      } else {
        const result = calculatePersona(newAnswers);
        setPersona(CRAFT_DNA_PERSONAS[Object.keys(CRAFT_DNA_PERSONAS).find((key) => CRAFT_DNA_PERSONAS[key].key === result.persona)] || result.meta);
        saveCraftDNA({ persona: result.persona, categories: result.categories });
        setPhase('result');
      }
      setTransitioning(false);
    }, 300);
  };

  return (
    <div className="kg-dna-overlay" onClick={onClose}>
      <div className="kg-dna-card" onClick={e => e.stopPropagation()}>
        <button className="kg-dna-close" onClick={onClose} type="button" aria-label="Close quiz">✕</button>
        <div className="kg-dna-progress">
          <div className="kg-dna-progress__fill" style={{ width: `${progress}%` }} />
        </div>

        {phase === 'intro' && (
          <div className="kg-dna-intro">
            <div className="kg-dna-intro__icon">✦</div>
            <h2 className="kg-dna-intro__title">Discover your Craft Persona</h2>
            <p className="kg-dna-intro__sub">3 questions. Your personalised craft feed.</p>
            <button className="kg-dna-start" onClick={handleStart} type="button">
              Take the Quiz →
            </button>
          </div>
        )}

        {currentQ && (
          <div className={`kg-dna-question${transitioning ? ' kg-dna-question--out' : ''}`}>
            <p className="kg-dna-q-num">Question {qIndex + 1} of 3</p>
            <h3 className="kg-dna-q-text">{currentQ.text}</h3>
            <div className="kg-dna-options">
              {currentQ.options.map((opt, i) => (
                <button
                  key={opt.id}
                  className={`kg-dna-opt${selected === opt.id ? ' kg-dna-opt--selected' : ''}`}
                  onClick={() => handleSelect(opt)}
                  type="button"
                  style={{ '--delay': i }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === 'result' && persona && (
          <CraftDNAResult persona={persona} onClose={onClose} />
        )}
      </div>
    </div>
  );
}

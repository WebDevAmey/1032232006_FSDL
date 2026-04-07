import './EmptyState.css';
import Button from '../ui/Button';

export default function EmptyState({ icon = '∅', heading, subtext, cta }) {
  return (
    <div className="kg-empty">
      <div className="kg-empty__icon">{icon}</div>
      {heading && <div className="kg-empty__heading">{heading}</div>}
      {subtext && <div className="kg-empty__subtext">{subtext}</div>}
      {cta?.label && (
        <div className="kg-empty__cta">
          <Button variant="secondary" onClick={cta.onClick}>
            {cta.label}
          </Button>
        </div>
      )}
    </div>
  );
}

import './Badge.css';

export default function Badge({ children, color = 'rust' }) {
  return (
    <span className={`kg-badge kg-badge--${color}`}>
      {children}
    </span>
  );
}

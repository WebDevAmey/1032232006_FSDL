import './Grid.css';

export default function Grid({ children, cols = 3, className = '', style }) {
  const classes = `kg-grid ${className}`.trim();
  return (
    <div className={classes} style={{ '--cols': cols, ...style }}>
      {children}
    </div>
  );
}

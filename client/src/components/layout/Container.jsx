import './Container.css';

export default function Container({ children, size = 'default', className = '', style }) {
  const classes = `kg-container kg-container--${size} ${className}`.trim();
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}

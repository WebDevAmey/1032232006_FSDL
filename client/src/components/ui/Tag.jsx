import './Tag.css';

export default function Tag({ children, onClick, active = false }) {
  const classes = ['kg-tag', active ? 'kg-tag--active' : ''].filter(Boolean).join(' ');
  return (
    <button className={classes} onClick={onClick} type="button">
      {children}
    </button>
  );
}

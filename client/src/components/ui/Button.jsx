import './Button.css';
import useMagnet from '../../hooks/useMagnet';

function MagneticButton({ className, type, onClick, disabled, style, children }) {
  const { ref, onMouseMove, onMouseLeave } = useMagnet(0.3);

  return (
    <button
      ref={ref}
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  style,
  children,
}) {
  const classes = [
    'kg-btn',
    `kg-btn--${variant}`,
    `kg-btn--${size}`,
    fullWidth ? 'kg-btn--full' : '',
    className,
  ].filter(Boolean).join(' ');

  const content = loading ? <span className="kg-btn__spinner" /> : children;

  if (variant === 'primary') {
    return (
      <MagneticButton
        className={classes}
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        style={style}
      >
        {content}
      </MagneticButton>
    );
  }

  return (
    <button
      className={classes}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={style}
    >
      {content}
    </button>
  );
}

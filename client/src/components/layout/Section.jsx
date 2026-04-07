import './Section.css';

export default function Section({ children, bg, py, className = '', style }) {
  const classes = `kg-section ${className}`.trim();
  const nextStyle = {
    background: bg ? bg : undefined,
    paddingTop: py ? py : undefined,
    paddingBottom: py ? py : undefined,
    ...style,
  };
  return (
    <section className={classes} style={nextStyle}>
      {children}
    </section>
  );
}

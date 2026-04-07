import './SectionHeader.css';

export default function SectionHeader({
  overline,
  title,
  subtitle,
  align = 'left',
  cta,
}) {
  const classes = `kg-section-header kg-section-header--${align}`;
  return (
    <div className={classes}>
      {overline && <div className="kg-section-header__overline">{overline}</div>}
      {title && <h2 className="kg-section-header__title">{title}</h2>}
      {subtitle && <p className="kg-section-header__subtitle">{subtitle}</p>}
      {cta?.label && cta?.href && (
        <a className="kg-section-header__cta" href={cta.href}>{cta.label}</a>
      )}
    </div>
  );
}

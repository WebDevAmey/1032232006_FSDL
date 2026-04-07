import './ProcessTimeline.css';

export default function ProcessTimeline({ process = [] }) {
  return (
    <div className="kg-process">
      {process.map((p, i) => (
        <div className="kg-process__step" key={`${p.step}-${i}`}>
          <div className="kg-process__circle">{i + 1}</div>
          <div className="kg-process__title">{p.step}</div>
          <div className="kg-process__desc">{p.description}</div>
        </div>
      ))}
    </div>
  );
}

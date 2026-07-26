export default function MetricCard({
  label,
  value,
  note,
  accent = "",
}: {
  label: string;
  value: string;
  note: string;
  accent?: string;
}) {
  return (
    <div className={`metric-card ${accent}`}>
      <span className="ui-label">{label}</span>
      <strong>{value}</strong>
      <span className="metric-note">{note}</span>
    </div>
  );
}

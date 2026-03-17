export function KpiCard({ title, value }: any) {
  return (
    <div style={{ padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}
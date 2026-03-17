type Props = {
  title: string;
  value: string;
};

export function KpiCard({ title, value }: Props) {
  return (
    <div
      style={{
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
        textAlign: "center",
      }}
    >
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p style={{ fontSize: 28, fontWeight: "bold", margin: 0 }}>{value}</p>
    </div>
  );
}
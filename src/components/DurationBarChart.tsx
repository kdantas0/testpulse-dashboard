type DurationItem = {
  feature: string;
  avgDuration: number;
};

type DurationBarChartProps = {
  data: DurationItem[];
};

export function DurationBarChart({ data }: DurationBarChartProps) {
  const max = Math.max(...data.map((item) => item.avgDuration), 1);

  return (
    <div>
      <h4 style={{ marginTop: 0, marginBottom: 16 }}>Duração média por funcionalidade</h4>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {data.map((item) => (
          <div key={item.feature}>
            <div style={{ fontSize: 13, marginBottom: 6 }}>{item.feature}</div>

            <div
              style={{
                background: "#e5e7eb",
                borderRadius: 999,
                height: 14,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(item.avgDuration / max) * 100}%`,
                  background: "#3b82f6",
                  height: "100%",
                }}
              />
            </div>

            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
              {item.avgDuration > 0 ? `${item.avgDuration} ms` : "-"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
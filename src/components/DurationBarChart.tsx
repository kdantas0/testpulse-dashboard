import type { Test } from "../App";

type Props = {
  data: Test[];
};

export function DurationBarChart({ data }: Props) {
  if (!data.length) return null;

  const maxDuration = Math.max(...data.map((t) => t.duration));

  return (
    <div
      style={{
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <h3>Duração por teste</h3>

      {data.map((item, index) => (
        <div key={`${item.name}-${index}`} style={{ marginBottom: 14 }}>
          <div style={{ marginBottom: 4 }}>{item.name}</div>

          <div
            style={{
              height: 16,
              background: "#eee",
              borderRadius: 6,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(item.duration / maxDuration) * 100}%`,
                background: item.status === "failed" ? "#ef4444" : "#22c55e",
              }}
            />
          </div>

          <small>{item.duration} ms</small>
        </div>
      ))}
    </div>
  );
}
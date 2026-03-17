import type { Test } from "../App";

type Props = {
  data: Test[];
};

export function TrendChart({ data }: Props) {
  if (!data.length) return null;

  const maxDuration = Math.max(...data.map((t) => t.duration));
  const chartWidth = 520;
  const chartHeight = 260;
  const padding = 40;

  const points = data.map((test, index) => {
    const x =
      padding + (index * (chartWidth - 2 * padding)) / Math.max(data.length - 1, 1);

    const y =
      chartHeight -
      padding -
      (test.duration / maxDuration) * (chartHeight - 2 * padding);

    return { x, y, ...test };
  });

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div
      style={{
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <h3>Trend Chart</h3>

      <svg width="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
        <line
          x1={padding}
          y1={chartHeight - padding}
          x2={chartWidth - padding}
          y2={chartHeight - padding}
          stroke="#999"
        />
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={chartHeight - padding}
          stroke="#999"
        />

        <polyline
          fill="none"
          stroke="#2563eb"
          strokeWidth="3"
          points={polylinePoints}
        />

        {points.map((p, i) => (
          <g key={`${p.name}-${i}`}>
            <circle cx={p.x} cy={p.y} r="4" fill="#ef4444" />
            <text x={p.x - 18} y={chartHeight - 12} fontSize="10">
              {p.name.length > 10 ? `${p.name.slice(0, 10)}...` : p.name}
            </text>
            <text x={p.x - 12} y={p.y - 10} fontSize="10">
              {p.duration}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
type Props = {
  passed: number;
  failed: number;
};

export function PassFailDonut({ passed, failed }: Props) {
  const total = passed + failed;
  const passedPercent = total ? (passed / total) * 100 : 0;
  const failedPercent = total ? (failed / total) * 100 : 0;

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const passedLength = (passedPercent / 100) * circumference;
  const failedLength = (failedPercent / 100) * circumference;

  return (
    <div
      style={{
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
        textAlign: "center",
      }}
    >
      <h3>Pass vs Fail</h3>

      <svg width="180" height="180" viewBox="0 0 180 180">
        <g transform="translate(90,90)">
          <circle
            r={radius}
            fill="none"
            stroke="#eee"
            strokeWidth="20"
          />

          <circle
            r={radius}
            fill="none"
            stroke="#22c55e"
            strokeWidth="20"
            strokeDasharray={`${passedLength} ${circumference}`}
            transform="rotate(-90)"
          />

          <circle
            r={radius}
            fill="none"
            stroke="#ef4444"
            strokeWidth="20"
            strokeDasharray={`${failedLength} ${circumference}`}
            strokeDashoffset={-passedLength}
            transform="rotate(-90)"
          />

          <text
            x="0"
            y="5"
            textAnchor="middle"
            fontSize="18"
            fontWeight="bold"
          >
            {total}
          </text>
        </g>
      </svg>

      <p style={{ color: "green", margin: 4 }}>Passed: {passed}</p>
      <p style={{ color: "red", margin: 4 }}>Failed: {failed}</p>
    </div>
  );
}

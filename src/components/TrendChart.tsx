import type { UsReport } from "../data/dailyReport";

type TrendChartProps = {
  data: UsReport[];
};

function MiniDonut({
  passed,
  failed,
  notExecuted,
}: {
  passed: number;
  failed: number;
  notExecuted: number;
}) {
  const total = passed + failed + notExecuted;
  const passedPercent = total > 0 ? (passed / total) * 100 : 0;
  const failedPercent = total > 0 ? (failed / total) * 100 : 0;

  return (
    <div
      style={{
        width: 92,
        height: 92,
        borderRadius: "50%",
        background: `conic-gradient(
          #22c55e 0% ${passedPercent}%,
          #ef4444 ${passedPercent}% ${passedPercent + failedPercent}%,
          #d1d5db ${passedPercent + failedPercent}% 100%
        )`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 12,
          color: "#111827",
        }}
      >
        {total}
      </div>
    </div>
  );
}

export function TrendChart({ data }: TrendChartProps) {
  return (
    <div>
      <h4 style={{ marginTop: 0, marginBottom: 16 }}>Gráfico por US</h4>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {data.map((item) => {
          const passed = Number(item.passed) || 0;
          const failed = Number(item.failed) || 0;
          const notExecuted = Number(item.notExecuted) || 0;
          const bugsOpen = Number(item.bugsOpen) || 0;
          const bugsClosed = Number(item.bugsClosed) || 0;

          const total = passed + failed + notExecuted;
          const executed = passed + failed;
          const coverage =
            total > 0 ? Math.round((executed / total) * 100) : 0;

          return (
            <div
              key={item.us}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 14,
                padding: 14,
                background: "#fafafa",
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#111827",
                  marginBottom: 12,
                }}
              >
                {item.us}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <MiniDonut
                  passed={passed}
                  failed={failed}
                  notExecuted={notExecuted}
                />

                <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.8 }}>
                  <div><strong>Passed:</strong> {passed}</div>
                  <div><strong>Failed:</strong> {failed}</div>
                  <div><strong>Não executado:</strong> {notExecuted}</div>
                  <div><strong>Total:</strong> {total}</div>
                  <div><strong>Cobertura:</strong> {coverage}%</div>
                  <div><strong>Bugs:</strong> {bugsOpen} abertos / {bugsClosed} fechados</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
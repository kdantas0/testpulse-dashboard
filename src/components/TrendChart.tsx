type ReportItem = {
  us: string;
  passed: number;
  failed: number;
  notExecuted: number;
  bugsOpen: number;
  bugsClosed: number;
};

type TrendChartProps = {
  data: ReportItem[];
};

export function TrendChart({ data }: TrendChartProps) {
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Por US</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {data.map((item) => {
          const total = item.passed + item.failed + item.notExecuted;

          return (
            <div
              key={item.us}
              style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: 16,
                background: "#fff",
              }}
            >
              <strong>{item.us}</strong>

              <div>Passed: {item.passed}</div>
              <div>Failed: {item.failed}</div>
              <div>Não executado: {item.notExecuted}</div>
              <div>Total: {total}</div>

              <div>Bugs abertos: {item.bugsOpen}</div>
              <div>Bugs fechados: {item.bugsClosed}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
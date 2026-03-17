import { useMemo, useState } from "react";
import { FileUpload } from "./components/FileUpload";
import { KpiCard } from "./components/KpiCard";
import { TrendChart } from "./components/TrendChart";
import { DurationBarChart } from "./components/DurationBarChart";
import { PassFailDonut } from "./components/PassFailDonut";
import { FlakyTable } from "./components/FlakyTable";

export type Test = {
  name: string;
  status: "passed" | "failed";
  duration: number;
};

type UsSummary = {
  us: string;
  total: number;
  passed: number;
  failed: number;
  avgDuration: number;
};

function extractUsName(testName: string): string {
  const parts = testName.split(" - ");
  return parts.length >= 2 ? `${parts[0]} - ${parts[1]}` : parts[0];
}

function buildUsSummary(tests: Test[]): UsSummary[] {
  const map = new Map<string, { total: number; passed: number; failed: number; durationSum: number }>();

  tests.forEach((test) => {
    const us = extractUsName(test.name);

    if (!map.has(us)) {
      map.set(us, { total: 0, passed: 0, failed: 0, durationSum: 0 });
    }

    const item = map.get(us)!;
    item.total += 1;
    item.durationSum += test.duration;

    if (test.status === "passed") {
      item.passed += 1;
    } else {
      item.failed += 1;
    }
  });

  return Array.from(map.entries()).map(([us, values]) => ({
    us,
    total: values.total,
    passed: values.passed,
    failed: values.failed,
    avgDuration: Math.round(values.durationSum / values.total),
  }));
}

export default function App() {
  const [tests, setTests] = useState<Test[]>([]);
  const [showOnlyFailed, setShowOnlyFailed] = useState(false);

  const total = tests.length;
  const failed = tests.filter((t) => t.status === "failed").length;
  const passed = total - failed;
  const passRate = total > 0 ? Math.round((passed / total) * 100) : 0;

  const filteredTests = useMemo(() => {
    return showOnlyFailed
      ? tests.filter((t) => t.status === "failed")
      : tests;
  }, [tests, showOnlyFailed]);

  const usSummary = useMemo(() => buildUsSummary(tests), [tests]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: 32,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1500,
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ margin: 0, fontSize: 36 }}>TestPulse</h1>
          <p style={{ marginTop: 8, color: "#555" }}>
            Dashboard de resultados de testes manuais e automatizados
          </p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <FileUpload onLoad={setTests} />
        </div>

        {tests.length > 0 && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 16,
                marginBottom: 24,
              }}
            >
              <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <KpiCard title="Pass Rate" value={`${passRate}%`} />
              </div>

              <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <KpiCard title="Total de testes" value={`${total}`} />
              </div>

              <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <KpiCard title="Falhas" value={`${failed}`} />
              </div>

              <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <KpiCard title="Sucessos" value={`${passed}`} />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <button
                onClick={() => setShowOnlyFailed(!showOnlyFailed)}
                style={{
                  padding: "10px 16px",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  cursor: "pointer",
                  background: showOnlyFailed ? "#ffe9e9" : "#ffffff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                }}
              >
                {showOnlyFailed ? "Mostrar todos" : "Mostrar apenas falhas"}
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                gap: 16,
                marginBottom: 24,
                alignItems: "start",
              }}
            >
              <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <TrendChart data={tests} />
              </div>

              <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <DurationBarChart data={tests} />
              </div>

              <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <PassFailDonut passed={passed} failed={failed} />
              </div>
            </div>

            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                padding: 20,
                marginBottom: 24,
              }}
            >
              <h3 style={{ marginTop: 0 }}>Resumo por US</h3>

              <table width="100%" cellPadding={10} style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f3f4f6" }}>
                    <th align="left">US</th>
                    <th align="center">Total</th>
                    <th align="center">Passed</th>
                    <th align="center">Failed</th>
                    <th align="center">Pass Rate</th>
                    <th align="center">Tempo médio</th>
                  </tr>
                </thead>
                <tbody>
                  {usSummary.map((item, index) => {
                    const usPassRate = item.total > 0 ? Math.round((item.passed / item.total) * 100) : 0;

                    return (
                      <tr
                        key={`${item.us}-${index}`}
                        style={{
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        <td>{item.us}</td>
                        <td align="center">{item.total}</td>
                        <td align="center" style={{ color: "green", fontWeight: "bold" }}>
                          {item.passed}
                        </td>
                        <td align="center" style={{ color: "red", fontWeight: "bold" }}>
                          {item.failed}
                        </td>
                        <td align="center">{usPassRate}%</td>
                        <td align="center">{item.avgDuration} ms</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                padding: 20,
              }}
            >
              <FlakyTable tests={filteredTests} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

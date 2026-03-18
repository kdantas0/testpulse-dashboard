import { useMemo } from "react";
import { dailyReport } from "./dailyReport";

function StatusDonutChart({
  passed,
  failed,
  notExecuted,
  size = 150,
}: {
  passed: number;
  failed: number;
  notExecuted: number;
  size?: number;
}) {
  const total = passed + failed + notExecuted;
  const passedPercent = total ? (passed / total) * 100 : 0;
  const failedPercent = total ? (failed / total) * 100 : 0;

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: size,
          height: size,
          margin: "0 auto 14px",
          borderRadius: "50%",
          background: `conic-gradient(
            #22c55e 0% ${passedPercent}%,
            #ef4444 ${passedPercent}% ${passedPercent + failedPercent}%,
            #d1d5db ${passedPercent + failedPercent}% 100%
          )`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            width: size * 0.54,
            height: size * 0.54,
            borderRadius: "50%",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            fontWeight: 700,
            color: "#111827",
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
          }}
        >
          <span style={{ fontSize: size * 0.18 }}>{total}</span>
          <span style={{ fontSize: size * 0.07, color: "#6b7280" }}>
            casos
          </span>
        </div>
      </div>

      <div style={{ fontSize: 13, lineHeight: 1.8 }}>
        <div style={{ color: "#16a34a", fontWeight: 700 }}>Passed: {passed}</div>
        <div style={{ color: "#dc2626", fontWeight: 700 }}>Failed: {failed}</div>
        <div style={{ color: "#6b7280", fontWeight: 700 }}>
          Não executado: {notExecuted}
        </div>
      </div>
    </div>
  );
}

function BugsDonutChart({
  bugsOpen,
  bugsClosed,
  size = 150,
}: {
  bugsOpen: number;
  bugsClosed: number;
  size?: number;
}) {
  const total = bugsOpen + bugsClosed;
  const openPercent = total ? (bugsOpen / total) * 100 : 0;

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: size,
          height: size,
          margin: "0 auto 14px",
          borderRadius: "50%",
          background: `conic-gradient(
            #f59e0b 0% ${openPercent}%,
            #3b82f6 ${openPercent}% 100%
          )`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            width: size * 0.54,
            height: size * 0.54,
            borderRadius: "50%",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            fontWeight: 700,
            color: "#111827",
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
          }}
        >
          <span style={{ fontSize: size * 0.18 }}>{total}</span>
          <span style={{ fontSize: size * 0.07, color: "#6b7280" }}>
            bugs
          </span>
        </div>
      </div>

      <div style={{ fontSize: 13, lineHeight: 1.8 }}>
        <div style={{ color: "#d97706", fontWeight: 700 }}>
          Abertos: {bugsOpen}
        </div>
        <div style={{ color: "#2563eb", fontWeight: 700 }}>
          Fechados: {bugsClosed}
        </div>
      </div>
    </div>
  );
}

function KpiCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 20,
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}>
        {title}
      </div>
      <div
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: "#111827",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      {subtitle ? (
        <div style={{ marginTop: 8, fontSize: 13, color: "#9ca3af" }}>
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}

function ProgressBar({
  value,
  color = "#2563eb",
}: {
  value: number;
  color?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: 10,
        borderRadius: 999,
        background: "#e5e7eb",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${Math.max(0, Math.min(100, value))}%`,
          height: "100%",
          background: color,
          borderRadius: 999,
        }}
      />
    </div>
  );
}

export default function App() {
  const totals = useMemo(() => {
    const passed = dailyReport.reduce((acc, item) => acc + item.passed, 0);
    const failed = dailyReport.reduce((acc, item) => acc + item.failed, 0);
    const notExecuted = dailyReport.reduce(
      (acc, item) => acc + item.notExecuted,
      0
    );
    const bugsOpen = dailyReport.reduce((acc, item) => acc + item.bugsOpen, 0);
    const bugsClosed = dailyReport.reduce(
      (acc, item) => acc + item.bugsClosed,
      0
    );

    const total = passed + failed + notExecuted;
    const executed = passed + failed;
    const coverage = total ? Math.round((executed / total) * 100) : 0;
    const passRate = executed ? Math.round((passed / executed) * 100) : 0;
    const totalBugs = bugsOpen + bugsClosed;

    return {
      passed,
      failed,
      notExecuted,
      total,
      executed,
      coverage,
      passRate,
      bugsOpen,
      bugsClosed,
      totalBugs,
    };
  }, []);

  const worstUs = useMemo(() => {
    if (!dailyReport.length) return null;

    return [...dailyReport].sort((a, b) => {
      if (b.failed !== a.failed) return b.failed - a.failed;
      if (b.notExecuted !== a.notExecuted) return b.notExecuted - a.notExecuted;
      return b.bugsOpen - a.bugsOpen;
    })[0];
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f6fb",
        padding: 32,
        fontFamily: "Arial, sans-serif",
        color: "#111827",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            marginBottom: 24,
            background:
              "linear-gradient(135deg, #ffffff 0%, #eef4ff 100%)",
            border: "1px solid #e5e7eb",
            borderRadius: 24,
            padding: 28,
            boxShadow: "0 12px 32px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 20,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 14,
                  color: "#6b7280",
                  fontWeight: 700,
                  letterSpacing: 0.3,
                  marginBottom: 8,
                }}
              >
                DASHBOARD EXECUTIVO DE QA
              </div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 44,
                  lineHeight: 1.05,
                }}
              >
                📊 TestPulse
              </h1>
              <p
                style={{
                  margin: "10px 0 0 0",
                  color: "#4b5563",
                  fontSize: 16,
                }}
              >
                Visão consolidada da execução de testes e bugs por US
              </p>
            </div>

            <div
              style={{
                minWidth: 280,
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: 18,
                padding: 18,
                boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 6 }}>
                US mais crítica
              </div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>
                {worstUs?.us ?? "-"}
              </div>
              <div style={{ marginTop: 8, fontSize: 14, color: "#4b5563" }}>
                Failed: <strong>{worstUs?.failed ?? 0}</strong> | Não executado:{" "}
                <strong>{worstUs?.notExecuted ?? 0}</strong> | Bugs abertos:{" "}
                <strong>{worstUs?.bugsOpen ?? 0}</strong>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <KpiCard title="Total de casos" value={totals.total} subtitle="Escopo consolidado" />
          <KpiCard title="Executados" value={totals.executed} subtitle="Passed + Failed" />
          <KpiCard title="Passed" value={totals.passed} subtitle="Execuções com sucesso" />
          <KpiCard title="Failed" value={totals.failed} subtitle="Execuções com falha" />
          <KpiCard title="Não executados" value={totals.notExecuted} subtitle="Pendentes" />
          <KpiCard title="Cobertura" value={`${totals.coverage}%`} subtitle="Execução sobre total" />
          <KpiCard title="Bugs abertos" value={totals.bugsOpen} subtitle="Pendências atuais" />
          <KpiCard title="Bugs fechados" value={totals.bugsClosed} subtitle="Resolvidos no dia" />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 360px 360px",
            gap: 20,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              border: "1px solid #e5e7eb",
              padding: 24,
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
                flexWrap: "wrap",
              }}
            >
              <div>
                <h2 style={{ margin: 0, fontSize: 26 }}>Resumo geral</h2>
                <p style={{ margin: "6px 0 0 0", color: "#6b7280" }}>
                  Indicadores consolidados do ciclo atual
                </p>
              </div>

              <div
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e5e7eb",
                  borderRadius: 14,
                  padding: "10px 14px",
                  fontSize: 14,
                  color: "#4b5563",
                }}
              >
                Pass Rate: <strong>{totals.passRate}%</strong>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 14,
                  marginBottom: 8,
                }}
              >
                <span style={{ color: "#4b5563" }}>Cobertura de execução</span>
                <strong>{totals.coverage}%</strong>
              </div>
              <ProgressBar value={totals.coverage} />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
                marginTop: 20,
              }}
            >
              <div
                style={{
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: 14,
                  padding: 16,
                }}
              >
                <div style={{ color: "#15803d", fontSize: 13 }}>Passed</div>
                <div style={{ fontSize: 30, fontWeight: 800, color: "#166534" }}>
                  {totals.passed}
                </div>
              </div>

              <div
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: 14,
                  padding: 16,
                }}
              >
                <div style={{ color: "#b91c1c", fontSize: 13 }}>Failed</div>
                <div style={{ fontSize: 30, fontWeight: 800, color: "#991b1b" }}>
                  {totals.failed}
                </div>
              </div>

              <div
                style={{
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: 14,
                  padding: 16,
                }}
              >
                <div style={{ color: "#6b7280", fontSize: 13 }}>
                  Não executado
                </div>
                <div style={{ fontSize: 30, fontWeight: 800, color: "#374151" }}>
                  {totals.notExecuted}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              border: "1px solid #e5e7eb",
              padding: 24,
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: 18, textAlign: "center" }}>
              Gráfico geral
            </h2>

            <StatusDonutChart
              passed={totals.passed}
              failed={totals.failed}
              notExecuted={totals.notExecuted}
              size={220}
            />
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              border: "1px solid #e5e7eb",
              padding: 24,
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: 18, textAlign: "center" }}>
              Gráfico de bugs
            </h2>

            <BugsDonutChart
              bugsOpen={totals.bugsOpen}
              bugsClosed={totals.bugsClosed}
              size={220}
            />
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 28 }}>Por US</h2>
          <p style={{ margin: "6px 0 0 0", color: "#6b7280" }}>
            Acompanhamento visual, execução e bugs por história
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
            gap: 18,
          }}
        >
          {dailyReport.map((item, index) => {
            const total = item.passed + item.failed + item.notExecuted;
            const executed = item.passed + item.failed;
            const coverage = total ? Math.round((executed / total) * 100) : 0;
            const hasIssue =
              item.failed > 0 || item.notExecuted > 0 || item.bugsOpen > 0;

            return (
              <div
                key={index}
                style={{
                  border: hasIssue ? "1px solid #fed7aa" : "1px solid #e5e7eb",
                  padding: 22,
                  borderRadius: 18,
                  background: hasIssue ? "#fffaf5" : "#ffffff",
                  display: "grid",
                  gridTemplateColumns: "160px 1fr 160px",
                  gap: 18,
                  alignItems: "center",
                  boxShadow: "0 10px 28px rgba(0,0,0,0.05)",
                }}
              >
                <div>
                  <StatusDonutChart
                    passed={item.passed}
                    failed={item.failed}
                    notExecuted={item.notExecuted}
                    size={110}
                  />
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 10,
                      alignItems: "center",
                      flexWrap: "wrap",
                      marginBottom: 12,
                    }}
                  >
                    <h3 style={{ margin: 0, color: "#374151", fontSize: 24 }}>
                      {item.us}
                    </h3>

                    <span
                      style={{
                        background: hasIssue ? "#fff7ed" : "#ecfdf5",
                        color: hasIssue ? "#c2410c" : "#15803d",
                        border: `1px solid ${hasIssue ? "#fdba74" : "#86efac"}`,
                        borderRadius: 999,
                        padding: "6px 10px",
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {hasIssue ? "Atenção" : "Saudável"}
                    </span>
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 13,
                        marginBottom: 6,
                        color: "#4b5563",
                      }}
                    >
                      <span>Cobertura da US</span>
                      <strong>{coverage}%</strong>
                    </div>
                    <ProgressBar
                      value={coverage}
                      color={hasIssue ? "#f59e0b" : "#2563eb"}
                    />
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: 10,
                      fontSize: 16,
                    }}
                  >
                    <div style={{ color: "#16a34a" }}>Passed: {item.passed}</div>
                    <div style={{ color: "#dc2626" }}>Failed: {item.failed}</div>
                    <div style={{ color: "#6b7280" }}>
                      Não executado: {item.notExecuted}
                    </div>
                    <div>
                      <strong>Total:</strong> {total}
                    </div>
                    <div style={{ color: "#d97706" }}>
                      Bugs abertos: {item.bugsOpen}
                    </div>
                    <div style={{ color: "#2563eb" }}>
                      Bugs fechados: {item.bugsClosed}
                    </div>
                  </div>
                </div>

                <div>
                  <BugsDonutChart
                    bugsOpen={item.bugsOpen}
                    bugsClosed={item.bugsClosed}
                    size={110}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
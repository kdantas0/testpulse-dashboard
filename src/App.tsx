import { useMemo } from "react";
import { dailyReport } from "./dailyReport";

type ReportItem = {
  us: string;
  passed: number;
  failed: number;
  notExecuted: number;
  bugsOpen: number;
  bugsClosed: number;
};

function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

function getTotal(item: ReportItem) {
  return item.passed + item.failed + item.notExecuted;
}

function getCoverage(item: ReportItem) {
  const total = getTotal(item);
  if (total === 0) return 0;
  return ((item.passed + item.failed) / total) * 100;
}

function getStatusLabel(item: ReportItem) {
  if (item.failed > 0) return "Atenção";
  if (item.notExecuted > 0) return "Parcial";
  return "Saudável";
}

function getStatusColors(status: string) {
  switch (status) {
    case "Atenção":
      return {
        bg: "cornsilk",
        border: "sandybrown",
        text: "chocolate",
      };
    case "Parcial":
      return {
        bg: "aliceblue",
        border: "lightskyblue",
        text: "royalblue",
      };
    default:
      return {
        bg: "honeydew",
        border: "lightgreen",
        text: "seagreen",
      };
  }
}

function DonutChart({
  passed,
  failed,
  notExecuted,
  size = 170,
  strokeWidth = 24,
}: {
  passed: number;
  failed: number;
  notExecuted: number;
  size?: number;
  strokeWidth?: number;
}) {
  const total = passed + failed + notExecuted;
  const safeTotal = total || 1;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const passedLength = (passed / safeTotal) * circumference;
  const failedLength = (failed / safeTotal) * circumference;
  const notExecutedLength = (notExecuted / safeTotal) * circumference;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`rotate(-90 ${center} ${center})`}>
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="gainsboro"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="limegreen"
            strokeWidth={strokeWidth}
            strokeDasharray={`${passedLength} ${circumference - passedLength}`}
            strokeDashoffset={0}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="tomato"
            strokeWidth={strokeWidth}
            strokeDasharray={`${failedLength} ${circumference - failedLength}`}
            strokeDashoffset={-passedLength}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="lightgray"
            strokeWidth={strokeWidth}
            strokeDasharray={`${notExecutedLength} ${circumference - notExecutedLength}`}
            strokeDashoffset={-(passedLength + failedLength)}
          />
        </g>

        <text
          x="50%"
          y="48%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize: 28, fontWeight: 800, fill: "midnightblue" }}
        >
          {total}
        </text>
        <text
          x="50%"
          y="61%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize: 12, fill: "slategray", fontWeight: 600 }}
        >
          casos
        </text>
      </svg>

      <div style={{ textAlign: "center", fontSize: 12, lineHeight: 1.7 }}>
        <div style={{ color: "green", fontWeight: 700 }}>Passed: {passed}</div>
        <div style={{ color: "red", fontWeight: 700 }}>Failed: {failed}</div>
        <div style={{ color: "gray", fontWeight: 700 }}>
          Não executado: {notExecuted}
        </div>
      </div>
    </div>
  );
}

function MiniDonut({
  passed,
  failed,
  notExecuted,
  size = 74,
  strokeWidth = 12,
}: {
  passed: number;
  failed: number;
  notExecuted: number;
  size?: number;
  strokeWidth?: number;
}) {
  const total = passed + failed + notExecuted;
  const safeTotal = total || 1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const passedLength = (passed / safeTotal) * circumference;
  const failedLength = (failed / safeTotal) * circumference;
  const notExecutedLength = (notExecuted / safeTotal) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`rotate(-90 ${center} ${center})`}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="gainsboro"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="limegreen"
          strokeWidth={strokeWidth}
          strokeDasharray={`${passedLength} ${circumference - passedLength}`}
          strokeDashoffset={0}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="tomato"
          strokeWidth={strokeWidth}
          strokeDasharray={`${failedLength} ${circumference - failedLength}`}
          strokeDashoffset={-passedLength}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="lightgray"
          strokeWidth={strokeWidth}
          strokeDasharray={`${notExecutedLength} ${circumference - notExecutedLength}`}
          strokeDashoffset={-(passedLength + failedLength)}
        />
      </g>

      <text
        x="50%"
        y="48%"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: 18, fontWeight: 800, fill: "midnightblue" }}
      >
        {total}
      </text>
      <text
        x="50%"
        y="63%"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: 8, fill: "slategray", fontWeight: 700 }}
      >
        CASOS
      </text>
    </svg>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: 8,
        background: "gainsboro",
        borderRadius: 999,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${Math.max(0, Math.min(100, value))}%`,
          height: "100%",
          background: "royalblue",
          borderRadius: 999,
        }}
      />
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
  subtitle: string;
}) {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid gainsboro",
        borderRadius: 16,
        padding: "18px 16px",
        minHeight: 88,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ fontSize: 12, color: "slategray", marginBottom: 8 }}>
        {title}
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 800,
          color: "midnightblue",
          marginBottom: 6,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 11, color: "darkgray" }}>{subtitle}</div>
    </div>
  );
}

export default function App() {
  const report = useMemo<ReportItem[]>(() => dailyReport as ReportItem[], []);

  const summary = useMemo(() => {
    const totalCases = report.reduce((acc, item) => acc + getTotal(item), 0);
    const passed = report.reduce((acc, item) => acc + item.passed, 0);
    const failed = report.reduce((acc, item) => acc + item.failed, 0);
    const notExecuted = report.reduce((acc, item) => acc + item.notExecuted, 0);
    const bugsOpen = report.reduce((acc, item) => acc + item.bugsOpen, 0);
    const bugsClosed = report.reduce((acc, item) => acc + item.bugsClosed, 0);
    const executed = passed + failed;
    const coverage = totalCases === 0 ? 0 : (executed / totalCases) * 100;
    const passRate = executed === 0 ? 0 : (passed / executed) * 100;

    const mostCritical = [...report].sort((a, b) => {
      if (b.failed !== a.failed) return b.failed - a.failed;
      if (b.notExecuted !== a.notExecuted) return b.notExecuted - a.notExecuted;
      return getTotal(b) - getTotal(a);
    })[0];

    return {
      totalCases,
      executed,
      passed,
      failed,
      notExecuted,
      bugsOpen,
      bugsClosed,
      coverage,
      passRate,
      mostCritical,
    };
  }, [report]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "rgb(243,246,251)",
        padding: "28px 16px 40px",
        fontFamily:
          'Inter, Arial, Helvetica, sans-serif',
        color: "midnightblue",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: 16,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              background: "aliceblue",
              border: "1px solid lightblue",
              borderRadius: 20,
              padding: "24px 28px",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div style={{ fontSize: 42 }}>📊</div>
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: "slategray",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontWeight: 700,
                }}
              >
                Dashboard Executivo de QA
              </div>
              <div style={{ fontSize: 30, fontWeight: 900, marginTop: 4 }}>
                TestPulse
              </div>
              <div style={{ fontSize: 14, color: "slategray", marginTop: 4 }}>
                Visão consolidada da execução de testes por US
              </div>
            </div>
          </div>

          <div
            style={{
              background: "white",
              border: "1px solid gainsboro",
              borderRadius: 20,
              padding: "22px 24px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: "slategray",
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              US mais crítica
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 900,
                textAlign: "center",
              }}
            >
              {summary.mostCritical?.us ?? "-"}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "slategray",
                marginTop: 8,
                textAlign: "center",
              }}
            >
              Failed: {summary.mostCritical?.failed ?? 0} | Não executado:{" "}
              {summary.mostCritical?.notExecuted ?? 0}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <KpiCard
            title="Total de casos"
            value={summary.totalCases}
            subtitle="Escopo consolidado"
          />
          <KpiCard
            title="Executados"
            value={summary.executed}
            subtitle="Passed + Failed"
          />
          <KpiCard
            title="Passed"
            value={summary.passed}
            subtitle="Execuções com sucesso"
          />
          <KpiCard
            title="Failed"
            value={summary.failed}
            subtitle="Execuções com falha"
          />
          <KpiCard
            title="Não executados"
            value={summary.notExecuted}
            subtitle="Pendentes"
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            marginBottom: 20,
            maxWidth: 720,
          }}
        >
          <KpiCard
            title="Cobertura"
            value={formatPercent(summary.coverage)}
            subtitle="Execução sobre total"
          />
          <KpiCard
            title="Bugs abertos"
            value={summary.bugsOpen}
            subtitle="Pendências de bug"
          />
          <KpiCard
            title="Bugs fechados"
            value={summary.bugsClosed}
            subtitle="Resolvidos no ciclo"
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr 0.9fr",
            gap: 14,
            marginBottom: 26,
          }}
        >
          <div
            style={{
              background: "white",
              border: "1px solid gainsboro",
              borderRadius: 18,
              padding: 20,
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: 15, fontWeight: 900 }}>Resumo geral</div>
                <div style={{ fontSize: 12, color: "slategray", marginTop: 6 }}>
                  Indicadores consolidados do ciclo atual
                </div>
              </div>

              <div
                style={{
                  padding: "8px 10px",
                  borderRadius: 12,
                  border: "1px solid gainsboro",
                  fontSize: 12,
                  color: "dimgray",
                  background: "whitesmoke",
                  fontWeight: 700,
                }}
              >
                Pass Rate: {formatPercent(summary.passRate)}
              </div>
            </div>

            <div style={{ marginTop: 22 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  color: "dimgray",
                  marginBottom: 8,
                }}
              >
                <span>Cobertura de execução</span>
                <span style={{ fontWeight: 800 }}>
                  {formatPercent(summary.coverage)}
                </span>
              </div>
              <ProgressBar value={summary.coverage} />
            </div>

            <div
              style={{
                marginTop: 22,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 12,
              }}
            >
              <div
                style={{
                  background: "honeydew",
                  border: "1px solid lightgreen",
                  borderRadius: 12,
                  padding: 12,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 11, color: "seagreen", marginBottom: 6 }}>
                  Passed
                </div>
                <div style={{ fontSize: 24, color: "green", fontWeight: 900 }}>
                  {summary.passed}
                </div>
              </div>

              <div
                style={{
                  background: "mistyrose",
                  border: "1px solid lightcoral",
                  borderRadius: 12,
                  padding: 12,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 11, color: "firebrick", marginBottom: 6 }}>
                  Failed
                </div>
                <div style={{ fontSize: 24, color: "red", fontWeight: 900 }}>
                  {summary.failed}
                </div>
              </div>

              <div
                style={{
                  background: "whitesmoke",
                  border: "1px solid gainsboro",
                  borderRadius: 12,
                  padding: 12,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 11, color: "slategray", marginBottom: 6 }}>
                  Não executado
                </div>
                <div style={{ fontSize: 24, color: "gray", fontWeight: 900 }}>
                  {summary.notExecuted}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "white",
              border: "1px solid gainsboro",
              borderRadius: 18,
              padding: 20,
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 900,
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              Gráfico geral
            </div>
            <DonutChart
              passed={summary.passed}
              failed={summary.failed}
              notExecuted={summary.notExecuted}
            />
          </div>

          <div
            style={{
              background: "white",
              border: "1px solid gainsboro",
              borderRadius: 18,
              padding: 20,
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 900,
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              Gráfico de bugs
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <DonutChart
                passed={summary.bugsClosed}
                failed={summary.bugsOpen}
                notExecuted={0}
              />
            </div>

            <div
              style={{
                textAlign: "center",
                fontSize: 12,
                marginTop: 2,
                lineHeight: 1.7,
              }}
            >
              <div style={{ color: "royalblue", fontWeight: 700 }}>
                Abertos: {summary.bugsOpen}
              </div>
              <div style={{ color: "darkorange", fontWeight: 700 }}>
                Fechados: {summary.bugsClosed}
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 28, fontWeight: 900 }}>Por US</div>
          <div style={{ fontSize: 14, color: "slategray", marginTop: 6 }}>
            Acompanhamento visual, execução e bugs por história
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 18,
          }}
        >
          {report.map((item) => {
            const total = getTotal(item);
            const coverage = getCoverage(item);
            const status = getStatusLabel(item);
            const statusColors = getStatusColors(status);

            return (
              <div
                key={item.us}
                style={{
                  background: "seashell",
                  border: "1px solid burlywood",
                  borderRadius: 18,
                  padding: 18,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "88px 1fr 88px",
                    gap: 14,
                    alignItems: "start",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <MiniDonut
                      passed={item.passed}
                      failed={item.failed}
                      notExecuted={item.notExecuted}
                    />
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: 23,
                        fontWeight: 900,
                        marginBottom: 10,
                        lineHeight: 1.2,
                      }}
                    >
                      {item.us}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 12,
                        color: "slategray",
                        marginBottom: 8,
                      }}
                    >
                      <span>Cobertura da US</span>
                      <span style={{ fontWeight: 800 }}>
                        {formatPercent(coverage)}
                      </span>
                    </div>

                    <ProgressBar value={coverage} />

                    <div
                      style={{
                        marginTop: 14,
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: 10,
                        fontSize: 14,
                      }}
                    >
                      <div>
                        <div style={{ color: "green", fontWeight: 800 }}>
                          Passed: {item.passed}
                        </div>
                        <div style={{ color: "gray", marginTop: 6 }}>
                          Não executado: {item.notExecuted}
                        </div>
                      </div>
                      <div>
                        <div style={{ color: "red", fontWeight: 800 }}>
                          Failed: {item.failed}
                        </div>
                        <div
                          style={{
                            color: "midnightblue",
                            marginTop: 6,
                            fontWeight: 700,
                          }}
                        >
                          Total: {total}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        marginTop: 14,
                        display: "flex",
                        gap: 18,
                        fontSize: 13,
                        flexWrap: "wrap",
                      }}
                    >
                      <div style={{ color: "chocolate", fontWeight: 700 }}>
                        Bug aberto: {item.bugsOpen}
                      </div>
                      <div style={{ color: "royalblue", fontWeight: 700 }}>
                        Fechado: {item.bugsClosed}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div
                      style={{
                        background: statusColors.bg,
                        border: `1px solid ${statusColors.border}`,
                        color: statusColors.text,
                        borderRadius: 999,
                        padding: "8px 12px",
                        fontSize: 12,
                        fontWeight: 800,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {status}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
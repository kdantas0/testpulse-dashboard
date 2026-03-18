type PassFailDonutProps = {
  passed: number;
  failed: number;
  notExecuted: number;
};

export function PassFailDonut({
  passed,
  failed,
  notExecuted,
}: PassFailDonutProps) {
  const total = passed + failed + notExecuted;

  const passedPercent = total ? (passed / total) * 100 : 0;
  const failedPercent = total ? (failed / total) * 100 : 0;

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: 220,
          height: 220,
          margin: "0 auto 16px",
          borderRadius: "50%",
          background: `conic-gradient(
            #22c55e 0% ${passedPercent}%,
            #ef4444 ${passedPercent}% ${passedPercent + failedPercent}%,
            #d1d5db ${passedPercent + failedPercent}% 100%
          )`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 115,
            height: 115,
            borderRadius: "50%",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            fontWeight: 700,
          }}
        >
          <span style={{ fontSize: 28 }}>{total}</span>
          <span style={{ fontSize: 12, color: "#6b7280" }}>casos</span>
        </div>
      </div>

      <div style={{ fontSize: 14, lineHeight: 1.9 }}>
        <div style={{ color: "#22c55e", fontWeight: 700 }}>
          Passed: {passed}
        </div>
        <div style={{ color: "#ef4444", fontWeight: 700 }}>
          Failed: {failed}
        </div>
        <div style={{ color: "#6b7280", fontWeight: 700 }}>
          Não executado: {notExecuted}
        </div>
      </div>
    </div>
  );
}
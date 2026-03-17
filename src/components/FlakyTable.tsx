import type { TestResult } from "../App";

type Props = {
  tests: TestResult[];
};

export function FlakyTable({ tests }: Props) {
  return (
    <div
      style={{
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
        marginTop: 20,
      }}
    >
      <h3>Resultados dos testes</h3>

      <table width="100%" cellPadding={8}>
        <thead>
          <tr>
            <th align="left">Teste</th>
            <th align="left">Status</th>
            <th align="left">Duração</th>
          </tr>
        </thead>

        <tbody>
          {tests.map((t, i) => (
            <tr
              key={`${t.name}-${i}`}
              style={{
                backgroundColor: t.status === "failed" ? "#fff1f1" : "#f3fff3",
              }}
            >
              <td>{t.name}</td>
              <td
                style={{
                  color: t.status === "failed" ? "red" : "green",
                  fontWeight: "bold",
                }}
              >
                {t.status}
              </td>
              <td>{t.duration} ms</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
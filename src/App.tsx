import { KpiCard } from "./components/KpiCard";
import { TrendChart } from "./components/TrendChart";
import { FlakyTable } from "./components/FlakyTable";
import { FileUpload } from "./components/FileUpload";

export default function App() {
  return (
    <div style={{ padding: 40 }}>
      <h1>TestPulse</h1>

      <div style={{ marginBottom: 20 }}>
        <KpiCard title="Pass Rate" value="85%" />
      </div>

      <div style={{ marginBottom: 20 }}>
        <TrendChart />
      </div>

      <div style={{ marginBottom: 20 }}>
        <FlakyTable />
      </div>

      <div style={{ marginBottom: 20 }}>
        <FileUpload />
      </div>
    </div>
  );
}
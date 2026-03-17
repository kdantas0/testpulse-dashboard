type Test = {
  id: number;
  name: string;
  status: "passed" | "failed";
  duration: number;
};

export function generateMockTests(qtd = 50): Test[] {
  const tests: Test[] = [];

  for (let i = 0; i < qtd; i++) {
    tests.push({
      id: i,
      name: `Test ${i}`,
      status: Math.random() > 0.2 ? "passed" : "failed",
      duration: Math.floor(Math.random() * 5000),
    });
  }

  return tests;
}

export function generateTrendData(days = 30) {
  return Array.from({ length: days }).map((_, i) => ({
    day: i,
    passRate: Math.random(),
    duration: Math.random() * 5000,
    failed: Math.floor(Math.random() * 10),
  }));
}

export function computeSummary(tests: Test[]) {
  const total = tests.length;
  const passed = tests.filter(t => t.status === "passed").length;
  const failed = total - passed;

  return {
    total,
    passed,
    failed,
    passRate: total ? passed / total : 0,
  };
}
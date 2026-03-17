import type { Test } from "../App";

type Props = {
  onLoad: (data: Test[]) => void;
};

export function FileUpload({ onLoad }: Props) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const data = JSON.parse(text);
        onLoad(data);
      } catch {
        alert("Arquivo JSON inválido.");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div
      style={{
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <h3>Upload de resultados</h3>
      <input type="file" accept=".json" onChange={handleFile} />
    </div>
  );
}
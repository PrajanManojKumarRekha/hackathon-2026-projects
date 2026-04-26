interface SymptomInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function SymptomInput({
  value,
  onChange,
  onSubmit,
  loading,
}: SymptomInputProps) {
  return (
    <div className="space-y-3">
      <textarea
        className="w-full rounded-xl border bg-white p-3"
        placeholder="Describe your symptoms..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className="rounded bg-green-600 px-4 py-2 text-white" onClick={onSubmit}>
        {loading ? "Finding Specialty..." : "Suggest Specialty"}
      </button>
    </div>
  );
}

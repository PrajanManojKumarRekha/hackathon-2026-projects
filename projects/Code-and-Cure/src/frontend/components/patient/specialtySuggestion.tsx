interface SpecialtySuggestionProps {
  specialty: string | null;
  onFindDoctors: () => void;
}

export default function SpecialtySuggestion({
  specialty,
  onFindDoctors,
}: SpecialtySuggestionProps) {
  if (!specialty) return null;

  return (
    <div className="rounded-xl border bg-white p-4">
      <p className="text-sm text-gray-600">Suggested specialty</p>
      <p className="text-lg font-semibold">{specialty}</p>
      <button onClick={onFindDoctors} className="mt-3 rounded bg-blue-600 px-4 py-2 text-white">
        Find Doctors
      </button>
    </div>
  );
}

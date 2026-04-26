export default function SpecialtyFilter({
  value,
  specialties,
  onChange,
}: {
  value: string;
  specialties: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="mb-4">
      <label className="mb-1 block text-sm font-medium text-gray-700">Filter by specialty</label>
      <select className="w-full rounded-lg border bg-white p-2" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">All specialties</option>
        {specialties.map((specialty) => (
          <option key={specialty} value={specialty}>
            {specialty}
          </option>
        ))}
      </select>
    </div>
  );
}

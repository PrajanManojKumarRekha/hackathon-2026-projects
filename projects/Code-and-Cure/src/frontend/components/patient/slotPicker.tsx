export default function SlotPicker({
  slots,
  onSelect,
  selectedSlot,
}: {
  slots: string[];
  onSelect: (slot: string) => void;
  selectedSlot?: string | null;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {slots.map((slot) => (
        <button
          key={slot}
          onClick={() => onSelect(slot)}
          className={`rounded border px-3 py-1 ${
            selectedSlot === slot ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-300"
          }`}
        >
          {slot}
        </button>
      ))}
    </div>
  );
}

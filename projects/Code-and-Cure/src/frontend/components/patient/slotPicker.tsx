export default function SlotPicker({ slots, onSelect }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {slots.map((slot) => (
        <button
          key={slot}
          onClick={() => onSelect(slot)}
          className="border px-3 py-1 rounded"
        >
          {slot}
        </button>
      ))}
    </div>
  );
}
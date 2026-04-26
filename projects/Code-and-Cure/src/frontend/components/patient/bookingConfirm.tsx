export default function BookingConfirm({
  selectedSlot,
  onConfirm,
}: {
  selectedSlot: string | null;
  onConfirm: () => void;
}) {
  if (!selectedSlot) return null;
  return (
    <div className="mt-4 rounded-xl border bg-white p-4">
      <p className="text-sm text-gray-600">Selected slot</p>
      <p className="text-lg font-semibold">{selectedSlot}</p>
      <button className="mt-3 rounded bg-blue-600 px-4 py-2 text-white" onClick={onConfirm}>
        Confirm Booking
      </button>
    </div>
  );
}

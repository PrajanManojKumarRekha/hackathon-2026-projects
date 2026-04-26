import { IntakePayload } from "@/lib/mock_api";

export default function IntakeViewer({
  intake,
}: {
  intake: (IntakePayload & { appointmentId: string }) | null;
}) {
  if (!intake) return null;
  return (
    <div className="space-y-3 rounded-xl border bg-white p-4">
      <p>
        <span className="font-semibold">Symptoms:</span> {intake.symptoms}
      </p>
      <p>
        <span className="font-semibold">Allergies:</span> {intake.allergies}
      </p>
      <p>
        <span className="font-semibold">Medications:</span> {intake.medications}
      </p>
      <p>
        <span className="font-semibold">Medical History:</span> {intake.medicalHistory}
      </p>
    </div>
  );
}

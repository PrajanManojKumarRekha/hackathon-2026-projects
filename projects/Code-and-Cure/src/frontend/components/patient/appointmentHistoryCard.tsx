import { Appointment } from "@/lib/mock_api";
import Card from "../shared/card";

export default function AppointmentHistoryCard({ appt }: { appt: Appointment }) {
  return (
    <Card>
      <p className="font-medium">{appt.doctorName}</p>
      <p className="text-sm text-gray-600">{appt.time}</p>
      <p className="mt-1 text-xs uppercase tracking-wide text-gray-500">{appt.status}</p>
    </Card>
  );
}

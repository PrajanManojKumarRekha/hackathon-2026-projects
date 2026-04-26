import { Appointment } from "@/lib/mock_api";
import Card from "../shared/card";

export default function AppointmentQueueCard({ appt }: { appt: Appointment }) {
  return (
    <Card>
      <div className="flex justify-between">
        <div>
          <p className="font-medium">{appt.patientName}</p>
          <p className="text-sm text-gray-500">{appt.time}</p>
        </div>
        <span className="text-sm">{appt.status}</span>
      </div>
    </Card>
  );
}

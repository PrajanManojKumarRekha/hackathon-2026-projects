import Link from "next/link";
import { Appointment } from "@/lib/mock_api";
import Card from "../shared/card";

export default function PatientHistoryCard({ appt }: { appt: Appointment }) {
  return (
    <Card>
      <p className="font-medium">{appt.patientName}</p>
      <p className="text-sm text-gray-600">{appt.time}</p>
      <Link className="mt-2 inline-block text-sm text-blue-600" href={`/doctor/soap-review/${appt.id}`}>
        View SOAP Note
      </Link>
    </Card>
  );
}

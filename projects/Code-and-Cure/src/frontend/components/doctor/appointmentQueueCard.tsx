import Card from "../shared/Card";

export default function AppointmentQueueCard({ appt }) {
  return (
    <Card>
      <div className="flex justify-between">
        <div>
          <p className="font-medium">{appt.patientName}</p>
          <p className="text-sm text-gray-500">{appt.time}</p>
        </div>

        <span className="text-sm">
          {appt.status}
        </span>
      </div>
    </Card>
  );
}
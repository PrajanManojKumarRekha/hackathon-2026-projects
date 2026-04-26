import Link from "next/link";
import { Doctor } from "@/lib/mock_api";
import Card from "../shared/card";

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Card>
      <h2 className="font-semibold">{doctor.name}</h2>
      <p>{doctor.specialty}</p>
      <p className="text-sm">
        ⭐ {doctor.rating} ({doctor.reviewCount}) - {doctor.reviewSource}
      </p>
      <Link className="mt-3 inline-block rounded-lg bg-blue-600 px-3 py-2 text-sm text-white" href={`/patient/booking/${doctor.id}`}>
        Book Appointment
      </Link>
    </Card>
  );
}
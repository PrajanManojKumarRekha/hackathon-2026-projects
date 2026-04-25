import Card from "../shared/Card";

export default function DoctorCard({ doctor }) {
  return (
    <Card>
      <h2 className="font-semibold">{doctor.name}</h2>
      <p>{doctor.specialty}</p>

      <p className="text-sm">
        ⭐ {doctor.rating} ({doctor.reviewCount}) — {doctor.reviewSource}
      </p>
    </Card>
  );
}
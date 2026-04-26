import { Role } from "@/lib/mock_api";

export default function RoleBadge({ role }: { role: Role }) {
  const roleStyles =
    role === "patient" ? "bg-emerald-100 text-emerald-800" : "bg-indigo-100 text-indigo-800";
  return <span className={`rounded-full px-2 py-1 text-xs font-semibold ${roleStyles}`}>{role}</span>;
}

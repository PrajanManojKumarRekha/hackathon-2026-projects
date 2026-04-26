import LoginForm from "@/components/patient/loginForm";

export default function DoctorLoginForm({
  onLogin,
}: {
  onLogin: (credentials: { email: string; password: string }) => Promise<void>;
}) {
  return <LoginForm role="doctor" title="Doctor Login" onLogin={onLogin} />;
}

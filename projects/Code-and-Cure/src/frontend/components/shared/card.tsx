export default function Card({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "elevated";
}) {
  const variantClass =
    variant === "elevated" ? "border-slate-200 shadow-md" : "border-gray-200 shadow-sm";
  return <div className={`rounded-2xl border bg-white p-4 ${variantClass}`}>{children}</div>;
}
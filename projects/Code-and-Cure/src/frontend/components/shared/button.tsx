export default function Button({
  children,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}) {
  const variantClass =
    variant === "secondary"
      ? "border border-blue-600 bg-white text-blue-700"
      : "bg-blue-600 text-white";

  return (
    <button className={`rounded-xl px-4 py-2 ${variantClass}`} onClick={onClick}>
      {children}
    </button>
  );
}
export default function Card({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="border rounded-2xl p-4 shadow-sm">
      {children}
    </div>
  );
}
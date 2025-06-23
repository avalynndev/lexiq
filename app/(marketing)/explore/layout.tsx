export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="overflow-hidden overflow-x-hidden">{children}</div>;
}

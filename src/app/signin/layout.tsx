export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <div>{children}</div>
    </section>
  );
}

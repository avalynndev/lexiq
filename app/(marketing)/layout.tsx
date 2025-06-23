import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 md:overflow-visible">
        {children}
      </main>
      <Footer />
    </div>
  );
}

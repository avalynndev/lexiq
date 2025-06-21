import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 overflow-hidden md:overflow-visible">
        {children}
      </main>
      <Footer />
    </div>
  );
}

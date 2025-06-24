import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/config/site";
import { source } from "@/lib/source";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageTree = source.pageTree;
  return (
    <div>
      <Navbar
        tree={pageTree}
        items={siteConfig.navItems}
        className="flex lg:hidden"
      />
      <main className="container mx-auto px-4 overflow-x-hidden md:overflow-visible">
        {children}
      </main>
      <Footer />
    </div>
  );
}

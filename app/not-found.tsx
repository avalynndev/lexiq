import Link from "next/link";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/config/site";
import { source } from "@/lib/source";

export default function NotFound() {
  const pageTree = source.pageTree;

  return (
    <div>
      <Navbar
        tree={pageTree}
        items={siteConfig.navItems}
        className="flex lg:hidden"
      />
      <main className="container mx-auto px-4 md:overflow-visible">
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
          <p className="mb-6 text-center max-w-md">
            Sorry, the page you are looking for does not exist or has been
            moved.
          </p>
          <Link href="/">
            <span className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-md shadow hover:bg-primary/90 transition">
              Go Home
            </span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

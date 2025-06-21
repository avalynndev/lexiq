"use client";
import { Menu, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import LexiqLogo from "@/components/logo";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 -mb-4">
      <nav className="bg-background fixed top-0 z-50 h-12">
        <div className="max-w-container-lg mx-auto flex h-full items-center justify-between px-4 md:gap-2">
          {/* Left Side - Logo */}
          <div className="flex items-center">
            <Link
              className="flex items-center gap-2.5 text-base font-bold"
              href="/"
            >
              <LexiqLogo className="h-7 w-7" />
              <h2 className="text-lg font-bold">Lexiq</h2>
            </Link>
          </div>

        </div>
      </nav>
    </header>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import LexiqLogo from "@/components/logo";
import {
  Menu,
  Plus,
  Search,
  Grid3X3,
  Clock,
  Users,
  Star,
  Settings,
  User,
  ChevronRight,
  ChevronDown,
  FileText,
  Bookmark,
  TrendingUp,
  BarChart3,
  Bell,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    title: "New Prompt",
    icon: Plus,
    href: "/dashboard/new",
    variant: "primary" as const,
  },
  {
    title: "Search",
    icon: Search,
    href: "/dashboard/search",
  },
  {
    title: "My Prompts",
    icon: Grid3X3,
    href: "/dashboard/prompts",
  },
  {
    title: "Recents",
    icon: Clock,
    href: "/dashboard/recents",
  },
  {
    title: "Starred",
    icon: Star,
    href: "/dashboard/starred",
  },
  {
    title: "Collections",
    icon: Bookmark,
    href: "/dashboard/collections",
  },
];

const favoriteItems = [
  {
    title: "Writing Assistant",
    href: "/dashboard/prompts/writing-assistant",
  },
  {
    title: "Code Review",
    href: "/dashboard/prompts/code-review",
  },
  {
    title: "Data Analysis",
    href: "/dashboard/prompts/data-analysis",
  },
];

const recentItems = [
  {
    title: "SEO Content Generator",
    href: "/dashboard/prompts/seo-content",
  },
  {
    title: "Product Description",
    href: "/dashboard/prompts/product-desc",
  },
  {
    title: "Email Template",
    href: "/dashboard/prompts/email-template",
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const [favoritesExpanded, setFavoritesExpanded] = useState(true);
  const [recentsExpanded, setRecentsExpanded] = useState(false);

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-full bg-background border-r border-border transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
      onMouseEnter={() => !isCollapsed && onToggle()}
      onMouseLeave={() => isCollapsed && onToggle()}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <LexiqLogo className="h-6 w-6" />
              <span className="font-semibold">Lexiq</span>
              <span className="text-xs bg-muted px-2 py-1 rounded-full">Free</span>
            </div>
          )}
          {isCollapsed && (
            <div className="flex justify-center w-full">
              <LexiqLogo className="h-6 w-6" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  item.variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>

          {!isCollapsed && (
            <>
              {/* Favorite Prompts */}
              <div className="mt-6 px-2">
                <button
                  onClick={() => setFavoritesExpanded(!favoritesExpanded)}
                  className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Favorite Prompts</span>
                  {favoritesExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                {favoritesExpanded && (
                  <div className="space-y-1 mt-2">
                    {favoriteItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 rounded-lg px-6 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        <FileText className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Prompts */}
              <div className="mt-4 px-2">
                <button
                  onClick={() => setRecentsExpanded(!recentsExpanded)}
                  className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Recents</span>
                  {recentsExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                {recentsExpanded && (
                  <div className="space-y-1 mt-2">
                    {recentItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 rounded-lg px-6 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        <Clock className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!isCollapsed && (
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">avalynndev</p>
                <p className="text-xs text-muted-foreground truncate">Free Plan</p>
              </div>
            </div>
            <div className="space-y-1">
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
              <Link
                href="/dashboard/help"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <HelpCircle className="h-4 w-4" />
                <span>Help</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <Sidebar isCollapsed={false} onToggle={() => {}} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "md:ml-16" : "md:ml-64"
        )}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
            </Sheet>

            {/* Desktop Sidebar Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>

            {/* Breadcrumb/Title */}
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <ThemeToggle />
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">User menu</span>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
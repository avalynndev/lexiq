import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/dashboard-nav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex-none min-w-screen">
        <Navbar />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <div className="flex-none">
            <AppSidebar className="h-[calc(100vh-3.5rem)]" />
          </div>

          <div className="flex-1 overflow-hidden">
            <main className="relative m-2 mt-0 flex-1 grow h-full">
              <SidebarInset className="bg-[#F8F8FF] dark:bg-[#0f0f10]">
                {children}
              </SidebarInset>
            </main>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
}

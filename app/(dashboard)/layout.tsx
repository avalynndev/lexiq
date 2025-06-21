import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/dashboard-nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";

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
            <AppSidebar className="h-[850px]" />
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <main className="h-full p-2">
              <SidebarInset className="pt-10">
                <header className="flex h-(--header-height) bg-sidebar shrink-0 rounded-t-xl border-t border-x items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
                  <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                    <SidebarTrigger className="-ml-1" />
                  </div>
                </header>
                <ScrollArea className="h-[850px]  rounded-b-xl border-b border-x">
                  <div className="flex flex-1 flex-col bg-sidebar">
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex flex-col gap-4  md:gap-6 md:py-6">
                        <div className="px-4 lg:px-6">{children}</div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </SidebarInset>
            </main>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
}

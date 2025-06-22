import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  UpdateAvatarCard,
  UpdateNameCard,
  UpdateUsernameCard,
  ChangeEmailCard,
  ChangePasswordCard,
  SessionsCard,
  DeleteAccountCard,
} from "@daveyplate/better-auth-ui";

export default function CustomSettingsPage() {
  return (
    <>
      <header className="flex h-(--header-height) bg-sidebar shrink-0 rounded-t-xl border-t border-x items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full pt-4 p-5">
          <div className="flex flex-col flex-1 border-alpha-200 border-t sm:border-t-0">
            <div className="flex items-center gap-3 pl-4 pr-3 sm:pl-3 sm:pr-2 h-12 border-b border-alpha-200 sm:mx-0 shrink-0">
              <SidebarTrigger className="-ml-1" />
              <h1 className="hidden truncate text-base font-medium sm:inline sm:tracking-tight">
                Settings
              </h1>
            </div>
          </div>
        </div>
      </header>
      <ScrollArea className="h-[calc(100vh-6.5rem)] px-4 py-2 rounded-b-xl border-b border-x">
        <div className="flex flex-col gap-6 max-w-xl mx-auto py-12 px-4">
          <div className="@container/page-layout relative flex size-full min-h-0 flex-col space-y-2">
            <UpdateAvatarCard />
            <UpdateNameCard />
            <UpdateUsernameCard />
            <ChangeEmailCard />
            <ChangePasswordCard />
            <SessionsCard />
            <DeleteAccountCard />
          </div>
        </div>
      </ScrollArea>
    </>
  );
}

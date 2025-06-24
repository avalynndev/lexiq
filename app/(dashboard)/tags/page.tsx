import { getAllTags, getPromptsByTags } from "@/lib/queries";
import TagsClient from "@/app/(dashboard)/tags/tags-client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const metadata = {
  title: "Tags",
  description: "Explore prompts by tags.",
};

export default async function TagsPage({
  params,
  searchParams,
}: {
  params: { [key: string]: string | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const selectedTags = Array.isArray(searchParams.tags)
    ? searchParams.tags
    : searchParams.tags
      ? [searchParams.tags]
      : [];

  const allTags = await getAllTags();
  const prompts = await getPromptsByTags(selectedTags);

  return (
    <>
      <header className="flex h-(--header-height) bg-sidebar shrink-0 rounded-t-xl border-t border-x items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full pt-5 p-5">
          <div className="flex flex-col flex-1 border-alpha-200 border-t sm:border-t-0">
            <div className="flex items-center gap-3 pl-4 pr-3 sm:pl-3 sm:pr-2 h-12 border-b border-alpha-200 sm:mx-0 shrink-0">
              <SidebarTrigger className="-ml-1" />
              <h1 className="hidden truncate text-base font-medium sm:inline sm:tracking-tight">
                <span className="text-primary hover:underline cursor-pointer">
                  {"Explore by Tags"}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </header>
      <ScrollArea className="h-[calc(100vh-6.5rem)] px-4 py-2 rounded-b-xl border-b border-x">
        <TagsClient
          allTags={allTags}
          selectedTags={selectedTags}
          initialPrompts={prompts}
        />{" "}
      </ScrollArea>
    </>
  );
}

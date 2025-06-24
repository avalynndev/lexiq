"use client";
import { User } from "lucide-react";
import LexiqLogo from "@/components/logo";
import Link from "next/link";
import { UserButton } from "@daveyplate/better-auth-ui";
import { ThemeToggle } from "./theme-toggle";
import { useSession } from "@/lib/auth-client";
import FeedbackBadge from "./feedback";

export default function Navbar() {
  const { data: session } = useSession();
  const additionalLinks = session?.user?.username
    ? [
        {
          href: `/user/${session.user.username}`,
          label: "My Profile",
          icon: <User className="w-4 h-4" />,
        },
      ]
    : [];
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 px-3 py-2 sm:h-11 sm:px-2">
      <div className="flex min-w-0 flex-1 items-center">
        <div className="mr-1 flex">
          <Link
            className="flex items-center gap-1.5 px-1 text-sm size-8 w-auto rounded-md py-1.5 border-0"
            href="/"
          >
            <LexiqLogo className="size-7" />
            <span className="sr-only">Lexiq</span>
          </Link>
        </div>

        <span className="text-alpha-400 w-4 min-w-4 select-none text-center text-lg block">
          /
        </span>

        <div className="flex min-w-0 flex-1 items-center truncate text-start text-sm font-medium leading-[20px] pl-4">
          <div className="max-w-64 truncate pr-2">Lexiq</div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
        <FeedbackBadge />
        <ThemeToggle />

        <div className="flex items-center gap-2">
          <UserButton size="icon" additionalLinks={additionalLinks} />
        </div>
      </div>
    </header>
  );
}

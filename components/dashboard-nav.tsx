"use client";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import LexiqLogo from "@/components/logo";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "./ui/badge";

export default function Navbar() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 px-3 py-2 sm:h-11 sm:px-2">
      <div className="flex min-w-0 flex-1 items-center">
        {/* Sidebar Trigger */}
      

        {/* Divider */}
        <span className="text-alpha-400 w-4 min-w-4 select-none text-center text-lg mr-1 sm:hidden">
          /
        </span>

        {/* Desktop Logo */}
        <div className="mr-1 hidden sm:flex">
          <Link
            className="flex items-center gap-1.5 px-3 text-sm size-8 w-auto rounded-md py-1.5 px-1 border-0"
            href="/"
          >
            <LexiqLogo className="size-7" />
            <span className="sr-only">Lexiq</span>
          </Link>
        </div>

        {/* Mobile Logo */}
        <Link
          className="flex items-center gap-1.5 h-10 px-4 text-sm rounded-lg border-none hover:bg-transparent focus:bg-transparent focus-visible:bg-transparent p-0 size-8 w-7 sm:hidden ml-1"
          href="/"
        >
          <LexiqLogo className="size-8 w-7" />
          <span className="sr-only">Lexiq</span>
        </Link>

        {/* Divider */}
        <span className="text-alpha-400 w-4 min-w-4 select-none text-center text-lg hidden sm:block">
          /
        </span>

        {/* Scope Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 min-h-8 gap-0 rounded-md !pl-1.5 !pr-0 max-w-fit shrink grow basis-32 min-w-32 hidden sm:flex hover:bg-gray-150 focus-visible:bg-gray-150 data-[state=open]:bg-gray-150 active:bg-gray-150"
              aria-label="Scope Switcher"
            >
              <Avatar className="size-5 mr-1.5">
                <AvatarImage
                  src="https://vercel.com/api/www/avatar/Cv61GNQBnIyPeX5ME4SCG3s8"
                  alt="Avatar"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 items-center truncate text-start text-sm font-medium leading-[20px]">
                <div className="max-w-64 truncate pr-2">Personal</div>
                <Badge variant="secondary">Free</Badge>
              </div>
              <ChevronDown className="mx-1 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>Personal</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
        {/* Feedback Button */}
        <Button
          variant="outline"
          size="sm"
          className="rounded-md hidden h-7 sm:flex"
        >
          Feedback
        </Button>

        {/* User Menu */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full hover:bg-alpha-400 focus:bg-alpha-400 size-fit border-0 p-0.5"
                data-testid="user-menu-toggle"
              >
                <Avatar className="size-6">
                  <AvatarImage
                    src="https://vercel.com/api/www/avatar/Cv61GNQBnIyPeX5ME4SCG3s8"
                    alt="Avatar"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

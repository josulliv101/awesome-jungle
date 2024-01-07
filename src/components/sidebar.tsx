"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";

export type Playlist = (typeof playlistsData)[number];

export const playlistsData = ["People", "Places", "Other Stuff"];
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists?: Playlist[];
}

export function Sidebar({
  className,
  playlists = playlistsData,
}: SidebarProps) {
  const pathName = usePathname();
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Explore Cities
          </h2>
          <div className="space-y-1">
            {[
              { label: "All", path: "/" },
              { label: "Boston", path: "/explore2/boston" },
              { label: "New York City", path: "/explore2/new-york-city" },
              { label: "Chicago", path: "/explore2/chicago" },
            ].map(({ label, path }) => (
              <Button
                key={label}
                variant={pathName === path ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href={path} scroll={true}>
                  {label}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Explore Sports
          </h2>
          <div className="space-y-1">
            <div className="space-y-1">
              {[
                { label: "All", path: "/explore2/sports" },
                { label: "NBA", path: "/explore2/nba" },
                { label: "NFL", path: "/explore2/nfl" },
                { label: "Golf", path: "/explore2/golf" },
              ].map(({ label, path }) => (
                <Button
                  key={label}
                  variant={pathName === path ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={path} scroll={true}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <rect width="7" height="7" x="3" y="3" rx="1" />
                      <rect width="7" height="7" x="14" y="3" rx="1" />
                      <rect width="7" height="7" x="14" y="14" rx="1" />
                      <rect width="7" height="7" x="3" y="14" rx="1" />
                    </svg>
                    {label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">
            Explore Colleges & Universities
          </h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1 p-2">
              {playlists?.map((playlist, i) => (
                <Button
                  key={`${playlist}-${i}`}
                  variant="ghost"
                  className="w-full justify-start font-normal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M21 15V6" />
                    <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                    <path d="M12 12H3" />
                    <path d="M16 6H3" />
                    <path d="M12 18H3" />
                  </svg>
                  {playlist}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

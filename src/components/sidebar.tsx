"use client";

import { useParams, usePathname } from "next/navigation";
import { ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";
import { Fragment } from "react";

export type Playlist = (typeof playlistsData)[number];

export const playlistsData = ["People", "Places", "Other Stuff"];
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists?: Playlist[];
}

const subNav = [
  { id: "person", label: "People" },
  { id: "restaraunt", label: "Restaraunts" },
  { id: "night-life", label: "Night Life" },
  { id: "movie", label: "Movies" },
];

export function Sidebar({
  className,
  playlists = playlistsData,
}: SidebarProps) {
  const pathName = usePathname();
  const params = useParams();
  console.log("params", params);
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 pt-2 pb-0">
          <div className="space-y-1">
            {[{ label: "Home", path: "/" }].map(({ label, path }) => (
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
            Explore
          </h2>
          <div className="space-y-1">
            {[
              { label: "All", path: "/", id: "all" },
              { label: "Boston", path: "/explore2/boston", id: "boston" },
              {
                label: "New York City",
                path: "/explore2/new-york-city",
                id: "new-york-city",
              },
              {
                label: "Chicago",
                path: "/explore2/chicago",
                id: "chicago",
              },
            ].map(({ label, id, path }) => (
              <Fragment key={id}>
                {" "}
                <Button
                  key={label}
                  variant={pathName === path ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={path}>{label}</Link>
                </Button>
                {params.hub === id && (
                  <>
                    {subNav.map((item) => (
                      <Button
                        key={item.id}
                        variant={
                          pathName === `${path}/${item.id}`
                            ? "secondary"
                            : "ghost"
                        }
                        className="w-full justify-start"
                        asChild
                      >
                        <Link href={`/explore2/${params.hub}/${item.id}`}>
                          <ChevronRight className="relative mr-2 left-[0px] h-[.85rem] w-[.85rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                          {item.label}
                        </Link>
                      </Button>
                    ))}
                  </>
                )}
              </Fragment>
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

import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { buttonVariants } from "@/components/ui/button";
import { ThemeModeToggle } from "./theme-mode-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="container flex h-14 max-w-screen-3xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.twitter className="h-3 w-3 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ThemeModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

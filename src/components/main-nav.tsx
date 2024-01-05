"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Salsa } from "next/font/google";

const salsa = Salsa({
  subsets: ["latin"],
  weight: "400",
});

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      {/* <div className="w-[100px] h-[80px] bg-leaf bg-cover absolute" /> */}
      <Link href="/" className={` mr-6 flex items-center space-x-3`}>
        <div
          className={`${salsa.className} text-md aspect-square bg-orange-500 text-white w-[36px] h-[36px] flex items-center justify-center rounded-sm`}
        >
          <span className="relative left-px">WA</span>
        </div>
        <span className={`text-sm hidden font-normal sm:inline-block`}>
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link
          href="/docs"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/docs" ? "text-foreground" : "text-foreground/60"
          )}
        >
          About
        </Link>
        <Link
          href="/docs"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/docs" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Suggest Something Awesome
        </Link>
        <Link
          href="/docs/components"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/docs/components")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Developer API
        </Link>
        <Link
          href="/themes"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/themes")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Store
        </Link>
      </nav>
    </div>
  );
}

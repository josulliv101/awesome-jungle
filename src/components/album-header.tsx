"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AlbumHeader({ label }: { label: string }) {
  const path = usePathname();

  return (
    <h2 className="flex items-center justify-start f-full text-2xl font-semibold tracking-tight">
      {label}
      <Link
        className="ml-4 text-sm text-muted-foreground font-normal"
        href={`${path}/person`}
      >
        ( View all )
      </Link>
    </h2>
  );
}

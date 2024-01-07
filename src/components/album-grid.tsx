"use client";

import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AlbumArtwork, type Album } from "@/components/album-artwork";
import { Separator } from "./ui/separator";

export function AlbumGrid({ items = [] }: { items: Array<Album> }) {
  return (
    <>
      <div className="relative">
        <div className="grid gap-2 sm:grid-cols-3">
          {items.map((album) => (
            <AlbumArtwork
              key={album.name}
              album={album}
              className="flex flex-row-reverse items-end"
              aspectRatio="square"
              width={146}
              height={146}
            />
          ))}
        </div>
      </div>
    </>
  );
}

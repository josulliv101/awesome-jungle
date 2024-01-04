"use client";

import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AlbumArtwork, type Album } from "@/components/album-artwork";
import { Separator } from "./ui/separator";

export function Albums({ items = [] }: { items: Array<Album> }) {
  return (
    <>
      <Separator className="my-4" />
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {items.map((album) => (
              <AlbumArtwork
                key={album.name}
                album={album}
                className="w-[160px]"
                aspectRatio="square"
                width={160}
                height={160}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
}

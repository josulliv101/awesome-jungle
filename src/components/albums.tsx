"use client";

import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AlbumArtwork, type Album } from "@/components/album-artwork";
import { Separator } from "./ui/separator";

export function Albums({ items = [] }: { items: Array<Album> }) {
  return (
    <>
      <Separator className="mt-4 mb-0" />
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-8 pb-4">
            {items.map((album) => (
              <AlbumArtwork
                key={album.name}
                album={album}
                className="w-[320px] object-cover"
                aspectRatio="portrait"
                width={320}
                height={250}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
}

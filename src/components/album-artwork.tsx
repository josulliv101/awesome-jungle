import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { PreviewCard } from "./preview-card";

export interface Album {
  name: string;
  oinks: number | string;
  pic: string;
  id: string;
  description: string;
}

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: Album;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function AlbumArtwork({
  album,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: AlbumArtworkProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      {" "}
      <div className="overflow-hidden rounded-md">
        <Image
          src={album.pic}
          alt={album.name}
          width={width}
          height={height}
          className={cn(
            "h-[200px] w-[200px] object-cover transition-all hover:scale-115",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none flex justify-between">
          <span>
            <PreviewCard
              id={album.id}
              pic={album.pic}
              description={album.description}
            />
          </span>
          <span>{album.oinks}</span>
        </h3>
      </div>
    </div>
  );
}

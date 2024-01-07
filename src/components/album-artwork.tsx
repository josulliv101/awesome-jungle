import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Sparkle as Star } from "lucide-react";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { PreviewCard } from "./preview-card";
import { Badge } from "./ui/badge";

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
  const minWidth = `min-w-[${width}px]`;
  return (
    <div className={cn("space-y-0", className)} {...props}>
      <div className="relative space-y-0 text-md pb-3">
        <h3 className="text-lg font-medium leading-none mb-6">
          <PreviewCard
            description={album.description}
            id={album.id}
            pic={album.pic}
          />
        </h3>
        <div className="relative text-md text-muted-foreground bg-muted px-3 pt-2 pb-2 h-[146px] overflow-hidden">
          <div className="flex items-center justify-between font-medium mb-2">
            <div className="">
              <em>whyaweso.me?</em>
            </div>
            <Badge className="absolute top-2 right-4 bg-orange-500">
              <Star className="relative left-[-3px] text-white h-[.85rem] w-[.85rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              {album.oinks}
            </Badge>
          </div>
          {/* <span className="relative inline-block top-[3px] -left-px mr-px">
            <Star className="text-muted-foreground opacity-50 h-[.95rem] w-[.95rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          </span> */}

          {album.description.substring(0, 138)}
        </div>
      </div>
      <div
        className={`flex-grow-1 flex-shrink-0 relative overflow-hidden rounded-md ${minWidth}`}
      >
        <Image
          src={album.pic}
          alt={album.name}
          width={width}
          height={height}
          className={cn(
            "border-gray-200 border rounded-sm object-cover transition-all ease-in-out duration-500 hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>
    </div>
  );
}

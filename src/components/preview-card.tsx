import { CalendarDays } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function PreviewCard({
  id,
  pic,
  description,
}: {
  id: string;
  pic: string;
  description: string;
}) {
  return (
    <HoverCard closeDelay={300} openDelay={400}>
      <HoverCardTrigger asChild>
        <Button variant="link">@{id}</Button>
      </HoverCardTrigger>
      <HoverCardContent side="top" className="w-[420px]">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={pic} sizes="lg" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@{id}</h4>
            <p className="text-sm">{description.substring(0, 144)}...</p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AlbumGrid } from "@/components/album-grid";
import { db } from "@/firebase";
import { tagsConfig, TagsConfig } from "@/config/tags";
import { NavSubTags } from "@/components/nav-sub-tags";

interface PageProps {
  params: { hub: string; tags: Array<keyof TagsConfig> };
  searchParams: { [key: string]: string | string[] | undefined };
  children: React.ReactNode;
}

export default function ByTagLayout({ children, params }: PageProps) {
  const { hub: id, tags } = params;
  const tag = tags[0];
  return (
    <div className="h-[500px]">
      <NavSubTags activeTag={tag} />
      {children}
    </div>
  );
}

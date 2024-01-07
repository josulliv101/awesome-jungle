import { firestore } from "firebase-admin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AlbumGrid } from "@/components/album-grid";
import { db } from "@/firebase";
import { tagsConfig } from "@/config/tags";

interface PageProps {
  params: { hub: string; tags: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ByTag({ params }: PageProps) {
  const { hub: id, tags } = params;
  console.log("ByTag page", id, tags);

  let query = db.collection("entity").where(`tagMap.${id}`, "==", true);

  tags.forEach((tag) => {
    query = query.where(`tagMap.${tag}`, "==", true);
  });

  // query.orderBy("oinks", "desc");

  const snapshotPeople = await query.orderBy("oinks", "desc").get();

  const people: Array<any> = [];

  snapshotPeople.forEach((doc: any) =>
    people.push({ id: doc.id, ...doc.data() })
  );
  const subTags = tagsConfig[tags[0] as "person"];
  return (
    <div className="h-[500px]">
      <AlbumGrid items={people} />
    </div>
  );
}

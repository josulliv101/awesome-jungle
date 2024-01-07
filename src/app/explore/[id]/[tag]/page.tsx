import { AlbumGrid } from "@/components/album-grid";
import { db } from "@/firebase";

interface PageProps {
  params: { id: string; tag: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ByTag({ params }: PageProps) {
  const { id, tag } = params;

  const refPeople = db
    .collection("entity")
    .where(`tagMap.${id}`, "==", true)
    .where(`tagMap.${tag}`, "==", true)
    .orderBy("oinks", "desc");

  const snapshotPeople = await refPeople.get();

  const people: Array<any> = [];

  snapshotPeople.forEach((doc: any) =>
    people.push({ id: doc.id, ...doc.data() })
  );

  return (
    <div className="h-[500px]">
      id {id} / tag {tag} / {people.length}
      <AlbumGrid items={people} />
    </div>
  );
}

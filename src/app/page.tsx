import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { db } from "@/firebase";
import { Albums } from "@/components/albums";

export default async function Home() {
  const ref = db.collection("entity").limit(12);
  const snapshot = await ref.get();

  const entities: Array<any> = [];

  snapshot.forEach((doc: any) => {
    console.log(doc.id, "=>", doc.data());
    return entities.push({ id: doc.id, ...doc.data() });
  });

  return (
    <main className="min-h-screen">
      <div className="h-[400px] bg-jungle bg-cover bg-bottom"></div>
      <div className="px-12 py-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Listen Now
            </h2>
            <p className="text-sm text-muted-foreground">
              Top picks for you. Updated daily.
            </p>
          </div>
        </div>
        <Albums items={entities} />
      </div>
    </main>
  );
}

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { db } from "@/firebase";
import { Albums } from "@/components/albums";
import { Sidebar } from "@/components/sidebar";

export default async function Home() {
  const refPeople = db
    .collection("entity")
    .where("tags", "array-contains", "person")
    .orderBy("oinks", "desc")
    .limit(8);
  const snapshotPeople = await refPeople.get();

  const people: Array<any> = [];

  snapshotPeople.forEach((doc: any) =>
    people.push({ id: doc.id, ...doc.data() })
  );

  const refPlaces = db
    .collection("entity")
    .where("tags", "array-contains", "city")
    .orderBy("oinks", "desc")
    .limit(8);
  const snapshotPlaces = await refPlaces.get();

  const places: Array<any> = [];

  snapshotPlaces.forEach((doc: any) =>
    places.push({ id: doc.id, ...doc.data() })
  );

  const refMovies = db
    .collection("entity")
    .where("tags", "array-contains", "movie")
    .orderBy("oinks", "desc")
    .limit(8);
  const snapshotMovies = await refMovies.get();

  const movies: Array<any> = [];

  snapshotMovies.forEach((doc: any) =>
    movies.push({ id: doc.id, ...doc.data() })
  );

  return (
    <main className="min-h-screen">
      <div className="h-[400px] bg-jungle bg-cover bg-bottom"></div>
      <div className="bg-background">
        <div className="grid lg:grid-cols-5">
          <Sidebar playlists={undefined} className="hidden lg:block" />
          <div className="col-span-3 lg:col-span-4 lg:border-l">
            <div className="px-12 py-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    People
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Find awesome people in arts & entertainment, sports,
                    politics, science, academia, and more.
                  </p>
                </div>
              </div>
              <Albums items={people} />
            </div>
            <div className="px-12 py-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Cities
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Find awesome places - currently places are all in the Unites
                    States.
                  </p>
                </div>
              </div>
              <Albums items={places} />
            </div>
            <div className="px-12 py-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Movies
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Find awesome movies.
                  </p>
                </div>
              </div>
              <Albums items={movies} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

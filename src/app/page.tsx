import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { db } from "@/firebase";
import { Albums } from "@/components/albums";
import { Sidebar } from "@/components/sidebar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default async function Home() {
  const refPeople = db
    .collection("entity")
    .where("tagMap.person", "==", true)
    .orderBy("oinks", "desc")
    .limit(8);
  const snapshotPeople = await refPeople.get();

  const people: Array<any> = [];

  snapshotPeople.forEach((doc: any) =>
    people.push({ id: doc.id, ...doc.data() })
  );

  const refMovies = db
    .collection("entity")
    .where("tagMap.movie", "==", true)
    .orderBy("oinks", "desc")
    .limit(8);
  const snapshotMovies = await refMovies.get();

  const movies: Array<any> = [];

  snapshotMovies.forEach((doc: any) =>
    movies.push({ id: doc.id, ...doc.data() })
  );

  return (
    <main className="min-h-screen">
      <div className="relative h-[400px] bg-jungle bg-cover bg-center">
        <Image
          className="absolute scale-50 -z-0 top-[180px] left-[50%] -translate-x-1/2"
          alt="guide"
          src="/hyena.png"
          width="185"
          height="210"
        />
        <div className="absolute w-full h-full bg-jungle-overlay" />
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 px-4 py-2 font-normal text-xl text-white bg-orange-500">
          Discover why things are awesome.
        </div>
      </div>
      <div className="bg-background">
        <div className="grid lg:grid-cols-5">
          <Sidebar playlists={undefined} className="hidden lg:block" />
          <div className="col-span-3 lg:col-span-4 lg:border-l">
            <div className="px-12 pt-6">
              <h2 className="text-3xl font-semibold tracking-tight mb-8">
                Explor the Awesome Jungle
              </h2>
            </div>
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
                    Movies
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Find awesome movies.
                  </p>
                </div>
              </div>
              <Albums items={movies} />
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline">Open Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                      <DrawerTitle>Move Goal</DrawerTitle>
                      <DrawerDescription>
                        Set your daily activity goal.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="flex-1 text-center">
                          <div className="text-7xl font-bold tracking-tighter">
                            1
                          </div>
                          <div className="text-[0.70rem] uppercase text-muted-foreground">
                            Calories/day
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 h-[120px]">content</div>
                    </div>
                    <DrawerFooter>
                      <Button>Submit</Button>
                      <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

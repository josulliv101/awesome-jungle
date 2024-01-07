import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";

interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

function snakeToTitleCase(str: string) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export default async function Explore({ params }: PageProps) {
  const { id } = params;

  const refPeople = db
    .collection("entity")
    .where(`tagMap.${id}`, "==", true)
    .where(`tagMap.person`, "==", true)
    .orderBy("oinks", "desc")
    .limit(6);

  const snapshotPeople = await refPeople.get();

  const people: Array<any> = [];

  snapshotPeople.forEach((doc: any) =>
    people.push({ id: doc.id, ...doc.data() })
  );

  const refMovies = db
    .collection("entity")
    .where(`tagMap.${id}`, "==", true)
    .where(`tagMap.movie`, "==", true)
    .orderBy("oinks", "desc")
    .limit(8);
  const snapshotMovies = await refMovies.get();

  const movies: Array<any> = [];

  snapshotMovies.forEach((doc: any) =>
    movies.push({ id: doc.id, ...doc.data() })
  );

  return (
    <>
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="account">Categories</TabsTrigger>
          <TabsTrigger value="password">Bubble Chart</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="p-0 m-0">
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1 w-full">
                <h2 className="flex items-center justify-start f-full text-2xl font-semibold tracking-tight">
                  People
                  <Link
                    className="ml-4 text-sm text-muted-foreground font-normal"
                    href={`/explore/${id}/person`}
                  >
                    ( View all )
                  </Link>
                </h2>
                <p className="text-sm text-muted-foreground">
                  Find awesome people in arts & entertainment, sports, politics,
                  science, academia, and more.
                </p>
              </div>
            </div>
            <Albums items={people} />
          </div>
          <div className="py-8">
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
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </>
  );
}

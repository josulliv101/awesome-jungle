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

interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Profile({ params }: PageProps) {
  const { id } = params;

  return (
    <>
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
              <div className="px-12 pt-12">{id}</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

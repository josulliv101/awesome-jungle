import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import { Badge } from "@/components/ui/badge";
import { Sparkle, Star } from "lucide-react";
import { FormEmptyProfile } from "./FormEmptyProfile";
import Link from "next/link";
import { ReactNode } from "react";

interface PageProps {
  params: { profileId: string };
  searchParams: { [key: string]: string | string[] | undefined };
  children: ReactNode;
}

export default async function Profile({ children, params }: PageProps) {
  const { profileId } = params;

  return (
    <>
      <main className="min-h-screen">
        <div className="bg-background">
          <div className="grid lg:grid-cols-5">
            <Sidebar playlists={undefined} className="hidden lg:block" />
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

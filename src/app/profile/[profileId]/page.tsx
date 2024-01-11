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

interface PageProps {
  params: { profileId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Profile({ params }: PageProps) {
  const { profileId } = params;

  const refProfile = db.collection("entity").doc(profileId);

  const profile = (await refProfile.get()).data();

  const refReasons = db
    .collection("entity")
    .doc(profileId)
    .collection("whyawesome");
  const snapshotReasons = await refReasons.orderBy("votes", "desc").get();
  const reasons: Array<any> = [];

  snapshotReasons.forEach((doc: any) =>
    reasons.push({ id: doc.id, ...doc.data() })
  );

  if (!profile) {
    return <div>no profile found</div>;
  }

  return (
    <>
      <div>
        <Image
          className="rounded-lg border-4 object-cover min-w-[300px] h-[300px] flex-1 flex-shrink-0"
          alt={profile.name}
          src={profile.pic}
          width="300"
          height="300"
        />
        <Link
          href={`/profile/${profileId}/edit`}
          className="text-blue-400 hover:text-orange-500"
        >
          Edit {profile.name}
        </Link>
      </div>

      {!!reasons.length && (
        <Card className="border-none">
          <CardHeader>
            <CardTitle>Why awesome?</CardTitle>
            <CardDescription>
              Activate any statement below you feel is a major contributing
              factor to why {profile.name} is awesome. You may activate up to 3
              statements.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 text-xl">
            {reasons.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-between space-x-2 border px-4 py-2 rounded-sm hover:bg-gray-100"
                >
                  <Badge className="bg-orange-500">
                    <Sparkle className="relative left-[-3px] text-white h-[.85rem] w-[.85rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    {item.votes}
                  </Badge>
                  <Label
                    htmlFor={`reason-${index}`}
                    className="flex flex-col space-y-1 px-6 cursor-pointer"
                  >
                    <span className="hidden">Social Champion</span>
                    <span className="text-lg font-normal leading-normal text-muted-foreground">
                      {item.reason}
                    </span>
                  </Label>
                  <Switch id={`reason-${index}`} />
                </div>
              );
            })}
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      )}

      {!reasons.length && (
        <FormEmptyProfile name={profile.name} profileId={profileId} />
      )}
    </>
  );
}

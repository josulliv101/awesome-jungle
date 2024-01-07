import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/sidebar";
import { Breadcrumb } from "@/components/breadcrumb";

function snakeToTitleCase(str: string) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

interface PageProps {
  params: { id: string; tag: string };
  searchParams: { [key: string]: string | string[] | undefined };
  children: React.ReactNode;
}

export default function ExploreLayout({ params, children }: PageProps) {
  const { id, tag } = params;
  return (
    <main className="min-h-screen">
      <div className="relative h-[400px] bg-jungle bg-cover bg-center">
        <Image
          className="hidden absolute scale-50 -z-0 top-[180px] left-[50%] -translate-x-1/2"
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
            <div className="px-12 pt-12">
              {" "}
              <h2 className="text-3xl font-semibold tracking-tight mb-4">
                <Breadcrumb />
              </h2>
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

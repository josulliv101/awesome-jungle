"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { tagsConfig, TagsConfig } from "@/config/tags";

const examples = [
  {
    name: "Mail",
    href: "/examples/mail",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/mail",
  },
  {
    name: "Dashboard",
    href: "/examples/dashboard",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/dashboard",
  },
  {
    name: "Cards",
    href: "/examples/cards",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/cards",
  },
  {
    name: "Tasks",
    href: "/examples/tasks",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/tasks",
  },
  {
    name: "Playground",
    href: "/examples/playground",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/playground",
  },
  {
    name: "Forms",
    href: "/examples/forms",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/forms",
  },
  {
    name: "Music",
    href: "/examples/music",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/music",
  },
  {
    name: "Authentication",
    href: "/examples/authentication",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/authentication",
  },
];

interface ExamplesNavProps extends React.HTMLAttributes<HTMLDivElement> {
  activeTag: keyof TagsConfig;
}

export function NavSubTags({
  activeTag,
  className,
  ...props
}: ExamplesNavProps) {
  const pathname = usePathname();
  const { hub, tags } = useParams();
  let subTags: string[] = [];

  if (typeof activeTag === "string") {
    subTags = ["", ...Object.keys(tagsConfig[activeTag] || {})];
  }

  if (typeof tags === "string" || !tags.length) {
    return null;
  }

  return (
    <div className="relative">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("mb-4 flex items-center", className)} {...props}>
          {subTags.map((subTag, index) => (
            <Link
              href={`/explore2/${hub}/${tags[0]}/${subTag}`}
              key={subTag}
              className={cn(
                "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
                activeTag === subTag || (index === 0 && !activeTag)
                  ? "bg-muted font-medium text-primary"
                  : "text-muted-foreground"
              )}
            >
              {index === 0 ? "all" : subTag}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}

interface ExampleCodeLinkProps {
  pathname: string | null;
}

export function ExampleCodeLink({ pathname }: ExampleCodeLinkProps) {
  const example = examples.find((example) =>
    pathname?.startsWith(example.href)
  );

  if (!example?.code) {
    return null;
  }

  return (
    <Link
      href={example?.code}
      target="_blank"
      rel="nofollow"
      className="absolute right-0 top-0 hidden items-center rounded-[0.5rem] text-sm font-medium md:flex"
    >
      View code
      <ArrowRightIcon className="ml-1 h-4 w-4" />
    </Link>
  );
}

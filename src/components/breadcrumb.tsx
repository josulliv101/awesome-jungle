"use client";

import { siteConfig } from "@/config/site";
import { useRouter, useParams } from "next/navigation";

function snakeToTitleCase(str: string) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function Breadcrumb() {
  const { hub, tags, id = hub, tag } = useParams();

  console.log("Breadcrumb", id, hub, tags);
  return (
    <>
      {snakeToTitleCase(Array.isArray(id) ? id.join(" / ") : id)}
      {Array.isArray(tags) && tags.map((tag) => ` > ${snakeToTitleCase(tag)}`)}
    </>
  );
}

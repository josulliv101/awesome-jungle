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
  const { id, tag } = useParams();
  console.log("params", id, tag);
  return (
    <>
      {snakeToTitleCase(Array.isArray(id) ? id.join(" / ") : id)}
      {typeof tag === "string"
        ? ` / ${snakeToTitleCase(tag)}`
        : tag && tag.join(" / ")}
    </>
  );
}

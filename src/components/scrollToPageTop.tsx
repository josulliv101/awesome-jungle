"use client";
import { useEffect, useState } from "react";
import React from "react";

export function ScrollToPageTop() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    console.log("mounted", mounted);
    if (mounted) {
      window.scrollTo({ top: 500, left: 0, behavior: "smooth" });
    }
    setMounted(true);
  }, [mounted]);
  return null;
}

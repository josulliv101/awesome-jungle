"use client";

import { useState } from "react";
import { Loader2, Sparkle } from "lucide-react";
import { BellIcon, EyeNoneIcon, PersonIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

const mockData = [
  "She is a talented singer and songwriter, with a unique and powerful voice that captivates audiences.",
  "She is a fearless and groundbreaking artist, constantly pushing boundaries and challenging norms in her music and performances.",
  "She is a passionate advocate for LGBTQ+ rights and uses her platform to spread love, acceptance, and equality.",
  "She has overcome personal struggles and openly shares her experiences, inspiring and empowering her fans to do the same.",
  "She is a philanthropist, striving to make a positive impact in the world through her charity work and activism.",
];

export function ButtonGenerateSuggestions({ name }: { name: string }) {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(mockData);

  const handleGenerateSuggestions = async () => {
    setLoading(true);
    return await fetch(`/api/whyawesome?name=${name}`)
      .then((resp) => resp.json())
      .then((json: { data: string[] }) => {
        const { data } = json;
        console.log("data", data);
        setSuggestions(data);
        setLoading(false);
      });
  };

  return (
    <>
      {true ? (
        <>
          {suggestions.map((suggestion, index) => (
            <div key={index} className="items-top flex space-x-6">
              <Checkbox id={`reason-${index}`} />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={`reason-${index}`}
                  className="text-lg font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {suggestion}
                </label>
              </div>
            </div>
          ))}
        </>
      ) : (
        <Button onClick={handleGenerateSuggestions}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkle className="mr-2 h-4 w-4" />
          )}
          Generate Suggestions
        </Button>
      )}
    </>
  );
}

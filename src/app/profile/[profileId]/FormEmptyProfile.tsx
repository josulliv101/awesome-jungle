"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkle } from "lucide-react";
import { addWhyAwesomeReasons } from "@/actions";
import { CheckedState } from "@radix-ui/react-checkbox";
import { redirect } from "next/navigation";

export function FormEmptyProfile(props: { name: string; profileId: string }) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleGenerateSuggestions = async () => {
    return await fetch(`/api/whyawesome?name=${props.name}`)
      .then((resp) => resp.json())
      .then((json: { data: string[] }) => {
        const { data } = json;
        console.log("data", data);
        setSuggestions(data);
      });
  };

  return suggestions.length === 0 ? (
    <FormNoReasons onSubmit={handleGenerateSuggestions} {...props} />
  ) : (
    <FormPotentialReasons suggestions={suggestions} {...props} />
  );
}

export function FormNoReasons({
  name,
  onSubmit,
}: {
  name: string;
  onSubmit: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);

  const helpMessage = `${name} does not have any data yet, go ahead and generate some awesome reasons.`;

  const handleSubmit = () => {
    setLoading(true);
    onSubmit().then(() => setLoading(false));
  };

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>Why awesome?</CardTitle>
        <CardDescription>{helpMessage}</CardDescription>
      </CardHeader>
      <CardFooter>
        {
          <Button onClick={handleSubmit} variant="outline" className="w-full">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                <Sparkle className="mr-2 h-4 w-4" /> Generate Suggestions
              </>
            )}
          </Button>
        }
      </CardFooter>
    </Card>
  );
}

export function FormPotentialReasons({
  name,
  profileId,
  suggestions = [],
}: {
  name: string;
  profileId: string;
  suggestions: string[];
}) {
  const [loading, setLoading] = useState(false);
  const [selectedSuggestions, setSelectedSuggestions] = useState<number[]>([]);

  const helpMessage = `Select the items to save.`;

  const handleSubmit = () => {
    console.log("handleSubmit", suggestions);
    addWhyAwesomeReasons(
      profileId,
      selectedSuggestions.map((index) => suggestions[index])
    );
  };

  const handleCheckboxChange = (ev: any) => {
    const id = Number(ev.target.id);
    console.log("change", id, ev);
    if (selectedSuggestions.includes(id)) {
      setSelectedSuggestions(
        selectedSuggestions.filter((index) => index !== id)
      );
    } else {
      setSelectedSuggestions([id, ...selectedSuggestions]);
    }
  };

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>Why awesome?</CardTitle>
        <CardDescription>{helpMessage}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 text-xl">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="items-top flex space-x-6">
            <Checkbox id={String(index)} onClick={handleCheckboxChange} />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor={String(index)}
                className="text-lg font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {suggestion}
              </label>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        {!!suggestions.length && (
          <Button onClick={handleSubmit} variant="outline" className="w-full">
            Save
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

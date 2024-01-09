"use server";

import { db } from "@/firebase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addWhyAwesomeReasons(
  profileId: string,
  whyAwesomeList: string[]
) {
  console.log("addWhyAwesomeReasons", profileId, whyAwesomeList);
  const promises: Array<Promise<any>> = [];
  whyAwesomeList.forEach((reason) => {
    const data = {
      votes: 1,
      reason,
    };
    const p = db.collection(`entity/${profileId}/whyawesome`).doc().set(data);
    promises.push(p);
  });
  await Promise.all(promises).then(() => {
    console.log("DONE", profileId);
  });
  revalidatePath("/profile/[profileId]");
  // redirect("/");
}

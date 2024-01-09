import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

var sleepSetTimeout_ctrl: NodeJS.Timeout;

function sleep(ms: number) {
  clearInterval(sleepSetTimeout_ctrl);
  return new Promise(
    (resolve) => (sleepSetTimeout_ctrl = setTimeout(resolve, ms))
  );
}

const mockData = [
  "She is a talented singer and songwriter, with a unique and powerful voice that captivates audiences.",
  "She is a fearless and groundbreaking artist, constantly pushing boundaries and challenging norms in her music and performances.",
  "She is a passionate advocate for LGBTQ+ rights and uses her platform to spread love, acceptance, and equality.",
  "She has overcome personal struggles and openly shares her experiences, inspiring and empowering her fans to do the same.",
  "She is a philanthropist, striving to make a positive impact in the world through her charity work and activism.",
];

export async function GET(request: NextApiRequest, response: NextApiResponse) {
  if (typeof request.url !== "string") {
    throw new Error(`Issue with accessing the request.url.`);
  }
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name || typeof name !== "string") {
    throw new Error(`Issue with name param: ${name}`);
  }

  try {
    const data = await sleep(2000);

    return NextResponse.json({ success: true, name, data: mockData });
  } catch (error) {
    console.error("Error processing:", error);
    return NextResponse.error();
  }
}

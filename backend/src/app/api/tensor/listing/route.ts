import { NextResponse } from "next/server";
import { getTensorSwapActiveListing } from "@/app/services/nft/getTensorSwapActiveListing";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const data = await getTensorSwapActiveListing(searchParams.get("slug") || "");

  return NextResponse.json({ data: data });
}

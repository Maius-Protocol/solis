import { NextResponse } from "next/server";
import shyft from "@/app/adapters/shyft";
import { getCombinationSwapRoutes } from "@/app/services/getCombinationSwapRoutes";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const outputAmount = parseFloat(searchParams.get("outputAmount") || "0");

  const data = await getCombinationSwapRoutes(
    searchParams.get("address") || "",
    outputAmount,
    searchParams.get("outputMint") || "");

  return NextResponse.json({ data: data });
}
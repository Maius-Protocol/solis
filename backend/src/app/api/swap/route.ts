import { NextResponse } from "next/server";
import { getCombinationSwapRoutes } from "@/app/services/swap/getCombinationSwapRoutes";
import { buildSwapTransactions } from "@/app/services/swap/buildSwapTransactions";
import { CombinationSwapMode, CombinationSwapRouteInput } from "@/app/types/swap";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const outputAmount = parseFloat(searchParams.get("outputAmount") || "0");

  let combinationSwapRouteInput: CombinationSwapRouteInput = {
    walletAddress: searchParams.get("address") || "",
    outputAmount: outputAmount,
    outputMint: searchParams.get("outputMint") || "",
    manualSwapTokenInputList: [],
    mode: searchParams.get("mode") == CombinationSwapMode.MANUAL ? CombinationSwapMode.MANUAL : CombinationSwapMode.AUTO
  }

  const data = await getCombinationSwapRoutes(combinationSwapRouteInput);

  return NextResponse.json({ data: data });
}

export async function POST(req: Request) {
  const combinationSwapRouteInput = (await req.json() ?? {}) as CombinationSwapRouteInput;
  const data = await buildSwapTransactions(combinationSwapRouteInput)
  return NextResponse.json({ data: data });
}
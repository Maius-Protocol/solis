import { NextResponse } from "next/server";
import shyft from "@/app/adapters/shyft";
import { getWalletBalance } from "@/app/services/getWalletBalance";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const data = await getWalletBalance(searchParams.get("address") || "");

  return NextResponse.json({ data: data });
}

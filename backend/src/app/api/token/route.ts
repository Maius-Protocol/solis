import { NextResponse } from "next/server";
import { getWalletBalance } from "@/app/services/wallet/getWalletBalance";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const data = await getWalletBalance(
    searchParams.get("address") || "",
    searchParams.get("vsToken") || "",
  );

  return NextResponse.json({ data: data });
}

import { NextResponse } from "next/server";
import { getUserMeteoraVaultBalance } from "@/app/services/vault/getUserMeteoraVaultBalance";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const data = await getUserMeteoraVaultBalance(
    searchParams.get("address") || "",
  );

  return NextResponse.json({ data: data });
}

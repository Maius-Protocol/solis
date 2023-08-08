import { NextResponse } from "next/server";
import { getUserMeteoraVaultBalance } from "@/app/services/getUserMeteoraVaultBalance";
import { depositToMeteoraVault } from "@/app/services/depositToMeteoraVault";

export async function POST(req: Request) {
  const { publicKey, mint, amount, decimals } = await req.json();
  const data = await depositToMeteoraVault({
    publicKey: publicKey,
    mint: mint,
    amount: amount,
    decimals: decimals,
  });

  return NextResponse.json({ data: data });
}

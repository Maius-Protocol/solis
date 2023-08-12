import { NextResponse } from "next/server";
import { getUserMeteoraVaultBalance } from "@/app/services/getUserMeteoraVaultBalance";
import { depositToMeteoraVault } from "@/app/services/depositToMeteoraVault";
import { withdrawMeteoraVault } from "@/app/services/withdrawMeteaoraVault";
import { buyNftWithTensorSwap } from "@/app/services/buyNftWithTensorswap";
import { getTensorSwapActiveListing } from "@/app/services/getTensorSwapActiveListing";

export async function OPTIONS(request: Request) {
  const allowedOrigin = request.headers.get("origin");
  const response = new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
      "Access-Control-Max-Age": "86400",
    },
  });

  return response;
}
export async function POST(req: Request) {
  // const { publicKey, mint, amount } = await req.json();
  // const data = await withdrawMeteoraVault({
  //   publicKey: publicKey,
  //   mint: mint,
  //   amount: amount,
  // });

  // const { buyer, owner, mint, maxPrice } = await req.json();
  // const data = await buyNftWithTensorSwap({
  //   buyer: buyer,
  //   owner: owner,
  //   mint: mint,
  //   maxPrice: maxPrice,
  // });
  const { slug } = await req.json();
  const data = await getTensorSwapActiveListing(slug);

  return NextResponse.json({ data: data });
}

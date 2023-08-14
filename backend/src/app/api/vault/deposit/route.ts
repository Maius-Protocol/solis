import { NextResponse } from "next/server";
import {
  SwapAndDepositVaultInput,
  SwapAndDepositVaultResponse,
} from "@/app/types/vault";
import { swapAndDepositVault } from "@/app/services/combine/swapAndDepositVault";
import shyft from "@/app/adapters/shyft";
import { Buffer } from "buffer";
import { VersionedTransaction } from "@solana/web3.js";

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
  const swapAndDepositVaultInput = ((await req.json()) ??
    {}) as SwapAndDepositVaultInput;
  let data = await swapAndDepositVault(swapAndDepositVaultInput);
  return NextResponse.json({
    data: data,
  });
}

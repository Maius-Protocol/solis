import { NextResponse } from "next/server";
import {
  SwapAndDepositVaultInput,
  SwapAndDepositVaultResponse,
} from "@/app/types/vault";
import { swapAndDepositVault } from "@/app/services/swapAndDepositVault";
import shyft from "@/app/adapters/shyft";

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
    data: data?.txs?.map((tx) => {
      const serializedTransaction = tx.serialize({
        verifySignatures: false,
        requireAllSignatures: false,
      });
      const base64Transaction = serializedTransaction.toString("base64");
      return base64Transaction;
    }),
  });
}

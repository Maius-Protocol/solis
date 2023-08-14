import { NextResponse } from "next/server";
import {
  sendAndConfirmTransaction,
  VersionedTransaction,
} from "@solana/web3.js";
import { mainnetConnection } from "@/app/constant/web3";

const bs58 = require("bs58");

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
  const { tx } = await req.json();
  const transaction = VersionedTransaction.deserialize(bs58.decode(tx));
  const signature = await sendAndConfirmTransaction(
    mainnetConnection,
    transaction,
  );
  console.log(signature);
  return NextResponse.json({
    signature,
  });
}

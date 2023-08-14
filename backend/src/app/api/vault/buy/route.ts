import { NextResponse } from "next/server";
import { WithdrawAndBuyNftInput } from "@/app/types/vault";
import { withdrawAndBuyNft } from "@/app/services/combine/withdrawAndBuyNft";

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
  const withdrawAndBuyNftInput = ((await req.json()) ??
    {}) as WithdrawAndBuyNftInput;
  let data = await withdrawAndBuyNft(withdrawAndBuyNftInput);
  return NextResponse.json({
    data: data,
  });
}

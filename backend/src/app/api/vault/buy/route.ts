import { NextResponse } from "next/server";
import {
    WithdrawAndBuyNftInput
} from "@/app/types/vault";
import { withdrawAndBuyNft } from "@/app/services/combine/withdrawAndBuyNft";

export async function POST(req: Request) {
    const withdrawAndBuyNftInput = ((await req.json()) ??
        {}) as WithdrawAndBuyNftInput;
    let data = await withdrawAndBuyNft(withdrawAndBuyNftInput);
    return NextResponse.json({
        data: data,
    });
}

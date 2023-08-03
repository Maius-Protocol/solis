import { NextResponse } from "next/server";
import covalenthq from "@/app/adapters/covalenthq";


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const data = await covalenthq.getTokenBalance(searchParams.get("address") || "")

    return NextResponse.json({ data: data });
}

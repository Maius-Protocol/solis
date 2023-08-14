import { NextResponse } from "next/server";
import { listTensorCollection } from "@/app/services/listTensorSwapCollection";
export async function GET(req: Request) {
  const data = await listTensorCollection();
  const collections = data?.allCollections.collections;
  return NextResponse.json({ data: collections });
}

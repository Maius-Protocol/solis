import tensorSwap from "@/app/adapters/tensorSwap";

import { ActiveListing } from "@/app/types/token";
import nft from "@/app/adapters/nft";

export async function listTensorCollection() {
  const data = await tensorSwap.listCollections();
  if (!data) return null;

  return data;
}

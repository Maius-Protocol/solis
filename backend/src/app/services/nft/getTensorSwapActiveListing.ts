import tensorSwap from "@/app/adapters/tensorSwap";

import { ActiveListing } from "@/app/types/token";
import nft from "@/app/adapters/nft";

export async function getTensorSwapActiveListing(slug: string) {
  const instrument = await tensorSwap.getInstrument(slug);
  if (!instrument) return null;
  const slugId = instrument.instrumentTV2.slug;
  const data = await tensorSwap.getActiveListing(slugId);
  if (!data) return null;
  const txs = data.activeListingsV2.txs;
  const activeListings: ActiveListing[] = [];
  await Promise.all(
    txs.map(async (tx: any) => {
      const metadata = await nft.getMetadataNft(tx.mint.metadataUri);
      activeListings.push({
        mint: tx.mint.onchainId,
        price: tx.tx.grossAmount,
        seller: tx.tx.sellerId,
        unit: tx.tx.grossAmountUnit,
        metadata: metadata,
      });
    }),
  );
  return activeListings;
}

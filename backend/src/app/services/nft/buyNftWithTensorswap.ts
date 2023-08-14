import { BuyNFTListing } from "@/app/types/token";
import tensorSwap from "@/app/adapters/tensorSwap";
import { Transaction } from "@solana/web3.js";

export async function buyNftWithTensorSwap(buyNftListing: BuyNFTListing): Promise<Transaction> {
  let buyNftTx = new Transaction()
  const data = await tensorSwap.buyNftListing(
    buyNftListing.owner,
    buyNftListing.maxPrice,
    buyNftListing.buyer,
    buyNftListing.mint,
  );

  if (data) {
    const txs = data.tswapBuySingleListingTx.txs[0];
    buyNftTx.add(Transaction.from(txs?.tx?.data));
  }
  return buyNftTx
}

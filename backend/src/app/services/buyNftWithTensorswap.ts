import { BuyNFTListing } from "@/app/types/token";
import tensorSwap from "@/app/adapters/tensorSwap";
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { bs58 } from "@switchboard-xyz/common";
import { SECRET_KEY } from "../../../env";
import { web3 } from "@project-serum/anchor";
import { mainnetConnection } from "@/app/constant/web3";

export async function buyNftWithTensorSwap(buyNftListing: BuyNFTListing) {
  const data = await tensorSwap.buyNftListing(
    buyNftListing.owner,
    buyNftListing.maxPrice,
    buyNftListing.buyer,
    buyNftListing.mint,
  );

  if (!data) return null;
  const txs = data.tswapBuySingleListingTx.txs[0];
  const feePayer = Keypair.fromSecretKey(bs58.decode(SECRET_KEY));
  let transaction = new Transaction();
  transaction.add(Transaction.from(txs.tx.data));
  const signature = await web3.sendAndConfirmTransaction(
    mainnetConnection,
    transaction,
    [feePayer],
  );
  return signature;
}

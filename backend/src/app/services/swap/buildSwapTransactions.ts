import { CombinationSwapRouteInput, CombinationSwapRoute } from "../../types/swap";
import { getCombinationSwapRoutes } from "./getCombinationSwapRoutes";
import jupiter from "../../adapters/jupiter";
import { Transaction, VersionedTransaction } from "@solana/web3.js";
import { Buffer } from "buffer";

export async function buildSwapTransactions(
  combinationSwapRouteInput: CombinationSwapRouteInput,
): Promise<VersionedTransaction[]> {
  let combinationSwapRoutes: CombinationSwapRoute[] | string =
    await getCombinationSwapRoutes(combinationSwapRouteInput);
  let swapTxResp: VersionedTransaction[] = [];
  if (combinationSwapRoutes) {
    for (const swapRoute of combinationSwapRoutes) {
      if (swapRoute?.isSwapRoute) {
        let jupiterSwapTx = await jupiter.buildSwapTxV6({
          userPublicKey: combinationSwapRouteInput?.walletAddress,
          quoteResponse: swapRoute?.inputToken?.jupiterSwapRoute,
          // asLegacyTransaction: true,
        });
        if (jupiterSwapTx) {
          swapTxResp.push(jupiterSwapTx["swapTransaction"]);
        }
      }
    }
  }
  return swapTxResp;
}

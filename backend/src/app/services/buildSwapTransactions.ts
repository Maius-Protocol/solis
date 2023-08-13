import { CombinationSwapRouteInput, CombinationSwapRoute } from "../types/swap";
import { getCombinationSwapRoutes } from "./getCombinationSwapRoutes";
import jupiter from "../adapters/jupiter";
import { VersionedTransaction } from "@solana/web3.js";

export async function buildSwapTransactions(combinationSwapRouteInput: CombinationSwapRouteInput): Promise<VersionedTransaction[]> {
    let combinationSwapRoutes: CombinationSwapRoute[] | string = await getCombinationSwapRoutes(combinationSwapRouteInput)
    let swapTxResp: VersionedTransaction[] = []
    if (combinationSwapRoutes) {
        for (const swapRoute of combinationSwapRoutes) {
            if (swapRoute?.isSwapRoute) {
                let jupiterSwapTx = await jupiter.buildSwapTxV6({
                    "userPublicKey": combinationSwapRouteInput?.walletAddress,
                    "quoteResponse": swapRoute?.inputToken?.jupiterSwapRoute
                })
                if (jupiterSwapTx) {
                    const jupiterSwapTxBuf = Buffer.from(jupiterSwapTx["swapTransaction"], "base64")
                    let swapTx = VersionedTransaction.deserialize(jupiterSwapTxBuf)
                    swapTxResp.push(swapTx)
                }
            }
        }
    }
    return swapTxResp
}
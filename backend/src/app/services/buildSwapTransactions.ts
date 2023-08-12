import { CombinationSwapRouteInput, CombinationSwapRoute, SwapTransactions } from "../types/swap";
import { getCombinationSwapRoutes } from "./getCombinationSwapRoutes";
import jupiter from "../adapters/jupiter";

export async function buildSwapTransactions(combinationSwapRouteInput: CombinationSwapRouteInput): Promise<SwapTransactions> {
    let combinationSwapRoutes: CombinationSwapRoute[] | string = await getCombinationSwapRoutes(combinationSwapRouteInput)
    let swapTxs: string[] = []
    let swapTxResp: SwapTransactions = {
        swapTxs: swapTxs
    }
    if (combinationSwapRoutes) {
        for (const swapRoute of combinationSwapRoutes) {
            if (swapRoute?.isSwapRoute) {
                let jupiterBuildSwapTxV6 = await jupiter.buildSwapTxV6({
                    "userPublicKey": combinationSwapRouteInput?.walletAddress,
                    "quoteResponse": swapRoute?.inputToken?.jupiterSwapRoute
                })
                if (jupiterBuildSwapTxV6) {
                    swapTxs.push(jupiterBuildSwapTxV6["swapTransaction"])
                }
            }
        }
    }
    return swapTxResp
}
import jupiter from "@/app/adapters/jupiter";
import shyft from "../adapters/shyft";
import { getWalletBalance, compareTokenBalance } from "./getWalletBalance";
import { CombinationSwapMode, CombinationSwapRouteInput, CombinationSwapRoute } from "@/app/types/swap";

export async function getCombinationSwapRoutes(combinationSwapRouteInput: CombinationSwapRouteInput) {
    if (combinationSwapRouteInput?.mode == CombinationSwapMode.AUTO) {
        return autoGetCombinationSwapRoutes(
            combinationSwapRouteInput.walletAddress,
            combinationSwapRouteInput.outputAmount,
            combinationSwapRouteInput.outputMint,
        )
    } else if (combinationSwapRouteInput?.mode == CombinationSwapMode.MANUAL) {
        return manualGetCombinationSwapRoutes()
    }
}

export async function autoGetCombinationSwapRoutes(walletAddress: string, outputAmount: number, outputMint: string) {
    let walletBalance = await getWalletBalance(walletAddress, outputMint)
    let outputMintInfo = await shyft.getTokenInfo(outputMint)
    let order = 0

    walletBalance.sort((a, b) => compareTokenBalance(a, b, outputMint, outputMint));

    let combinationSwapRoutes: CombinationSwapRoute[] = []
    for (const tokenBalance of walletBalance) {
        if (outputAmount <= 0) break

        let tokenBalanceVsOutputMint = tokenBalance.balance * tokenBalance.price[outputMint]

        if (tokenBalance.address == outputMint) {
            let swapRoute: CombinationSwapRoute = {
                isSwapRoute: false,
                inputToken: {
                    tokenInfo: tokenBalance,
                    jupiterSwapRoute: null,
                    amount: outputAmount - tokenBalanceVsOutputMint > 0 ? tokenBalanceVsOutputMint : outputAmount
                },
                order: order
            }
            combinationSwapRoutes.push(swapRoute)
            outputAmount -= tokenBalanceVsOutputMint
            order++
            continue
        }

        let jupiterSwapRoutes = []
        if (tokenBalanceVsOutputMint > outputAmount) {
            jupiterSwapRoutes = await jupiter.getSingleSwapRoute(
                tokenBalance.address,
                outputMint,
                Math.ceil((outputAmount * (10 ** outputMintInfo?.decimals || 0))),
                "ExactOut",
                50
            )
        } else {
            jupiterSwapRoutes = await jupiter.getSingleSwapRoute(
                tokenBalance.address,
                outputMint,
                tokenBalance.balance * (10 ** tokenBalance.decimals),
                "ExactIn",
                50
            )
        }

        if (jupiterSwapRoutes.length > 0) {
            let swapRoute: CombinationSwapRoute = {
                isSwapRoute: true,
                inputToken: {
                    tokenInfo: tokenBalance,
                    jupiterSwapRoute: jupiterSwapRoutes[0],
                    amount: jupiterSwapRoutes[0]?.inAmount / (10 ** tokenBalance.decimals)
                },
                order: order
            }
            combinationSwapRoutes.push(swapRoute)
        }

        outputAmount -= tokenBalanceVsOutputMint
        order++
    }

    if (outputAmount > 0) {
        return `No balance left to swap for the rest of ${outputAmount} token ${outputMint}`
    }
    return combinationSwapRoutes
}

export async function manualGetCombinationSwapRoutes() {
}
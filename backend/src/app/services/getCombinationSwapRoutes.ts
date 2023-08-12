import jupiter from "@/app/adapters/jupiter";
import shyft from "../adapters/shyft";
import { getWalletBalance, compareTokenBalance } from "./getWalletBalance";
import { CombinationSwapMode, CombinationSwapRouteInput, CombinationSwapRoute, ManualSwapTokenInput } from "@/app/types/swap";

export async function getCombinationSwapRoutes(combinationSwapRouteInput: CombinationSwapRouteInput): Promise<CombinationSwapRoute[]> {
    if (combinationSwapRouteInput?.mode == CombinationSwapMode.AUTO) {
        return autoGetCombinationSwapRoutes(
            combinationSwapRouteInput.walletAddress,
            combinationSwapRouteInput.outputAmount,
            combinationSwapRouteInput.outputMint,
        )
    } else if (combinationSwapRouteInput?.mode == CombinationSwapMode.MANUAL) {
        return manualGetCombinationSwapRoutes(
            combinationSwapRouteInput.walletAddress,
            combinationSwapRouteInput.outputAmount,
            combinationSwapRouteInput.outputMint,
            combinationSwapRouteInput.manualSwapTokenInputList
        )
    }
    else {
        console.log("Cannot get combination swap routes")
        return []
    }
}

export async function autoGetCombinationSwapRoutes(walletAddress: string, outputAmount: number, outputMint: string): Promise<CombinationSwapRoute[]> {
    let walletBalance = await getWalletBalance(walletAddress, outputMint)
    let outputMintInfo = await shyft.getTokenInfo(outputMint)

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
            }
            combinationSwapRoutes.push(swapRoute)
            outputAmount -= tokenBalanceVsOutputMint
            continue
        }

        let jupiterSwapRoutes = []
        if (tokenBalanceVsOutputMint > outputAmount) {
            jupiterSwapRoutes = await jupiter.getSwapRoutesV4(
                tokenBalance.address,
                outputMint,
                Math.ceil((outputAmount * (10 ** outputMintInfo?.decimals || 0))),
                "ExactOut",
                50
            )
        } else {
            jupiterSwapRoutes = await jupiter.getSwapRoutesV4(
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
            }
            combinationSwapRoutes.push(swapRoute)
        }

        outputAmount -= tokenBalanceVsOutputMint
    }

    if (outputAmount > 0) {
        console.log(`No balance left to swap for the rest of ${outputAmount} token ${outputMint}`)
        return []
    }
    return combinationSwapRoutes
}

export async function manualGetCombinationSwapRoutes(walletAddress: string, outputAmount: number, outputMint: string, manualSwapTokenInputList: ManualSwapTokenInput[]): Promise<CombinationSwapRoute[]> {
    let combinationSwapRoutes: CombinationSwapRoute[] = []
    for (const manualSwapTokenInput of manualSwapTokenInputList) {
        let inputToken = manualSwapTokenInput.inputToken
        let swapAmount = manualSwapTokenInput.amount

        if (inputToken?.address == outputMint) {
            let swapRoute: CombinationSwapRoute = {
                isSwapRoute: false,
                inputToken: {
                    tokenInfo: inputToken,
                    jupiterSwapRoute: null,
                    amount: swapAmount
                },
            }
            combinationSwapRoutes.push(swapRoute)
            continue
        }

        let jupiterSwapRoute = await jupiter.getSwapRoutesV6(
            inputToken.address,
            outputMint,
            swapAmount * (10 ** inputToken.decimals),
            "ExactIn",
            50
        )

        let swapRoute: CombinationSwapRoute = {
            isSwapRoute: true,
            inputToken: {
                tokenInfo: inputToken,
                jupiterSwapRoute: jupiterSwapRoute,
                amount: jupiterSwapRoute?.inAmount / (10 ** inputToken.decimals)
            },
        }
        combinationSwapRoutes.push(swapRoute)
    }
    return combinationSwapRoutes
}
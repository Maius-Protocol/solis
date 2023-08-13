import jupiter from "@/app/adapters/jupiter";
import shyft from "../adapters/shyft";
import { getWalletBalance, compareTokenBalance } from "./getWalletBalance";
import {
  CombinationSwapMode,
  CombinationSwapRouteInput,
  CombinationSwapRoute,
  ManualSwapTokenInput,
} from "@/app/types/swap";
import { multiplyBigNumbers, divideBigNumbers } from "@/app/utils/utils";
import { TokenInfo } from "../types/token";

export async function getCombinationSwapRoutes(
  combinationSwapRouteInput: CombinationSwapRouteInput,
): Promise<CombinationSwapRoute[]> {
  if (combinationSwapRouteInput?.mode == CombinationSwapMode.AUTO) {
    return autoGetCombinationSwapRoutes(
      combinationSwapRouteInput.walletAddress,
      combinationSwapRouteInput.outputToken?.amount,
      combinationSwapRouteInput.outputToken?.tokenInfo,
    );
  } else if (combinationSwapRouteInput?.mode == CombinationSwapMode.MANUAL) {
    return manualGetCombinationSwapRoutes(
      combinationSwapRouteInput.walletAddress,
      combinationSwapRouteInput.outputToken?.amount,
      combinationSwapRouteInput.outputToken?.tokenInfo,
      combinationSwapRouteInput.manualSwapTokenInputList,
    );
  } else {
    console.log("Cannot get combination swap routes");
    return [];
  }
}

export async function autoGetCombinationSwapRoutes(
  walletAddress: string,
  outputAmount: number,
  outputToken: TokenInfo,
): Promise<CombinationSwapRoute[]> {
  const outputMint = outputToken?.address;
  let walletBalance = await getWalletBalance(walletAddress, outputMint);

  walletBalance.sort((a, b) =>
    compareTokenBalance(a, b, outputMint, outputMint),
  );

  let combinationSwapRoutes: CombinationSwapRoute[] = [];
  for (const tokenBalance of walletBalance) {
    if (outputAmount <= 0) break;

    let tokenBalanceVsOutputMint =
      tokenBalance.balance * tokenBalance.price[outputMint];

    if (tokenBalance.address == outputMint) {
      let swapRoute: CombinationSwapRoute = {
        isSwapRoute: false,
        inputToken: {
          tokenInfo: tokenBalance,
          jupiterSwapRoute: null,
          amount:
            outputAmount - tokenBalanceVsOutputMint > 0
              ? tokenBalanceVsOutputMint
              : outputAmount,
        },
      };
      combinationSwapRoutes.push(swapRoute);
      outputAmount -= tokenBalanceVsOutputMint;
      continue;
    }

    let jupiterSwapRoutes = [];
    if (tokenBalanceVsOutputMint > outputAmount) {
      jupiterSwapRoutes = await jupiter.getSwapRoutesV4(
        tokenBalance.address,
        outputMint,
        multiplyBigNumbers(
          outputAmount,
          10 ** outputToken?.decimals || 0,
        ).toString(),
        "ExactOut",
        50,
      );
    } else {
      jupiterSwapRoutes = await jupiter.getSwapRoutesV4(
        tokenBalance.address,
        outputMint,
        multiplyBigNumbers(
          tokenBalance.balance,
          10 ** tokenBalance.decimals,
        ).toString(),
        "ExactIn",
        50,
      );
    }

    if (jupiterSwapRoutes.length > 0) {
      let swapRoute: CombinationSwapRoute = {
        isSwapRoute: true,
        inputToken: {
          tokenInfo: tokenBalance,
          jupiterSwapRoute: jupiterSwapRoutes[0],
          amount: divideBigNumbers(
            jupiterSwapRoutes[0]?.inAmount,
            10 ** tokenBalance.decimals,
          ).toNumber(),
        },
      };
      combinationSwapRoutes.push(swapRoute);
    }

    outputAmount -= tokenBalanceVsOutputMint;
  }

  if (outputAmount > 0) {
    console.log(
      `No balance left to swap for the rest of ${outputAmount} token ${outputMint}`,
    );
    return [];
  }
  return combinationSwapRoutes;
}

export async function manualGetCombinationSwapRoutes(
  walletAddress: string,
  outputAmount: number,
  outputToken: TokenInfo,
  manualSwapTokenInputList: ManualSwapTokenInput[],
): Promise<CombinationSwapRoute[]> {
  const outputMint = outputToken?.address;
  let combinationSwapRoutes: CombinationSwapRoute[] = [];
  for (const manualSwapTokenInput of manualSwapTokenInputList) {
    let inputToken = manualSwapTokenInput.inputToken;
    let swapAmount = manualSwapTokenInput.amount;

    if (inputToken?.address == outputMint) {
      let swapRoute: CombinationSwapRoute = {
        isSwapRoute: false,
        inputToken: {
          tokenInfo: inputToken,
          jupiterSwapRoute: null,
          amount: swapAmount,
        },
      };
      combinationSwapRoutes.push(swapRoute);
      continue;
    }

    let jupiterSwapRoute = await jupiter.getSwapRoutesV6(
      inputToken.address,
      outputMint,
      multiplyBigNumbers(swapAmount, 10 ** inputToken.decimals)
        ?.integerValue()
        .toString(),
      "ExactIn",
      100,
    );

    let swapRoute: CombinationSwapRoute = {
      isSwapRoute: true,
      inputToken: {
        tokenInfo: inputToken,
        jupiterSwapRoute: jupiterSwapRoute,
        amount: divideBigNumbers(
          jupiterSwapRoute?.inAmount,
          10 ** inputToken.decimals,
        )
          .toNumber()
          ?.toFixed(0),
      },
    };
    combinationSwapRoutes.push(swapRoute);
  }
  return combinationSwapRoutes;
}

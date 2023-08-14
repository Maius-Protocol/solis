import { VersionedTransaction } from "@solana/web3.js";
import {
  DepositVault,
  SwapAndDepositVaultInput,
  SwapAndDepositVaultResponse,
} from "../types/vault";
import { CombinationSwapRouteInput } from "../types/swap";
import { buildSwapTransactions } from "./buildSwapTransactions";
import { depositToMeteoraVault } from "./depositToMeteoraVault";
import shyft from "../adapters/shyft";
import { TokenInfo } from "@solana/spl-token-registry";
import { tokenMap } from "../constant/web3";

export async function swapAndDepositVault(
  input: SwapAndDepositVaultInput,
): Promise<SwapAndDepositVaultResponse> {
  const depositVaultToken = tokenMap.find(
    (token) => token.address === input?.depositMint,
  ) as TokenInfo;

  let combinationSwapRouteInput: CombinationSwapRouteInput = {
    walletAddress: input?.walletAddress,
    outputToken: {
      tokenInfo: depositVaultToken,
      amount: input?.amount,
    },
    manualSwapTokenInputList: input.manualSwapTokenInputList,
    mode: input?.mode,
  };

  let swapTxs: VersionedTransaction[] = await buildSwapTransactions(
    combinationSwapRouteInput,
  );

  let depositVault: DepositVault = {
    userPubkey: input?.walletAddress,
    depositToken: {
      tokenInfo: depositVaultToken,
      amount: input?.amount,
    },
  };

  let depositTx = await depositToMeteoraVault(depositVault);

  return [...swapTxs, depositTx];
}

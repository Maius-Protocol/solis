import {
  AddressLookupTableAccount,
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { DepositVault, SwapAndDepositVaultInput } from "../types/vault";
import { CombinationSwapRouteInput } from "../types/swap";
import { buildSwapTransactions } from "./buildSwapTransactions";
import { depositToMeteoraVault } from "./depositToMeteoraVault";
import { TokenInfo } from "@solana/spl-token-registry";
import { mainnetConnection, tokenMap } from "../constant/web3";
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";

export async function swapAndDepositVault(
  input: SwapAndDepositVaultInput,
): Promise<VersionedTransaction[]> {
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

  let ata = await getAssociatedTokenAddress(
    new PublicKey(input?.depositMint), // mint
    new PublicKey(input?.walletAddress), // owner
  );

  let createATAInstruction = await createAssociatedTokenAccountInstruction(
    new PublicKey(input?.walletAddress), // payer
    ata, // ata
    new PublicKey(input?.walletAddress), // owner
    new PublicKey(input?.depositMint), // mint
  );

  let swapTxOriginal = swapTxs[0];
  const addressLookupTableAccounts = await Promise.all(
    swapTxOriginal.message.addressTableLookups.map(async (lookup) => {
      return new AddressLookupTableAccount({
        key: lookup.accountKey,
        state: AddressLookupTableAccount.deserialize(
          await mainnetConnection
            .getAccountInfo(lookup.accountKey)
            .then((res) => {
              return res!.data;
            }),
        ),
      });
    }),
  );

  var message = TransactionMessage.decompile(swapTxOriginal.message, {
    addressLookupTableAccounts: addressLookupTableAccounts,
  });
  message.instructions.push(createATAInstruction);
  message.instructions.push(...depositTx.instructions);
  swapTxOriginal.message = message.compileToV0Message(
    addressLookupTableAccounts,
  );

  return [swapTxOriginal];
}

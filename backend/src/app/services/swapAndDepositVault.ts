import { VersionedTransaction } from "@solana/web3.js";
import { SwapAndDepositVaultInput, SwapAndDepositVaultResponse } from "../types/deposit";
import { buildSwapTransactions } from "./buildSwapTransactions";
import { depositToMeteoraVault } from "./depositToMeteoraVault";

export async function swapAndDepositVault(input: SwapAndDepositVaultInput): Promise<SwapAndDepositVaultResponse> {
    let resp: SwapAndDepositVaultResponse = {
        txs: []
    }
    let swapTxs: VersionedTransaction[] = await buildSwapTransactions(input)
    if (swapTxs) {
        resp.txs = swapTxs
    }
    let depositTx = await depositToMeteoraVault(input.depositVaultInfo)
    resp.txs.push(depositTx)

    return resp
}
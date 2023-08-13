import { VersionedTransaction } from "@solana/web3.js"
import { ManualSwapTokenInput, CombinationSwapMode } from "./swap"
import { DepositVault } from "./token"

export interface SwapAndDepositVaultInput {
    walletAddress: string,
    outputAmount: number,
    outputMint: string,
    manualSwapTokenInputList: ManualSwapTokenInput[]
    mode: CombinationSwapMode
    depositVaultInfo: DepositVault
}

export interface SwapAndDepositVaultResponse {
    txs: VersionedTransaction[]
}
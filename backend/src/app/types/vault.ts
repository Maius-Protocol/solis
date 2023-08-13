import { VersionedTransaction } from "@solana/web3.js"
import { ManualSwapTokenInput, CombinationSwapMode } from "./swap"
import { TokenInfo } from "./token"

export interface DepositVault {
    userPubkey: string;
    depositToken: {
        tokenInfo: TokenInfo,
        amount: number
    }
}

export interface WithdrawVault {
    publicKey: string;
    mint: string;
    amount: string;
}

export interface SwapAndDepositVaultInput {
    walletAddress: string,
    manualSwapTokenInputList: ManualSwapTokenInput[]
    mode: CombinationSwapMode
    depositMint: string;
    amount: number;
}

export interface SwapAndDepositVaultResponse {
    txs: VersionedTransaction[]
}
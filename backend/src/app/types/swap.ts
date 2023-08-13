import { TokenBalance } from "./token"

export enum CombinationSwapMode {
    AUTO = "auto",
    MANUAL = "manual"
}

export interface ManualSwapTokenInput {
    inputToken: TokenBalance,
    amount: number
}

export interface CombinationSwapRouteInput {
    walletAddress: string,
    outputAmount: number,
    outputMint: string,
    manualSwapTokenInputList: ManualSwapTokenInput[]
    mode: CombinationSwapMode
}

export interface CombinationSwapRoute {
    isSwapRoute: boolean,
    inputToken: {
        tokenInfo: any,
        jupiterSwapRoute: any,
        amount: number
    }
}
export enum CombinationSwapMode {
    AUTO = "auto",
    MANUAL = "manual"
}

export interface CombinationSwapRouteInput {
    walletAddress: string,
    outputAmount: number,
    outputMint: string,
    mode: CombinationSwapMode
}

export  interface CombinationSwapRoute {
    isSwapRoute: boolean,
    inputToken: {
        tokenInfo: any,
        jupiterSwapRoute: any,
        amount: number
    },
    order: number
}
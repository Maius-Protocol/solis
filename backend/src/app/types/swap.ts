import { TokenBalance, TokenInfo } from "./token";

export enum CombinationSwapMode {
  AUTO = "auto",
  MANUAL = "manual",
}

export interface ManualSwapTokenInput {
  inputToken: TokenBalance;
  amount: number;
}

export interface CombinationSwapRouteInput {
  walletAddress: string;
  outputToken: {
    tokenInfo: TokenInfo,
    amount: number,
  }
  manualSwapTokenInputList: ManualSwapTokenInput[];
  mode: CombinationSwapMode;
}

export interface CombinationSwapRoute {
  isSwapRoute: boolean,
  inputToken: {
    tokenInfo: any,
    jupiterSwapRoute: any,
    amount: number
  }
}
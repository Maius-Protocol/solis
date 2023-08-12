import {
  StaticTokenListResolutionStrategy,
  TokenInfo,
} from "@solana/spl-token-registry";

const tokenMapOriginal = new StaticTokenListResolutionStrategy().resolve();

export const findToken = (tokenAddress: string) => {
  return tokenMap.find((token) => token.address === tokenAddress);
};

export const tokenMap: TokenInfo[] = Array.from(tokenMapOriginal);

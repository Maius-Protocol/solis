import {
  StaticTokenListResolutionStrategy,
  TokenInfo,
} from "@solana/spl-token-registry";

const tokenMapOriginal = new StaticTokenListResolutionStrategy().resolve();
export const tokenMap: TokenInfo[] = Array.from(tokenMapOriginal);

import { mainnetConnection, tokenMap } from "@/app/constant/web3";
import { TokenInfo } from "@solana/spl-token-registry";
import VaultImpl from "@mercurial-finance/vault-sdk";

export async function createMeteoraVault(tokenMint: string) {
  const TOKEN_INFO = tokenMap.find(
    (token) => token.address === tokenMint,
  ) as TokenInfo;

  return await VaultImpl.create(mainnetConnection, TOKEN_INFO);
}

import { tokenVault } from "@/app/constant/web3";
import { createMeteoraVault } from "@/app/services/vault/createMeteoraVault";
import { PublicKey } from "@solana/web3.js";
import { UserVaultBalance } from "@/app/types/balance";

export async function getUserMeteoraVaultBalance(userWalletAddress: string) {
  const userVaultBalance: UserVaultBalance[] = [];
  await Promise.all(
    tokenVault.map(async (t: any) => {
      const vaultImpl = await createMeteoraVault(t);
      const userLpBalance = await vaultImpl.getUserBalance(
        new PublicKey(userWalletAddress),
      );
      const vaultUnlockedAmount = (
        await vaultImpl.getWithdrawableAmount()
      ).toNumber();
      //Calculate virtual price using the vault's unlocked amount and lp supply
      const virtualPrice = vaultUnlockedAmount / vaultImpl.lpSupply.toNumber();
      const lpTokenAmount = userLpBalance.toNumber();
      const realTokenAmount = lpTokenAmount * virtualPrice;
      userVaultBalance.push({
        token: t,
        realTokenAmount: realTokenAmount,
        lpTokenAmount: lpTokenAmount,
      });
    }),
  );

  return userVaultBalance;
}

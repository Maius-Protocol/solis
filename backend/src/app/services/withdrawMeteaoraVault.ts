import { WithdrawVault } from "@/app/types/token";
import { createMeteoraVault } from "@/app/services/createMeteoraVault";
import BN from "bn.js";
import { PublicKey } from "@solana/web3.js";

export async function withdrawMeteoraVault(withdrawVault: WithdrawVault) {
  const vaultImpl = await createMeteoraVault(withdrawVault.mint);

  const userLpBalance = await vaultImpl.getUserBalance(
    new PublicKey(withdrawVault.publicKey),
  );

  if (Number(withdrawVault.amount) <= userLpBalance.toNumber()) {
    const withdrawTx = await vaultImpl.withdraw(
      new PublicKey(withdrawVault.publicKey),
      new BN(withdrawVault.amount),
    );

    return withdrawTx;
  }

  return null;
}

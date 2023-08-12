import { DepositVault } from "@/app/types/token";
import { createMeteoraVault } from "@/app/services/createMeteoraVault";
import BN from "bn.js";
import { PublicKey } from "@solana/web3.js";

export async function depositToMeteoraVault(depositVault: DepositVault) {
  const vaultImpl = await createMeteoraVault(depositVault.mint);
  const depositTx = await vaultImpl.deposit(
    new PublicKey(depositVault.publicKey),
    new BN(depositVault.amount),
  );
  return depositTx;
}

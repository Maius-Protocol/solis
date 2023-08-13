import { DepositVault } from "@/app/types/token";
import { createMeteoraVault } from "@/app/services/createMeteoraVault";
import BN from "bn.js";
import { PublicKey, VersionedTransaction } from "@solana/web3.js";

export async function depositToMeteoraVault(depositVault: DepositVault): Promise<VersionedTransaction> {
  const vaultImpl = await createMeteoraVault(depositVault.mint);
  let meteoraDepositTxMeteora = await vaultImpl.deposit(
    new PublicKey(depositVault.publicKey),
    new BN(depositVault.amount),
  );
  let meteoraDepositTxBuf = meteoraDepositTxMeteora.serialize()
  let depositTx = VersionedTransaction.deserialize(meteoraDepositTxBuf)
  return depositTx;
}

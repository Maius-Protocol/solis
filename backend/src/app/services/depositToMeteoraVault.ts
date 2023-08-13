import { DepositVault } from "@/app/types/vault";
import { createMeteoraVault } from "@/app/services/createMeteoraVault";
import { PublicKey, VersionedTransaction } from "@solana/web3.js";
import { multiplyBigNumbers } from "../utils/utils";
import { BN } from "@project-serum/anchor";

export async function depositToMeteoraVault(depositVault: DepositVault): Promise<VersionedTransaction> {
  const vaultImpl = await createMeteoraVault(
    depositVault?.depositToken?.tokenInfo?.address
  );
  let meteoraDepositTx = await vaultImpl.deposit(
    new PublicKey(depositVault?.userPubkey),
    new BN(
      multiplyBigNumbers(
        depositVault?.depositToken?.amount,
        10 ** depositVault?.depositToken?.tokenInfo?.decimals).toString()
    ),
  );
  let meteoraDepositTxBuf = meteoraDepositTx.serialize({
    requireAllSignatures: false,
    verifySignatures: false,
  })
  let depositTx = VersionedTransaction.deserialize(meteoraDepositTxBuf)

  return depositTx;
}

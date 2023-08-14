import { WithdrawVault } from "@/app/types/vault";
import { createMeteoraVault } from "@/app/services/vault/createMeteoraVault";
import BN from "bn.js";
import { PublicKey, Transaction } from "@solana/web3.js";
import { multiplyBigNumbers } from "@/app/utils/utils";

export async function withdrawMeteoraVault(
  withdrawVault: WithdrawVault,
): Promise<Transaction> {
  const vaultImpl = await createMeteoraVault(
    withdrawVault?.withdrawToken?.tokenInfo?.address,
  );

  const userLpBalance = await vaultImpl.getUserBalance(
    new PublicKey(withdrawVault.userPubkey),
  );

  if (withdrawVault?.withdrawToken.amount <= userLpBalance.toNumber()) {
    const withdrawTx = await vaultImpl.withdraw(
      new PublicKey(withdrawVault?.userPubkey),
      new BN(
        multiplyBigNumbers(
          withdrawVault?.withdrawToken.amount,
          10 ** withdrawVault?.withdrawToken?.tokenInfo?.decimals,
        )
          ?.toNumber()
          ?.toFixed(0)
          .toString(),
      ),
    );
    return withdrawTx;
  }

  return null;
}

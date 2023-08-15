import { mainnetConnection, tokenMap } from "@/app/constant/web3";
import { WithdrawInput, WithdrawVault } from "@/app/types/vault";
import { TokenInfo } from "@solana/spl-token-registry";
import { PublicKey } from "@solana/web3.js";
import { withdrawMeteoraVault } from "../vault/withdrawMeteoraVault";

export async function withdraw(input: WithdrawInput): Promise<string> {
  let encodedWithdrawTx;

  const withdrawVaultToken = tokenMap.find(
    (token) => token.address === input?.vaultTokenMint,
  ) as TokenInfo;

  let withdrawVault: WithdrawVault = {
    userPubkey: input.walletAddress,
    withdrawToken: {
      tokenInfo: withdrawVaultToken,
      amount: input.amount,
    },
  };
  let withdrawVaultTx = await withdrawMeteoraVault(withdrawVault);

  withdrawVaultTx.feePayer = new PublicKey(input.walletAddress);
  withdrawVaultTx.recentBlockhash = (
    await mainnetConnection.getLatestBlockhash()
  ).blockhash;
  let withdrawTxBuf = withdrawVaultTx.serialize({
    requireAllSignatures: false,
    verifySignatures: false,
  });

  encodedWithdrawTx = withdrawTxBuf.toString("base64");

  return encodedWithdrawTx;
}

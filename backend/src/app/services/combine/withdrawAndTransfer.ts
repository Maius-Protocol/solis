import { mainnetConnection, tokenMap } from "@/app/constant/web3";
import { WithdrawAndTransferInput, WithdrawVault } from "@/app/types/vault";
import { TokenInfo } from "@solana/spl-token-registry";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { withdrawMeteoraVault } from "../vault/withdrawMeteoraVault";
import { multiplyBigNumbers } from "@/app/utils/utils";
import { SOL_ADDRESS } from "../../../../env";
import {
  TOKEN_PROGRAM_ID,
  createTransferInstruction,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";

export async function withdrawAndTransfer(
  input: WithdrawAndTransferInput,
): Promise<string> {
  let withdrawAndTransferTx = new Transaction();
  let encodedWithdrawAndTransferTx;

  const withdrawVaultToken = tokenMap.find(
    (token) => token.address === input?.vaultTokenMint,
  ) as TokenInfo;

  if (input) {
    let withdrawVault: WithdrawVault = {
      userPubkey: input.sender,
      withdrawToken: {
        tokenInfo: withdrawVaultToken,
        amount: input.amount,
      },
    };
    let withdrawVaultTx = await withdrawMeteoraVault(withdrawVault);
    if (input?.vaultTokenMint === SOL_ADDRESS) {
      let transferInstruction = SystemProgram.transfer({
        fromPubkey: new PublicKey(input.sender),
        toPubkey: new PublicKey(input.receiver),
        lamports: Number(
          multiplyBigNumbers(input.amount, 10 ** 9)
            ?.toNumber()
            ?.toFixed(0),
        ),
      });
      withdrawAndTransferTx.add(withdrawVaultTx);
      withdrawAndTransferTx.add(transferInstruction);
    } else {
      const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        mainnetConnection,
        new PublicKey(input.sender),
        new PublicKey(input.vaultTokenMint),
        new PublicKey(input.sender),
      );
      const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        mainnetConnection,
        new PublicKey(input.receiver),
        new PublicKey(input.vaultTokenMint),
        new PublicKey(input.receiver),
      );

      let transferInstruction = createTransferInstruction(
        fromTokenAccount.address, // source
        toTokenAccount.address, // dest
        new PublicKey(input.sender),
        Number(
          multiplyBigNumbers(input.amount, 10 ** withdrawVaultToken.decimals)
            ?.toNumber()
            ?.toFixed(0),
        ),
        [],
        TOKEN_PROGRAM_ID,
      );
      withdrawAndTransferTx.add(withdrawVaultTx);
      withdrawAndTransferTx.add(transferInstruction);
    }
  }
  console.log(withdrawAndTransferTx);
  withdrawAndTransferTx.feePayer = new PublicKey(input.sender);
  withdrawAndTransferTx.recentBlockhash = (
    await mainnetConnection.getLatestBlockhash()
  ).blockhash;
  let withdrawAndTransferTxBuf = withdrawAndTransferTx.serialize({
    requireAllSignatures: false,
    verifySignatures: false,
  });

  encodedWithdrawAndTransferTx = withdrawAndTransferTxBuf.toString("base64");

  return encodedWithdrawAndTransferTx;
}

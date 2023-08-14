import { mainnetConnection, tokenMap } from "@/app/constant/web3";
import { WithdrawAndBuyNftInput, WithdrawVault } from "@/app/types/vault";
import { TokenInfo } from "@solana/spl-token-registry";
import { PublicKey, Transaction } from "@solana/web3.js";
import { withdrawMeteoraVault } from "../vault/withdrawMeteoraVault";
import { buyNftWithTensorSwap } from "../nft/buyNftWithTensorswap";
import { BuyNFTListing } from "@/app/types/token";
import { multiplyBigNumbers } from "@/app/utils/utils";

export async function withdrawAndBuyNft(
  input: WithdrawAndBuyNftInput,
): Promise<string> {
  let withdrawAndBuyNftTx = new Transaction();
  let encodedWithdrawAndBuyNftTx;

  const withdrawVaultToken = tokenMap.find(
    (token) => token.address === input?.vaultTokenMint,
  ) as TokenInfo;

  if (input) {
    let withdrawVault: WithdrawVault = {
      userPubkey: input.walletAddress,
      withdrawToken: {
        tokenInfo: withdrawVaultToken,
        amount: input.nftPrice,
      },
    };
    let withdrawVaultTx = await withdrawMeteoraVault(withdrawVault);

    let buyNftListing: BuyNFTListing = {
      owner: input.nftOwner,
      maxPrice: multiplyBigNumbers(input.nftPrice, 10 ** 9)
        ?.toNumber()
        ?.toFixed(0)
        .toString(),
      buyer: input.walletAddress,
      mint: input.nftMint,
    };

    let buyNftTx = await buyNftWithTensorSwap(buyNftListing);
    if (withdrawVaultTx?.instructions?.length === 0) {
      throw Error("Loi");
    }
    if (buyNftTx?.instructions?.length === 0) {
      throw Error("Loi");
    }
    withdrawAndBuyNftTx.add(withdrawVaultTx);
    withdrawAndBuyNftTx.add(buyNftTx);
  }
  console.log(withdrawAndBuyNftTx.instructions);
  withdrawAndBuyNftTx.feePayer = new PublicKey(input.walletAddress);
  withdrawAndBuyNftTx.recentBlockhash = (
    await mainnetConnection.getLatestBlockhash()
  ).blockhash;
  let withdrawAndBuyNftTxBuf = withdrawAndBuyNftTx.serialize({
    requireAllSignatures: false,
    verifySignatures: false,
  });

  encodedWithdrawAndBuyNftTx = withdrawAndBuyNftTxBuf.toString("base64");

  return encodedWithdrawAndBuyNftTx;
}

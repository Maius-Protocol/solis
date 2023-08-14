import { useMutation } from "@tanstack/react-query";
import axiosInstance, { ApiRoutes } from "../util/axiosInstance";
import useUserMeteoraVaultBalance from "./useUserMeteoraVaultBalance";

function useWithdrawAndBuyNft(userWalletAddress) {
  const { data: vaults } = useUserMeteoraVaultBalance(userWalletAddress!);

  return useMutation(({ nftPrice, nftOwner, nftMint }) => {
    return axiosInstance.post(ApiRoutes.withdrawAndBuy, {
      walletAddress: userWalletAddress,
      vaultTokenMint: "So11111111111111111111111111111111111111112",
      nftPrice: nftPrice,
      nftOwner: nftOwner,
      nftMint: nftMint,
    });
  });
}

export default useWithdrawAndBuyNft;

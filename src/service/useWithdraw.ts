import { useMutation } from "@tanstack/react-query";
import axiosInstance, { ApiRoutes } from "../util/axiosInstance";

function useWithdraw() {
  return useMutation(({ userWalletAddress, vaultTokenMint, amount }) => {
    return axiosInstance.post(ApiRoutes.withdraw, {
      walletAddress: userWalletAddress,
      vaultTokenMint: vaultTokenMint,
      amount: amount,
    });
  });
}

export default useWithdraw;

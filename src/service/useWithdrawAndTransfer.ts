import { useMutation } from "@tanstack/react-query";
import axiosInstance, { ApiRoutes } from "../util/axiosInstance";

function useWithdrawAndTransfer() {
  return useMutation(({ sender, vaultTokenMint, amount, receiver }) => {
    return axiosInstance.post(ApiRoutes.withdrawAndTransfer, {
      sender,
      vaultTokenMint,
      amount,
      receiver,
    });
  });
}

export default useWithdrawAndTransfer;

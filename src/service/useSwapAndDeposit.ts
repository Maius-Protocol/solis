import { useMutation } from "@tanstack/react-query";
import axiosInstance, { ApiRoutes } from "../util/axiosInstance";
import { sumBy } from "lodash";

interface useSwapAndDepositInput {
  swaps: any[];
}

function useSwapAndDeposit(userWalletAddress: string, depositMint: string) {
  return useMutation<unknown, unknown, useSwapAndDepositInput>(({ swaps }) => {
    return axiosInstance.post(ApiRoutes.swapAndDeposit, {
      walletAddress: userWalletAddress,
      amount: sumBy(swaps, "amount"),
      depositMint: depositMint,
      manualSwapTokenInputList: swaps?.map((e) => {
        return {
          inputToken: {
            address: e?.address,
            decimals: e?.decimals,
            ...e?.tokenInfo,
          },
          amount:
            depositMint === e?.address
              ? 0
              : e?.amount?.toPrecision(e?.decimals),
        };
      }),
      mode: "manual",
    });
  });
}

export default useSwapAndDeposit;

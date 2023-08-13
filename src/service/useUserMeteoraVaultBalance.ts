import { useQuery } from "@tanstack/react-query";
import { SOLIS_BACKEND_URL } from "../constants/url";
import axios from "axios";
import axiosInstance, { ApiRoutes } from "../util/axiosInstance";

function useUserMeteoraVaultBalance(userWalletAddress: string) {
  return useQuery(
    ["meteora-balance", userWalletAddress],
    async () => {
      const data = (
        await axiosInstance.get(
          ApiRoutes.userMeteoraVaultBalance(userWalletAddress),
        )
      )?.data;
      return data.data.filter((d: any) => d.realTokenAmount > 0);
    },
    {
      enabled: !!userWalletAddress,
    },
  );
}
export default useUserMeteoraVaultBalance;

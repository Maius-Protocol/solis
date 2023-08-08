import { useQuery } from "@tanstack/react-query";
import { SOLIS_BACKEND_URL } from "../constants/url";
import axios from "axios";

function useUserMeteoraVaultBalance(userWalletAddress: string) {
  return useQuery(["meteora-balance", userWalletAddress], async () => {
    const data = (
      await axios.get(
        `${SOLIS_BACKEND_URL}/api/vault?address=${userWalletAddress}`,
      )
    )?.data;
    return data.data.filter((d: any) => d.realTokenAmount > 0);
  });
}
export default useUserMeteoraVaultBalance;

import { useQuery } from "@tanstack/react-query";
import axiosInstance, { ApiRoutes } from "../util/axiosInstance";

export interface IWalletResponse {
  data: Daum[];
}

export interface Daum {
  address: string;
  balance: number;
  symbol: string;
  decimals: number;
  price: Price;
  image: string;
}

export interface Price {
  usd: number;
  USDC: number;
}

const mockData = {
  data: {
    data: [
      {
        address: "So11111111111111111111111111111111111111112",
        balance: 0,
        symbol: "SOL",
        decimals: 9,
        price: {
          usd: 24.4580349,
          USDC: 24.4580349,
        },
        image:
          "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png",
      },
    ],
  },
};

function useWalletBalance(publicKey?: string) {
  return useQuery(
    ["wallet-balance", publicKey],
    () => {
      return mockData;
      return axiosInstance.get<IWalletResponse>(ApiRoutes.walletBalance, {
        params: {
          address: publicKey,
          vsToken: "USDC",
        },
      });
    },
    {
      enabled: !!publicKey && publicKey !== "",
    },
  );
}

export default useWalletBalance;

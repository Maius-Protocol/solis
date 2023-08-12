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

function useWalletBalance(publicKey: string | undefined, vsToken: string) {
  return useQuery(
    ["wallet-balance", publicKey, vsToken],
    () => {
      // if (enableMock) {
      //   return mockData;
      // }
      return axiosInstance.get<IWalletResponse>(ApiRoutes.walletBalance, {
        params: {
          address: publicKey,
          vsToken: vsToken,
        },
      });
    },
    {
      enabled: !!publicKey && publicKey !== "" && !!vsToken && vsToken !== "",
    },
  );
}

const mockData = {
  data: {
    data: [
      {
        address: "So11111111111111111111111111111111111111112",
        balance: 4.40634204,
        symbol: "SOL",
        decimals: 9,
        price: {
          usd: 24.597600505,
          So11111111111111111111111111111111111111112: 1,
        },
        image:
          "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png",
      },
      {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        balance: 10,
        symbol: "USDC",
        decimals: 6,
        price: {
          usd: 1,
          So11111111111111111111111111111111111111112: 0.040657237,
        },
        image:
          "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
      },
    ],
  },
};

export default useWalletBalance;

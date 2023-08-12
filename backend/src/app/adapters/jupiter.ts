import base from "@/app/adapters/base";
import { JUPITER_PRICE_API, JUPITER_QUOTE_API } from "../../../env";

const priceApi = base.url(JUPITER_PRICE_API, true);
const quoteApi = base.url(JUPITER_QUOTE_API, true);

export default {
  getTokenPrice: (mintAddress: string, vsToken: string = "USDC") => {
    return priceApi
      .url(`/price?ids=${mintAddress}&vsToken=${vsToken}`)
      .get()
      .json<any>((r) => r.data);
  },

  getSwapRoutesV4: (inputMint: string, outputMint: string, amount: number, swapMode: string = "ExactIn", slippageBps: number) => {
    return quoteApi.url(`/v4/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&swapMode=${swapMode}&slippageBps=${slippageBps}`)
      .get()
      .json<any[]>((r) => r.data);
  },

  getSwapRoutesV6: (inputMint: string, outputMint: string, amount: number, swapMode: string = "ExactIn", slippageBps: number) => {
    return quoteApi.url(`/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&swapMode=${swapMode}&slippageBps=${slippageBps}`)
      .get()
      .json<any>((r) => r);
  },

  buildSwapTxV4: (swapRoute: any) => {
    return quoteApi.url(`/v4/swap`)
      .post(swapRoute)
      .json<any>((r) => r);
  },

  buildSwapTxV6: (swapRoute: any) => {
    return quoteApi.url(`/v6/swap`)
      .post(swapRoute)
      .json<any>((r) => r);
  }
};

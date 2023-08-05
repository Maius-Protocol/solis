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

  getSingleSwapRoute: (inputMint: string, outputMint: string, amount: number, slippageBps: number) => {
    return quoteApi.url(`/quote?
          inputMint=${inputMint}&
          outputMint=${outputMint}&
          amount=${amount}&
          slippageBps=${slippageBps}`)
      .get()
      .json<any>((r) => r.data);
  }
};

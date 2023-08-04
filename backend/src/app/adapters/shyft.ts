import base from "@/app/adapters/base";
import { SHYFT_API, SHYFT_API_KEY } from "../../../env";

const api = base.url(SHYFT_API, true);

export default {
  getTokenBalance: (walletAddress: string) => {
    return api
      .url(`/wallet/all_tokens?network=mainnet-beta&wallet=${walletAddress}`)
      .headers({ "x-api-key": SHYFT_API_KEY })
      .get()
      .json<any>((r) => r.result);
  },
  getSolBalance: (walletAddress: string) => {
    return api
      .url(`/wallet/balance?network=mainnet-beta&wallet=${walletAddress}`)
      .headers({ "x-api-key": SHYFT_API_KEY })
      .get()
      .json<any>((r) => r.result);
  },
};

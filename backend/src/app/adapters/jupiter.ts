import base from "@/app/adapters/base";
import { JUPITER_PRICE_API } from "../../../env";

const api = base.url(JUPITER_PRICE_API, true);

export default {
  getTokenPrice: (mintAddress: string) => {
    return api
      .url(`/price?ids=${mintAddress}`)
      .get()
      .json<any>((r) => r.data);
  },
};

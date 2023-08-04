import base from "@/app/adapters/base";
import { JUPYTER_API } from "../../../env";

const api = base.url(JUPYTER_API, true);

export default {
  getTokenPrice: (mintAddress: string) => {
    return api
      .url(`/price?ids=${mintAddress}`)
      .get()
      .json<any>((r) => r.data);
  },
};

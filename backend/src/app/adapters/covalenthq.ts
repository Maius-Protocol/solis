import base from "@/app/adapters/base";
import {COVALENT_API_KEYS, COVALENTHQ_API} from "../../../env";

const api = base.url(COVALENTHQ_API, true);

export default {
    getTokenBalance:  (walletAddress: string) => {
    return api
        .url(`/address/${walletAddress}/balances_v2/?`)
        .headers({'Authorization': `Bearer ${COVALENT_API_KEYS}`})
        .get()
        .json<any>((r) => r.data);
},
}

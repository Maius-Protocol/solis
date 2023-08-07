import { useQuery } from "@tanstack/react-query";
import { METEORA_VAULT_INFO } from "../constants/url";
import axios from "axios";
import { orderBy } from "lodash";

function useMeteoraVaultsInfo() {
  return useQuery(["meteora", "vaults"], async () => {
    const _data = (await axios.get(METEORA_VAULT_INFO))?.data;
    return orderBy(_data, ["closest_apy"], ["desc"]);
  });
}
export default useMeteoraVaultsInfo;

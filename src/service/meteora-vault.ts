import axios from "axios";
import { METEORA_VAULT_INFO } from "../constants/url";

export const getAllVaultInfo = async () => {
  const { data } = await axios.get(METEORA_VAULT_INFO);
  return data;
};

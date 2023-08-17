import axios from "axios";
import { SOLIS_BACKEND_URL } from "../constants/url";

const axiosInstance = axios.create({
  baseURL: SOLIS_BACKEND_URL + "/api",
});

export const ApiRoutes = {
  walletBalance: "/token",
  userMeteoraVaultBalance: (userWalletAddress: string) =>
    `/vault?address=${userWalletAddress}`,
  swapAndDeposit: "vault/deposit",
  sendAndConfirm: "transaction/send-and-confirm",
  listCollection: "/tensor/collections",
  activeListing: (slug: string) => `/tensor/listing?slug=${slug}`,
  withdrawAndBuy: "vault/buy",
  withdraw: "vault/withdraw",
  withdrawAndTransfer: "vault/transfer",
};

export default axiosInstance;

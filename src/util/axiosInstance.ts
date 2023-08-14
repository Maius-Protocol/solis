import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const ApiRoutes = {
  walletBalance: "/token",
  userMeteoraVaultBalance: (userWalletAddress: string) =>
    `/vault?address=${userWalletAddress}`,
  swapAndDeposit: "vault/deposit",
  sendAndConfirm: "transaction/send-and-confirm",
  listCollection: "/tensor/collections",
  activeListing: (slug: string) => `/tensor/listing?slug=${slug}`,
};

export default axiosInstance;

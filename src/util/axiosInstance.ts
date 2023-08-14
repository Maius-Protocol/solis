import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const ApiRoutes = {
  walletBalance: "/token",
  userMeteoraVaultBalance: (userWalletAddress: string) =>
    `/vault?address=${userWalletAddress}`,
  swapAndDeposit: "vault/deposit",
  sendAndConfirm: "transaction/send-and-confirm",
};

export default axiosInstance;

import shyft from "@/app/adapters/shyft";
import jupyter from "@/app/adapters/jupyter";
import { SOL_ADDRESS, SOL_DECIMALS, SOL_LOGO } from "../../../env";

export async function getWalletBalance(walletAddress: string) {
  const walletBalance = [];
  const solBalance = await shyft.getSolBalance(walletAddress);
  const solData = await jupyter.getTokenPrice(SOL_ADDRESS);
  const solPrice = Object.keys(solData).map((key) => solData[key]);

  walletBalance.push({
    address: SOL_ADDRESS,
    balance: solBalance.balance,
    symbol: "SOL",
    decimals: SOL_DECIMALS,
    price: solPrice[0].price,
    image: SOL_LOGO,
  });

  const tokenBalances = await shyft.getTokenBalance(walletAddress);
  await Promise.all(
    tokenBalances.map(async (t: any) => {
      if (t.balance > 0) {
        const data = await jupyter.getTokenPrice(t.address);
        const tokenPrice = Object.keys(data).map((key) => data[key]);
        walletBalance.push({
          address: t.address,
          balance: t.balance,
          symbol: t.info?.symbol,
          decimals: t.info?.decimals,
          price: tokenPrice[0].price,
          image: t.info?.image,
        });
      }
    }),
  );

  return walletBalance;
}

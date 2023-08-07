import shyft from "@/app/adapters/shyft";
import jupiter from "@/app/adapters/jupiter";
import { SOL_ADDRESS, SOL_DECIMALS, SOL_LOGO } from "../../../env";
import { TokenPrice, TokenBalance } from "@/app/types/token";

export async function getWalletBalance(walletAddress: string, vsToken: string = "USDC") {
  const walletBalance = [];
  const solBalance = await shyft.getSolBalance(walletAddress);

  const solDataVsUSD = await jupiter.getTokenPrice(SOL_ADDRESS);
  const solPriceVsUSD = Object.keys(solDataVsUSD).map((key) => solDataVsUSD[key]);

  let solPrice: TokenPrice = {
    "usd": solPriceVsUSD[0]?.price || 0,
  }

  if (vsToken) {
    const solDataVsToken = await jupiter.getTokenPrice(SOL_ADDRESS, vsToken);
    const solPriceVsToken = Object.keys(solDataVsToken).map((key) => solDataVsToken[key]);
    solPrice[vsToken] = solPriceVsToken[0]?.price || 0
  }

  walletBalance.push({
    address: SOL_ADDRESS,
    balance: solBalance.balance || 0,
    symbol: "SOL",
    decimals: SOL_DECIMALS,
    price: solPrice,
    image: SOL_LOGO,
  });

  const tokenBalances = await shyft.getTokenBalance(walletAddress);
  await Promise.all(
    tokenBalances.map(async (t: any) => {
      if (t.balance > 0) {
        const priceVsUSDData = await jupiter.getTokenPrice(t.address);
        const priceVsUSD = Object.keys(priceVsUSDData).map((key) => priceVsUSDData[key]);

        // ignore tokens do not have price
        if (!priceVsUSD[0]?.price) {
          return
        }

        let tokenPrice: TokenPrice = {
          "usd": priceVsUSD[0]?.price,
        }

        if (vsToken) {
          const priceVsTokenData = await jupiter.getTokenPrice(t.address, vsToken);
          const priceVsToken = Object.keys(priceVsTokenData).map((key) => priceVsTokenData[key]);
          if (!priceVsToken[0]?.price) {
            return
          }
          tokenPrice[vsToken] = priceVsToken[0]?.price
        }
        walletBalance.push({
          address: t.address,
          balance: t.balance || 0,
          symbol: t.info?.symbol,
          decimals: t.info?.decimals || 0,
          price: tokenPrice,
          image: t.info?.image,
        });
      }
    }),
  );

  return walletBalance;
}

export function compareTokenBalance(a: TokenBalance, b: TokenBalance, key: string, firstTokenAddress: string): number {
  if (firstTokenAddress) {
    // Specific token should be placed first
    if (a?.address == firstTokenAddress) {
      return -1;
    }
    if (b?.address == firstTokenAddress) {
      return 1;
    }
  }
  const aValue = a.balance * a.price[key];
  const bValue = b.balance * b.price[key];
  return bValue - aValue;
}
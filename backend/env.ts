import dotenv from "dotenv";
dotenv.config();

export const SHYFT_API = process.env.SHYFT_API || "https://api.shyft.to/sol/v1";
export const SHYFT_API_KEY = process.env.SHYFT_API_KEY || console.log("Missing environment variable: SHYFT_API_KEY");

export const JUPITER_PRICE_API = process.env.JUPITER_PRICE_API || "https://price.jup.ag/v4";

export const JUPITER_QUOTE_API = process.env.JUPITER_QUOTE_API || "https://quote-api.jup.ag/v4";

export const SOL_ADDRESS = "So11111111111111111111111111111111111111112";

export const SOL_DECIMALS = 9;

export const SOL_LOGO =
  "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png";

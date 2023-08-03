import dotenv from "dotenv";
dotenv.config();

export const COVALENTHQ_API = process.env.COVALENTHQ_API || "https://api.covalenthq.com/v1/solana-mainnet";
export const COVALENT_API_KEYS = process.env.COVALENT_API_KEYS || "";

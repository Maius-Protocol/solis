import { StaticTokenListResolutionStrategy } from "@solana/spl-token-registry";
import { Connection } from "@solana/web3.js";

export const mainnetConnection = new Connection(
  "https://api.mainnet-beta.solana.com",
);

export const tokenMap = new StaticTokenListResolutionStrategy().resolve();

export const tokenVault = [
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "So11111111111111111111111111111111111111112",
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
  "7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT",
  "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
  "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
];

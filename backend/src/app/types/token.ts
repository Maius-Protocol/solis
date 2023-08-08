export interface TokenPrice {
  [key: string]: any;
}

export interface TokenBalance {
  address: string;
  balance: any;
  symbol: string;
  decimals: number;
  price: TokenPrice;
  image: string;
}

export interface DepositVault {
  publicKey: string;
  mint: string;
  amount: string;
  decimals: number;
}

export interface TokenPrice {
  [key: string]: any;
}

export interface TokenBalance {
    address: string;
    balance: number;
    symbol: string;
    decimals: number;
    price: TokenPrice;
    image: string;
}

export interface DepositVault {
  publicKey: string;
  mint: string;
  amount: string;
}

export interface WithdrawVault {
  publicKey: string;
  mint: string;
  amount: string;
}

export interface BuyNFTListing {
  owner: string;
  maxPrice: string;
  buyer: string;
  mint: string;
}

export interface ActiveListing {
  mint: string;
  seller: string;
  price: string;
  unit: string;
  metadata: any;
}

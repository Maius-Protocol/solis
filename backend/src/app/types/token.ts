export interface TokenPrice {
  [key: string]: any;
}

export interface TokenBalance {
  name: string;
  address: string;
  balance: number;
  symbol: string;
  decimals: number;
  price: TokenPrice;
  image: string;
}

export interface TokenInfo {
  name: string;
  address: string;
  symbol: string;
  decimals: number;
  logoURI?: string;
}

export interface BuyNFTListing {
  owner: string;
  maxPrice: string; // lamports
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

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

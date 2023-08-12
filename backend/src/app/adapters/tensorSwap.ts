import base from "@/app/adapters/base";
import { TENSOR_SWAP_API, TENSOR_SWAP_API_KEY } from "../../../env";

const api = base.url(TENSOR_SWAP_API, true);

export default {
  buyNftListing: (
    owner: string,
    maxPrice: string,
    buyer: string,
    mint: string,
  ) => {
    return api
      .url("/")
      .headers({ "X-TENSOR-API-KEY": TENSOR_SWAP_API_KEY || "" })
      .post({
        query: `query TswapBuySingleListingTx(
                  $buyer: String!
                  $maxPrice: Decimal!
                  $mint: String!
                  $owner: String!
                ) {
                  tswapBuySingleListingTx(
                    buyer: $buyer
                    maxPrice: $maxPrice
                    mint: $mint
                    owner: $owner
                  ) {
                    txs {
                      lastValidBlockHeight
                      tx
                    }
                  }
                }`,
        variables: {
          buyer: buyer,
          maxPrice: maxPrice,
          mint: mint,
          owner: owner,
        },
      })
      .json<any>((r) => r.data);
  },
  listSingleNft: (owner: string, price: string, mint: string) => {
    return api
      .url("/")
      .headers({ "X-TENSOR-API-KEY": TENSOR_SWAP_API_KEY || "" })
      .post({
        query: `query TswapListNftTx($mint: String!, $owner: String!, $price: Decimal!) {
                  tswapListNftTx(mint: $mint, owner: $owner, price: $price) {
                    txs {
                      lastValidBlockHeight
                      tx
                    }
                  }
                }`,
        variables: {
          mint: mint,
          owner: owner,
          price: price,
        },
      })
      .json<any>((r) => r.data);
  },
  getActiveListing: (slug: string) => {
    return api
      .url("/")
      .headers({ "X-TENSOR-API-KEY": TENSOR_SWAP_API_KEY || "" })
      .post({
        query: `query ActiveListingsV2(
                  $slug: String!
                  $sortBy: ActiveListingsSortBy!
                  $filters: ActiveListingsFilters
                  $limit: Int
                  $cursor: ActiveListingsCursorInputV2
                ) {
                  activeListingsV2(
                    slug: $slug
                    sortBy: $sortBy
                    filters: $filters
                    limit: $limit
                    cursor: $cursor
                  ) {
                    page {
                      endCursor {
                        str
                      }
                      hasMore
                    }
                    txs {
                      mint {
                        onchainId
                        metadataUri
                        imageUri
                      }
                      tx {
                        sellerId
                        grossAmount
                        grossAmountUnit
                      }
                    }
                  }
                }`,
        variables: {
          slug: slug,
          sortBy: "PriceAsc",
          filters: {
            sources: ["TENSORSWAP"],
          },
          limit: 100,
          cursor: null,
        },
      })
      .json<any>((r) => r.data);
  },
  getInstrument: (slug: string) => {
    return api
      .url("/")
      .headers({ "X-TENSOR-API-KEY": TENSOR_SWAP_API_KEY || "" })
      .post({
        query: `query Instrument($slug: String!) {
                  instrumentTV2(slug: $slug) {
                    id
                    slug
                    slugDisplay
                    creator
                    name
                    symbol
                    imageUri
                    description
                  }
                }
                `,
        variables: {
          slug: slug,
        },
      })
      .json<any>((r) => r.data);
  },
};

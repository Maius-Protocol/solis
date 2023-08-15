import { useQuery } from "@tanstack/react-query";
import axiosInstance, { ApiRoutes } from "../util/axiosInstance";

function useActiveListing(slug: string) {
  return useQuery(
    ["active-listing", slug],
    async () => {
      return [
        {
          mint: "dbMieB7iGAFdkK9ViPY5TiL6Y41Zd3Q3fqQSXAjf8Qa",
          price: "4200000000",
          seller: "FYoKMZn9LsBqvgfQQbaLYumWUQCG5dJ63azKNb3CfwTE",
          unit: "SOL_LAMPORT",
          metadata: {
            name: "In the beginning...",
            symbol: "URS",
            description:
              '[XtillGood: 10 Editions] - The Underground Royalty Society Gen 1 Release: "In the beginning..."',
            seller_fee_basis_points: 1500,
            image:
              "https://www.arweave.net/Er9gzs9Ec-y0J41S5aXdhhq2waARTna9vg-10jP4_yY?ext=jpg",
            attributes: [
              {
                trait_type: "Artist",
                value: "XtillGood",
              },
            ],
            external_url: "",
            collection: {
              family: "URS: Airdrops",
              name: "URS: In The Beginning",
            },
            properties: {
              files: [
                {
                  uri: "https://www.arweave.net/Er9gzs9Ec-y0J41S5aXdhhq2waARTna9vg-10jP4_yY?ext=jpg",
                  type: "image/jpg",
                },
              ],
              category: "image",
              creators: [
                {
                  address: "JDuvzCZG7dV6nDjKPRvSvBqogVeMz86pQAo7LtGcgnNc",
                  share: 75,
                },
                {
                  address: "43sZtqxj2FNq3umsVeumcxhHUs5BPu5thyeMPMkm1oK1",
                  share: 25,
                },
              ],
            },
          },
        },
        {
          mint: "9pRDnTzRDgcJeKLPh1TSrgh3iPg9VziH95MJTtgCmHZi",
          price: "700000000",
          seller: "EjSUh8D9zAB9zXCLR4wtrxkWpzHFhJULsSLoi8pAE9kJ",
          unit: "SOL_LAMPORT",
          metadata: {
            name: "In the beginning...",
            symbol: "URS",
            description:
              '[virkkk #8] - The Underground Royalty Society Gen 1 Release: "In the beginning..."',
            seller_fee_basis_points: 1500,
            image:
              "https://www.arweave.net/iZl210l9bOU5tE6yUQoxbTiLNYJ9DDsHSLGycw8KndA?ext=png",
            attributes: [
              {
                trait_type: "Artist",
                value: "virkkk",
              },
            ],
            external_url: "",
            collection: {
              family: "URS: Airdrops",
              name: "URS: In The Beginning",
            },
            properties: {
              files: [
                {
                  uri: "https://www.arweave.net/iZl210l9bOU5tE6yUQoxbTiLNYJ9DDsHSLGycw8KndA?ext=png",
                  type: "image/png",
                },
              ],
              category: "image",
              creators: [
                {
                  address: "337dSgVY3zpNWiVcUeuw9xHXN4dgXmuR9JaWnaWwc9Bp",
                  share: 75,
                },
                {
                  address: "43sZtqxj2FNq3umsVeumcxhHUs5BPu5thyeMPMkm1oK1",
                  share: 25,
                },
              ],
            },
          },
        },
        {
          mint: "CZV9yYjqgX5YGt4xDxipMvHxuFAVsgj12w7HG4Z1Q1Cn",
          price: "720000000",
          seller: "FYoKMZn9LsBqvgfQQbaLYumWUQCG5dJ63azKNb3CfwTE",
          unit: "SOL_LAMPORT",
          metadata: {
            name: "In the beginning...",
            symbol: "URS",
            description:
              '[Hwang: 10 Editions] - The Underground Royalty Society Gen 1 Release: "In the beginning..."',
            seller_fee_basis_points: 1500,
            image:
              "https://www.arweave.net/30CfSj5FFTypM64AsuE9MOXc24dM9pfPXCLNBEi2uUA?ext=png",
            attributes: [
              {
                trait_type: "Artist",
                value: "Hwang",
              },
            ],
            external_url: "",
            collection: {
              family: "URS: Airdrops",
              name: "URS: In The Beginning",
            },
            properties: {
              files: [
                {
                  uri: "https://www.arweave.net/30CfSj5FFTypM64AsuE9MOXc24dM9pfPXCLNBEi2uUA?ext=png",
                  type: "image/png",
                },
              ],
              category: "image",
              creators: [
                {
                  address: "56Sf4mzyFXEu5NoAgwCpN5jtMXm8xbBUCSNbdQeXejTb",
                  share: 75,
                },
                {
                  address: "43sZtqxj2FNq3umsVeumcxhHUs5BPu5thyeMPMkm1oK1",
                  share: 25,
                },
              ],
            },
          },
        },
        {
          mint: "2pjNFqDUSGb6saPUYN18tmw64aE2BhhrnL6BTHFdH9Bg",
          price: "720000000",
          seller: "FYoKMZn9LsBqvgfQQbaLYumWUQCG5dJ63azKNb3CfwTE",
          unit: "SOL_LAMPORT",
          metadata: {
            name: "In the beginning...",
            symbol: "URS",
            description:
              '[Drippinsol: 10 Editions] - The Underground Royalty Society Gen 1 Release: "In the beginning..."',
            seller_fee_basis_points: 1500,
            image:
              "https://www.arweave.net/GVF-7JXEpNs7U5z-QVqgL3rFWzp2vGVHnX-dVhlAOTg?ext=jpg",
            attributes: [
              {
                trait_type: "Artist",
                value: "Drippinsol",
              },
            ],
            external_url: "",
            collection: {
              family: "URS: Airdrops",
              name: "URS: In The Beginning",
            },
            properties: {
              files: [
                {
                  uri: "https://www.arweave.net/GVF-7JXEpNs7U5z-QVqgL3rFWzp2vGVHnX-dVhlAOTg?ext=jpg",
                  type: "image/jpg",
                },
              ],
              category: "image",
              creators: [
                {
                  address: "DR96vDw1bJLCxdKuNmM4NLRBTvSBQenogA6B5gdV4xVD",
                  share: 75,
                },
                {
                  address: "43sZtqxj2FNq3umsVeumcxhHUs5BPu5thyeMPMkm1oK1",
                  share: 25,
                },
              ],
            },
          },
        },
        {
          mint: "5Nf5hdgLTtwXt17QzWpeYm5e1VpUTnok9QU6nvccNKPQ",
          price: "11110000000",
          seller: "G5WpFHtBuQx7jjVLMAuBvoUeRbRS2etshfFpk1uxhfX9",
          unit: "SOL_LAMPORT",
          metadata: {
            name: "In the beginning...",
            symbol: "URS",
            description:
              "[Zen0m #6] - This set of 10 pieces merges both the beginning of life on earth, and the beginning of computer imagery. An abstracted scene of paleozoic ocean life is created with a mixture of hand drawn and algorithmic pixel art. Each edition views the scene through a different lens, like snapshots of the dramatic transitional event of techno- and bio-logical evolution.",
            seller_fee_basis_points: 1500,
            image:
              "https://www.arweave.net/Khqch-mFgyhlGsanVHra7Uw39qAVG5fgIylFn9qRgVw?ext=PNG",
            attributes: [
              {
                trait_type: "Artist",
                value: "Zen0m",
              },
            ],
            external_url: "",
            collection: {
              family: "URS: Airdrops",
              name: "URS: In The Beginning",
            },
            properties: {
              files: [
                {
                  uri: "https://www.arweave.net/Khqch-mFgyhlGsanVHra7Uw39qAVG5fgIylFn9qRgVw?ext=PNG",
                  type: "image/png",
                },
              ],
              category: "image",
              creators: [
                {
                  address: "zvrsoq2LbNxekPqLK1v8DsLgeC4LHxMQL52beX8Ktn8",
                  share: 75,
                },
                {
                  address: "43sZtqxj2FNq3umsVeumcxhHUs5BPu5thyeMPMkm1oK1",
                  share: 25,
                },
              ],
            },
          },
        },
      ];
      const data = (await axiosInstance.get(ApiRoutes.activeListing(slug)))
        ?.data;
      return data.data;
    },
    {
      enabled: !!slug && slug !== "",
    },
  );
}
export default useActiveListing;

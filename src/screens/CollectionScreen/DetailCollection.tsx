import { SolisTheme } from "../../constants/theme";
import {
  Button,
  Card,
  Divider,
  Empty,
  Image,
  Skeleton,
  Typography,
} from "antd";
import useActiveListing from "../../service/useActiveListings";
import { formatTokenAmount } from "../../util/formater";
import useWithdrawAndBuyNft from "../../service/useWithdrawAndBuyNft";
import { useDimensions, usePublicKeys } from "../../hooks/xnft-hooks";
import { VersionedTransaction } from "@solana/web3.js";

const NFT = ({ nft }) => {
  const keys = usePublicKeys();
  const userWalletAddress = keys?.solana?.toString();
  const { width, height } = useDimensions();
  const { mutateAsync: createInstructions, isLoading: isUpdating } =
    useWithdrawAndBuyNft(userWalletAddress);
  return (
    <div className="col-6 col-md-4 p-2">
      <Card
        bodyStyle={{ padding: "12px" }}
        style={{ margin: 0, width: "100%" }}
      >
        <div className="d-flex flex-column align-items-center justify-content-center text-center">
          <div className="w-100">
            <Image
              width="100%"
              height={height * 0.2}
              style={{ borderRadius: 12 }}
              src={nft?.metadata?.image}
            />
          </div>
          <div className="mt-2">
            <Typography.Title level={5} style={{ margin: 0 }}>
              {nft?.metadata?.name}
            </Typography.Title>

            <Button
              onClick={async () => {
                const instructions = await createInstructions({
                  nftPrice: parseInt(nft.price) / 1_000_000_000,
                  nftOwner: nft.seller,
                  nftMint: nft.mint,
                });
                const tx = VersionedTransaction.deserialize(
                  new Buffer.from(instructions?.data?.data, "base64"),
                );
                window.xnft.solana.sendAndConfirm(tx);
              }}
              type="primary"
              className="mt-4"
              loading={isUpdating}
            >
              Buy with {formatTokenAmount(nft?.price, 9)} {"SOL"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

const DetailCollectionScreen = ({ url }) => {
  const slug = url?.split("/").pop();

  const { data, isLoading } = useActiveListing(slug as string);

  if (!slug || slug === "") {
    return <Empty />;
  }
  return (
    <div
      style={{
        height: "100%",
        overflowY: "scroll",
        backgroundColor: SolisTheme.background,
      }}
      className="p-3"
    >
      <Typography.Title level={4} style={{ marginBottom: "8px" }}>
        Active Listing
      </Typography.Title>
      <Divider style={{ margin: "12px 0" }} />
      {isLoading && <Skeleton />}
      {!isLoading && (
        <div className="d-flex flex-row flex-wrap align-items-center justify-content-center text-center">
          {data?.map((nft) => {
            return <NFT nft={nft} />;
          })}
        </div>
      )}
    </div>
  );
};

export default DetailCollectionScreen;

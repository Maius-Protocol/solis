import userListTensorCollections from "../../service/useListTensorCollections";
import { SolisTheme } from "../../constants/theme";
import { Avatar, Card, Divider, List, Typography } from "antd";
import useActiveListing from "../../service/useActiveListings";
import { useParams } from "next/navigation";
import { formatTokenAmount } from "../../util/formater";
import useListTensorCollections from "../../service/useListTensorCollections";
import { useNavigation, useRoute } from "@react-navigation/native";
import useWithdrawAndBuyNft from "../../service/useWithdrawAndBuyNft";
import { usePublicKeys } from "../../hooks/xnft-hooks";
import { Transaction, VersionedTransaction } from "@solana/web3.js";
const DetailCollectionScreen = () => {
  const keys = usePublicKeys();
  const userWalletAddress = keys?.solana?.toString();
  const { mutateAsync: createInstructions } =
    useWithdrawAndBuyNft(userWalletAddress);
  const route = useRoute();
  // const slug = route?.params?.slug
  const slug = "urs01";
  const { data, isLoading } = useActiveListing(slug as string);

  return (
    <div
      style={{
        height: "60%",
        overflowY: "scroll",
        backgroundColor: SolisTheme.background,
      }}
      className="p-3"
    >
      <Typography.Title level={4} style={{ marginBottom: "8px" }}>
        Active Listing
      </Typography.Title>
      <Divider style={{ margin: "12px 0" }} />
      <List
        loading={isLoading}
        itemLayout="horizontal"
        split={false}
        dataSource={data}
        renderItem={(nft, index) => {
          console.log(nft);
          return (
            <List.Item style={{ padding: "4px 0" }}>
              <Card
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
                style={{ width: "100%", margin: 0 }}
              >
                <div className="d-flex flex-row ">
                  <div style={{ marginRight: "12px" }}>
                    <Avatar
                      size={48}
                      src={
                        nft?.metadata?.image ??
                        `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`
                      }
                    />
                  </div>
                  <div>
                    <Typography.Title level={5} style={{ margin: 0 }}>
                      {nft?.metadata?.name}
                    </Typography.Title>
                    <Typography.Text>
                      Price: {formatTokenAmount(nft?.price, 9)} {"SOL"}
                    </Typography.Text>
                  </div>
                </div>
              </Card>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default DetailCollectionScreen;

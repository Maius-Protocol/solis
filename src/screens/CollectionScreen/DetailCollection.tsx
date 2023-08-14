import userListTensorCollections from "../../service/useListTensorCollections";
import { SolisTheme } from "../../constants/theme";
import { Avatar, Card, Divider, List, Typography } from "antd";
import useActiveListing from "../../service/useActiveListings";
import { useParams } from "next/navigation";
import { formatTokenAmount } from "../../util/formater";
import useListTensorCollections from "../../service/useListTensorCollections";
import { useNavigation, useRoute } from "@react-navigation/native";
const DetailCollectionScreen = () => {
  const route = useRoute();
  const { data, isLoading } = useActiveListing(route?.params?.slug as string);

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
          return (
            <List.Item style={{ padding: "4px 0" }}>
              <Card style={{ width: "100%", margin: 0 }}>
                <div className="d-flex flex-row ">
                  <div style={{ marginRight: "12px" }}>
                    <Avatar
                      size={48}
                      src={
                        nft?.metadata?.imageUri ??
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

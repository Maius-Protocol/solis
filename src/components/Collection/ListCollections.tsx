import { Avatar, Card, Divider, List, Typography } from "antd";
import { Pressable } from "react-native";
import { SolisTheme } from "../../constants/theme";
import useListTensorCollections from "../../service/useListTensorCollections";

type Props = {
  onPress: (slug: string) => void;
};

const ListCollection = ({ onPress }: Props) => {
  const { data, isRefetching } = useListTensorCollections();
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
        Collections
      </Typography.Title>
      <Divider style={{ margin: "12px 0" }} />
      <List
        loading={isRefetching}
        itemLayout="horizontal"
        split={false}
        dataSource={data}
        renderItem={(collection, index) => {
          return (
            <Pressable onPress={() => onPress(collection?.slug)}>
              <List.Item style={{ padding: "4px 0" }}>
                <Card style={{ width: "100%", margin: 0 }}>
                  <div className="d-flex flex-row ">
                    <div style={{ marginRight: "12px" }}>
                      <Avatar
                        size={48}
                        src={
                          collection?.imageUri ??
                          `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`
                        }
                      />
                    </div>
                    <div>
                      <Typography.Title level={5} style={{ margin: 0 }}>
                        {collection?.name}
                      </Typography.Title>
                      <Typography.Text>
                        Minted: {collection?.statsV2?.numMints ?? 0}
                      </Typography.Text>
                    </div>
                  </div>
                </Card>
              </List.Item>
            </Pressable>
          );
        }}
      />
    </div>
  );
};

export default ListCollection;

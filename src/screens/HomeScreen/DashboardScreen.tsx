import useMeteoraVaultsInfo from "../../service/useMeteoraVaultsInfo";
import { Avatar, Card, Divider, List, Tag, Typography } from "antd";
import { tokenMap } from "../../constants/token";

const DashboardScreen = () => {
  const { data } = useMeteoraVaultsInfo();
  return (
    <div style={{ height: "100%" }}>
      <div
        style={{ height: "50%" }}
        className="p-4 align-items-center justify-content-center d-flex flex-column"
      >
        <Card style={{ width: "100%" }}>
          TODO: User deposited and interest goes here
        </Card>
      </div>
      <div
        style={{
          backgroundColor: "white",
          height: "50%",
          overflowY: "scroll",
          bottom: 0,
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
        }}
        className="p-3 shadow-lg"
      >
        <Typography.Title level={4} style={{ marginBottom: "8px" }}>
          APY Offers
        </Typography.Title>
        <Divider style={{ margin: "12px 0" }} />
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(vault, index) => {
            const tokenInfo = tokenMap.find(
              (token) => token.address === vault.token_address,
            );
            return (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      size={32}
                      src={
                        tokenInfo?.logoURI ??
                        `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`
                      }
                    />
                  }
                  title={
                    <Typography.Title level={5}>
                      {tokenInfo?.symbol}
                    </Typography.Title>
                  }
                  description={
                    <Tag bordered color="success">
                      Closetest APY: {vault?.closest_apy?.toFixed(2)}%
                    </Tag>
                  }
                />
              </List.Item>
            );
          }}
        />
      </div>
    </div>
  );
};

export default DashboardScreen;

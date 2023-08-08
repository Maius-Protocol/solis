import useMeteoraVaultsInfo from "../../service/useMeteoraVaultsInfo";
import { SolisTheme } from "../../constants/theme";
import { Avatar, Card, Divider, List, Tag, Typography } from "antd";
import { tokenMap } from "../../constants/token";

const MyPortfolio = () => {
  const { data, isRefetching } = useMeteoraVaultsInfo();
  console.log(data);
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
        My Portfolio
      </Typography.Title>
      <Divider style={{ margin: "12px 0" }} />
      <List
        loading={isRefetching}
        itemLayout="horizontal"
        split={false}
        dataSource={data}
        renderItem={(vault, index) => {
          const tokenInfo = tokenMap.find(
            (token) => token.address === vault.token_address,
          );
          return (
            <List.Item style={{ padding: "4px 0" }}>
              <Card style={{ width: "100%", margin: 0 }}>
                <div className="d-flex flex-row ">
                  <div style={{ marginRight: "12px" }}>
                    <Avatar
                      size={48}
                      src={
                        tokenInfo?.logoURI ??
                        `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`
                      }
                    />
                  </div>
                  <div>
                    <Typography.Title level={5} style={{ margin: 0 }}>
                      {tokenInfo?.symbol}
                    </Typography.Title>
                    <Typography.Text>
                      Deposited: {30} {tokenInfo?.symbol}
                    </Typography.Text>
                  </div>
                </div>
              </Card>
              {/*<List.Item.Meta*/}
              {/*  avatar={*/}
              {/*
              {/*  }*/}
              {/*  title={tokenInfo?.symbol}*/}
              {/*  description={`Current APY: ${vault?.closest_apy?.toFixed(2)}%`}*/}
              {/*/>*/}
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default MyPortfolio;

import { SolisTheme } from "../../constants/theme";
import { usePublicKeys } from "../../hooks/xnft-hooks";
import useUserMeteoraVaultBalance from "../../service/useUserMeteoraVaultBalance";
import { Avatar, Card, Divider, List, Spin, Tag, Typography, Input } from "antd";
import { formatTokenAmount } from "../../util/formater";
import { tokenMap } from "../../constants/token";

const SendScreen = () => {
  const keys = usePublicKeys();
  const userWalletAddress = keys?.solana?.toString();
  const { data, isRefetching } = useUserMeteoraVaultBalance(userWalletAddress!);

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
        Vault Tokens
      </Typography.Title>
      <Divider style={{ margin: "12px 0" }} />
      {isRefetching && <Spin />}
      <List
        loading={isRefetching}
        itemLayout="horizontal"
        split={false}
        dataSource={data}
        renderItem={(balance, index) => {
          const tokenInfo = tokenMap.find(
            (token) => token.address === balance.token,
          );
          console.log(balance);
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
                      {tokenInfo?.name}
                    </Typography.Title>
                    <Typography.Text>
                      {formatTokenAmount(
                        balance.realTokenAmount,
                        tokenInfo?.decimals || 1,
                      )}{" "}
                      {tokenInfo?.symbol}
                    </Typography.Text>
                  </div>
                </div>
              </Card>
            </List.Item>
          );
        }}
      />
      <Input placeholder="Recipient's Solana address" />
      <Input placeholder="Amount" />
    </div>
  )
};

export default SendScreen;

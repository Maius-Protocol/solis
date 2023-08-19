import { SolisTheme } from "../../constants/theme";
import {
  Avatar,
  Card,
  Divider,
  List,
  Skeleton,
  Spin,
  Tag,
  Typography,
} from "antd";
import { tokenMap } from "../../constants/token";
import useUserMeteoraVaultBalance from "../../service/useUserMeteoraVaultBalance";
import { formatTokenAmount } from "../../util/formater";
import { usePublicKeys } from "../../hooks/xnft-hooks";
import { ReloadOutlined } from "@ant-design/icons";
import { useFocusEffect } from "@react-navigation/native";

const MyPortfolio = () => {
  const keys = usePublicKeys();
  const userWalletAddress = keys?.solana?.toString();
  const { data, isRefetching, refetch } = useUserMeteoraVaultBalance(
    userWalletAddress!,
  );

  return (
    <div
      style={{
        height: "60%",
        overflowY: "scroll",
        backgroundColor: SolisTheme.background,
      }}
      className="p-3"
    >
      <div className="d-flex flex-row align-items-center justify-content-between">
        <Typography.Title level={4} style={{ marginBottom: "8px" }}>
          My Portfolio
        </Typography.Title>
        <ReloadOutlined
          style={{ cursor: "pointer" }}
          onClick={() => {
            refetch();
          }}
        />
      </div>
      <Divider style={{ margin: "12px 0" }} />
      {isRefetching && <Skeleton />}
      {!isRefetching && (
        <List
          itemLayout="horizontal"
          split={false}
          dataSource={data}
          renderItem={(balance, index) => {
            const tokenInfo = tokenMap.find(
              (token) => token.address === balance.token,
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
                        Deposited:{" "}
                        {formatTokenAmount(
                          balance.lpTokenAmount,
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
      )}
    </div>
  );
};

export default MyPortfolio;

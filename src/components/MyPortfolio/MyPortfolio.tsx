import { SolisTheme } from "../../constants/theme";
import {
  Avatar,
  Card,
  Divider,
  List,
  Skeleton,
  Spin,
  Statistic,
  Tag,
  Typography,
} from "antd";
import { tokenMap } from "../../constants/token";
import useUserMeteoraVaultBalance from "../../service/useUserMeteoraVaultBalance";
import { formatTokenAmount } from "../../util/formater";
import { usePublicKeys } from "../../hooks/xnft-hooks";
import { ArrowUpOutlined, ReloadOutlined } from "@ant-design/icons";
import { useFocusEffect } from "@react-navigation/native";
import useMeteoraVaultsInfo from "../../service/useMeteoraVaultsInfo";

const MyPortfolio = () => {
  const keys = usePublicKeys();
  const userWalletAddress = keys?.solana?.toString();
  const { data, isRefetching, refetch } = useUserMeteoraVaultBalance(
    userWalletAddress!,
  );
  const { data: vaults, isLoading: isLoadingVaults } = useMeteoraVaultsInfo();

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
      {(isRefetching || !data) && <Skeleton />}
      {!isRefetching && data && (
        <List
          itemLayout="horizontal"
          split={false}
          dataSource={data}
          renderItem={(balance, index) => {
            const tokenInfo = tokenMap.find(
              (token) => token.address === balance.token,
            );
            const _vault = vaults?.find(
              (e) => e?.token_address === balance.token,
            );
            const _amount = formatTokenAmount(
              balance.lpTokenAmount,
              tokenInfo?.decimals || 1,
            );
            const calculation = Number(_amount) * (_vault?.closest_apy / 100);
            return (
              <List.Item style={{ padding: "4px 0" }}>
                <Card style={{ width: "100%", margin: 0 }}>
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <div className="d-flex flex-row">
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
                          Deposited: {_amount} {tokenInfo?.symbol}
                        </Typography.Text>
                      </div>
                    </div>
                    <div>
                      <Statistic
                        loading={isLoadingVaults}
                        value={calculation}
                        precision={5}
                        valueStyle={{ color: "#3f8600", fontSize: "16px" }}
                        prefix={<ArrowUpOutlined />}
                        suffix={tokenInfo?.symbol}
                      />
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

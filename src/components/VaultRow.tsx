import { Avatar, Card, Space, Statistic } from "antd";
import { Pressable } from "react-native";

type Props = {
  tokenName: string;
  tokenImage: string;
  apy: number;
  vaultKey: string;
  onPress: (vaultKey: string) => void;
};

export function VaultRow({
  tokenName,
  tokenImage,
  apy,
  vaultKey,
  onPress,
}: Props) {
  return (
    <Pressable onPress={() => onPress(vaultKey)}>
      <Card>
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Space>
            <Avatar src={tokenImage} size={"large"} />
            <div>{tokenName}</div>
          </Space>
          <Statistic
            title="APY"
            value={apy}
            valueStyle={{ fontSize: 14, lineHeight: 1, fontWeight: "bold" }}
            precision={2}
            suffix="%"
          />
        </Space>
      </Card>
    </Pressable>
  );
}

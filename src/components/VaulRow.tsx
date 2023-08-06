import { Avatar, Card, Space, Statistic } from "antd";

type Props = {
  tokenName: string;
  tokenImage: string;
  apy: number;
};

export function VaultRow({ tokenName, tokenImage, apy }: Props) {
  return (
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
  );
}

import { Statistic } from "antd";
import React from "react";
import CountUp from "react-countup";
import { usePublicKeys } from "../../hooks/xnft-hooks";
import useUserMeteoraVaultBalance from "../../service/useUserMeteoraVaultBalance";
import useWalletBalance from "../../service/useWalletBalance";

const formatter = (value: number) => (
  <CountUp
    end={value}
    style={{ color: "white", fontWeight: "bold" }}
    separator=","
  />
);

const YourTotalSavings = () => {
  const keys = usePublicKeys();
  const userWalletAddress = keys?.solana?.toString();
  const { data, isLoading: isLoadingMeteora } = useUserMeteoraVaultBalance(
    userWalletAddress!,
  );
  const { data: walletBalancesData, isLoading: isLoadingWallet } =
    useWalletBalance(userWalletAddress, "SOL");

  const currentDeposited = data?.[0]?.lpTokenAmount / 1_000_000_000;
  const balance = walletBalancesData?.data?.data?.[0]?.balance;
  const isLoading = isLoadingMeteora || isLoadingWallet;
  return (
    <Statistic
      loading={isLoading}
      title={<span style={{ color: "white" }}>Your total savings (SOL)</span>}
      value={(currentDeposited / (currentDeposited + balance)) * 100}
      precision={2}
      suffix={`%`}
      valueStyle={{ color: "white" }}
      formatter={formatter}
    />
  );
};

export default YourTotalSavings;

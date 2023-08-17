import styled from "styled-components";
import { Statistic } from "antd";
import CountUp from "react-countup";
import React from "react";
import { ArrowUpOutlined } from "@ant-design/icons";
import SolisActionsCard from "../SolisActionsCard/SolisActionsCard";
import Images from "../../assets";
import YourTotalSavings from "./YourTotalSavings";
import { usePublicKeys } from "../../hooks/xnft-hooks";
import useMeteoraVaultsInfo from "../../service/useMeteoraVaultsInfo";

const Header = styled.div`
  height: 60%;
  min-height: 320px;
  width: 100%;
  background: #ff9966; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #ff9966,
    #ff5e62
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ff9966,
    #ff5e62
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background-image: url("${Images.background}");
  background-size: cover;
`;

const SolisAppHeader = () => {
  const keys = usePublicKeys();
  const userWalletAddress = keys?.solana?.toString();
  const { data: vaults, isLoading: isLoadingVaults } = useMeteoraVaultsInfo();

  return (
    <div className="d-flex flex-column">
      <Header className="px-3 d-flex flex-column justify-content-between align-items-start">
        <img
          style={{
            margin: 0,
            marginTop: "12px",
            marginLeft: "-12px",
            width: 64,
          }}
          src={Images.logo}
        />
        <Statistic
          title={<b style={{ color: "white" }}>Welcome back!,</b>}
          valueRender={() => (
            <div
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {userWalletAddress}
            </div>
          )}
          valueStyle={{
            color: "white",
            width: "250px",
          }}
        />
        <div
          style={{ marginBottom: "64px" }}
          className="w-100 d-flex flex-row align-items-center justify-content-between"
        >
          <YourTotalSavings />
          <Statistic
            title={<span style={{ color: "white" }}>Today APY</span>}
            value={vaults?.[0]?.closest_apy}
            precision={2}
            isLoadingVaults={isLoadingVaults}
            valueStyle={{ color: "white" }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </div>
      </Header>
      <div className="p-3" style={{ marginTop: "-64px" }}>
        <SolisActionsCard />
      </div>
    </div>
  );
};

export default SolisAppHeader;

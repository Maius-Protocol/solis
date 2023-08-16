import styled from "styled-components";
import { Statistic } from "antd";
import CountUp from "react-countup";
import React from "react";
import { ArrowUpOutlined } from "@ant-design/icons";
import SolisActionsCard from "../SolisActionsCard/SolisActionsCard";
import Images from "../../assets";

const Header = styled.div`
  height: 40%;
  min-height: 240px;
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
`;

const formatter = (value: number) => (
  <CountUp
    end={value}
    style={{ color: "white", fontWeight: "bold" }}
    separator=","
  />
);

const SolisAppHeader = () => {
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
        <div
          style={{ marginBottom: "64px" }}
          className="w-100 d-flex flex-row align-items-center justify-content-between"
        >
          <Statistic
            title={<span style={{ color: "white" }}>Your total savings</span>}
            value={20}
            precision={2}
            suffix={`/ ${1000} USD`}
            valueStyle={{ color: "white" }}
            formatter={formatter}
          />
          <Statistic
            title={<span style={{ color: "white" }}>Today APY</span>}
            value={3.2}
            precision={2}
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

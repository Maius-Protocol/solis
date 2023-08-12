import styled from "styled-components";
import { Button, Typography } from "antd";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const Header = styled.div`
  height: 64px;
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

const SolisAppHeaderLite = () => {
  const navigation = useNavigation();
  return (
    <Header className="d-flex flex-row align-items-center justify-content-between">
      <Button
        onClick={() => {
          navigation.goBack();
        }}
        style={{ height: 60 }}
        type="text"
      >
        <div style={{ transform: "scale(-1, -1)" }}>
          <lord-icon
            trigger="hover"
            src="https://cdn.lordicon.com/zmkotitn.json"
            style={{ width: "40px", height: "40px" }}
            colors="primary:#ffffff"
          />
        </div>
      </Button>
      <div style={{ marginLeft: "-70px" }}>
        <Typography.Title style={{ color: "white", margin: 0 }} level={4}>
          solis logo
        </Typography.Title>
      </div>
      <div />
    </Header>
  );
};

export default SolisAppHeaderLite;

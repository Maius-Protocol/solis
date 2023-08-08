import React, { useEffect } from "react";
import Lottie from "lottie-react";
import investAnimation from "./animation_lkzt0k06.json";
import { Button } from "antd";
import { Typography } from "antd";
import { useNavigation } from "@react-navigation/native";
import { RouteNames } from "../../util/routes";
const { Title } = Typography;

const WelcomeScreen = () => {
  const { navigate } = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigate(RouteNames.HOME);
    }, 500);
  }, []);

  return (
    <div className="h-100 d-flex align-items-center justify-content-between flex-column">
      <div>
        <Lottie animationData={investAnimation} loop={true} />
        <div className="px-2 text-center d-flex align-items-center justify-content-center flex-column">
          <Title level={2}>👋 bro, welcome to Solis</Title>
          <Title level={4} style={{ marginTop: "8px" }}>
            We help you earn yield on your idle capital and return back whenever
            you need
          </Title>
        </div>
      </div>
      <div className="p-3 w-100">
        <Button
          loading
          onClick={() => {
            navigate(RouteNames.HOME);
          }}
          type="primary"
          block
          size="large"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};
export default WelcomeScreen;

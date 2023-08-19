import React, { useState } from "react";
import { Modal, Spin } from "antd";
import Lottie from "lottie-react";
import DepositAnimation from "./data.json";

const WithdrawFromMeteora = ({ isModalOpen, setIsModalOpen }) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelButtonProps={{
        style: {
          visibility: "hidden",
        },
      }}
      okButtonProps={{
        style: {
          visibility: "hidden",
        },
      }}
    >
      <Lottie
        animationData={DepositAnimation}
        loop={true}
        style={{ height: 250 }}
      />
      <div className="d-flex flex-column align-items-center justify-content-center">
        <Spin style={{ marginBottom: "8px" }} />
        <h4 className="text-center">
          Withdrawing Tokens From Meteora's Dynamic Vaults...
        </h4>
      </div>
    </Modal>
  );
};

export default WithdrawFromMeteora;

import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Divider,
  InputNumber,
  Radio,
  Table,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import useWalletBalance, {
  Daum,
  IWalletResponse,
} from "../../service/useWalletBalance";
import { usePublicKeys } from "../../hooks/xnft-hooks";
import { SendOutlined } from "@ant-design/icons";

const columns: ColumnsType<Daum> = [
  {
    title: "Token",
    dataIndex: "symbol",
    render: (_, record) => {
      return (
        <div className="d-flex flex-row align-items-center">
          <Avatar
            src={record.image}
            size={"default"}
            shape="square"
            style={{ marginRight: "8px" }}
          />
          {_}
        </div>
      );
    },
  },
  {
    title: "Total",
    dataIndex: "balance",
    render: (_, record) => {
      return (
        <span>
          {_} {record.symbol}
        </span>
      );
    },
  },
  {
    title: "Amount",
    dataIndex: "balance",
    render: (_, record) => {
      return <InputNumber addonAfter="%" defaultValue={100} />;
    },
  },
];

const DepositScreen = () => {
  const keys = usePublicKeys();
  const { data: walletBalancesData, isLoading: isLoadingWallet } =
    useWalletBalance(keys?.solana?.toString());
  const walletBalances = walletBalancesData?.data?.data;

  const disabled = true;

  return (
    <div className="px-2">
      <Typography.Title className="my-2" level={4}>
        You have...
      </Typography.Title>
      <Card bodyStyle={{ padding: 0 }}>
        <Table
          loading={isLoadingWallet}
          rowSelection={{
            type: "checkbox",
            onChange: (selectedRowKeys: React.Key[], selectedRows: Daum[]) => {
              console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows,
              );
            },
          }}
          pagination={false}
          columns={columns}
          dataSource={walletBalances || []}
        />
      </Card>
      <Divider />
      <Typography.Title className="my-2" level={4}>
        Which vault?
      </Typography.Title>
      <Button
        type="primary"
        block
        size="large"
        style={{
          position: "absolute",
          bottom: 32,
          width: "96%",
        }}
        disabled={disabled}
      >
        <div className="d-flex align-items-center justify-content-center">
          <SendOutlined style={{ marginRight: "6px" }} />
          Deposit
        </div>
      </Button>
    </div>
  );
};

export default DepositScreen;

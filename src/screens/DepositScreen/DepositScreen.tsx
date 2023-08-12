import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Dropdown,
  InputNumber,
  Radio,
  Space,
  Table,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import useWalletBalance, {
  Daum,
  IWalletResponse,
} from "../../service/useWalletBalance";
import { usePublicKeys } from "../../hooks/xnft-hooks";
import {
  CaretDownOutlined,
  DownOutlined,
  SendOutlined,
} from "@ant-design/icons";
import useMeteoraVaultsInfo from "../../service/useMeteoraVaultsInfo";
import { useForm } from "react-hook-form";
import { formatTokenAmount } from "../../util/formater";
import { findToken } from "../../constants/token";

const DepositScreen = () => {
  const { watch, setValue, register, getValues } = useForm();
  const keys = usePublicKeys();
  const { data: vaults, isLoading: isLoadingVaults } = useMeteoraVaultsInfo();
  const { data: walletBalancesData, isLoading: isLoadingWallet } =
    useWalletBalance(keys?.solana?.toString());
  const walletBalances = walletBalancesData?.data?.data;

  const selectedVault = watch("selectedVault");
  const deposit = watch("deposit");
  const amount = watch("amount");
  const vault = vaults?.find((e) => e.token_address === selectedVault);
  const token = findToken(selectedVault);
  const disabled = !vault;

  console.log(amount);
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
      title: "Deposit Amount",
      dataIndex: "balance",
      render: (_, record) => {
        const key = `amount.${record.address}`;
        const percentage = watch(key);
        return (
          <div className="d-flex flex-row">
            <InputNumber
              formatter={(value) => value + "%"}
              onChange={(value) => {
                setValue(key, value);
              }}
              name={``}
              addonAfter={`=${(percentage || 0) * 0} SOL`}
              defaultValue={100}
            />
          </div>
        );
      },
    },
  ];

  console.log(selectedVault);

  return (
    <div className="px-2">
      <Typography.Title className="my-2" level={4}>
        Your wallet
      </Typography.Title>
      <Card bodyStyle={{ padding: 0 }}>
        <Table
          loading={isLoadingWallet}
          rowSelection={{
            type: "checkbox",
            onChange: (selectedRowKeys: React.Key[], selectedRows: Daum[]) => {
              console.log(selectedRows);
              setValue(
                "deposit",
                selectedRows?.map((row) => ({
                  address: row.address,
                })),
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
        Vault Offers
      </Typography.Title>
      <Dropdown
        trigger="click"
        menu={{
          onClick: (e) => {
            setValue("selectedVault", e?.key);
          },
          items: vaults?.map((e) => {
            return {
              key: e?.token_address,
              label: (
                <div>
                  {e?.symbol} - <b>{e?.closest_apy?.toPrecision(2)}%</b>
                </div>
              ),
            };
          }),
        }}
      >
        <Card
          style={{ width: "100%", margin: 0 }}
          bodyStyle={{ padding: "16px" }}
        >
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="">
              {token && (
                <div className="d-flex flex-row ">
                  <div style={{ marginRight: "12px" }}>
                    <Avatar size={48} src={token?.logoURI} />
                  </div>
                  <div>
                    <Typography.Title level={5} style={{ margin: 0 }}>
                      {token?.symbol} -{" "}
                      <b>{vault?.closest_apy?.toPrecision(2)}% APY</b>
                    </Typography.Title>
                    <Typography.Text>Estimated interest:</Typography.Text>
                  </div>
                </div>
              )}
              {!token && <div>Please select an offer</div>}
            </div>
            <div>
              <CaretDownOutlined />
            </div>
          </div>
        </Card>
      </Dropdown>
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

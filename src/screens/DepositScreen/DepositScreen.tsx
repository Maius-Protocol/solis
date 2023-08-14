import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Dropdown,
  InputNumber,
  message,
  Table,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import useWalletBalance, { Daum } from "../../service/useWalletBalance";
import { usePublicKeys, useSolanaProvider } from "../../hooks/xnft-hooks";
import { CaretDownOutlined, SendOutlined } from "@ant-design/icons";
import useMeteoraVaultsInfo from "../../service/useMeteoraVaultsInfo";
import { useForm } from "react-hook-form";
import { findToken } from "../../constants/token";
import useSwapAndDeposit from "../../service/useSwapAndDeposit";
import useSignAndConfirmSolis from "../../service/useSignAndConfirmSolis";
import { VersionedTransaction } from "@solana/web3.js";
const bs58 = require("bs58");

const async = require("async");

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const DepositScreen = () => {
  const provider = useSolanaProvider();
  const [messageApi, contextHolder] = message.useMessage();
  const sendAndConfirm = provider?.sendAndConfirm;
  const { mutateAsync: sendAndConfirmSolis, isLoading: isSendingAndConfirm } =
    useSignAndConfirmSolis();
  const { watch, setValue, register, getValues } = useForm();
  const keys = usePublicKeys();
  const userWalletAddress = keys?.solana?.toString();
  const { data: vaults, isLoading: isLoadingVaults } = useMeteoraVaultsInfo();
  const selectedVault = watch("selectedVault");
  const { data: walletBalancesData, isLoading: isLoadingWallet } =
    useWalletBalance(userWalletAddress, selectedVault);
  const { mutateAsync, isLoading: isMutating } = useSwapAndDeposit(
    userWalletAddress!,
    selectedVault,
  );

  const walletBalances = walletBalancesData?.data?.data;
  const deposit = watch("deposit");
  const vault = vaults?.find((e) => e.token_address === selectedVault);
  const token = findToken(selectedVault);
  const disabled = !vault || !deposit || deposit?.length === 0;

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
            <b>{_?.toPrecision(4)}</b> {record.symbol}
          </span>
        );
      },
    },
    {
      title: "Deposit Amount",
      width: 300,
      render: (_, record) => {
        const key = `amount.${record.address}`;
        const percentage = watch(key);
        const rate = record.price[selectedVault];
        const total = record.balance * rate;
        const _amount = (percentage / 100 || 0) * total;
        return (
          <div className="d-flex flex-row">
            <InputNumber
              formatter={(value) => value + "%"}
              onChange={(value) => {
                setValue(key, value);
              }}
              name={`${key}`}
              addonAfter={`~${_amount?.toPrecision(4)} ${vault?.symbol}`}
              value={percentage}
              max={record?.symbol === "SOL" ? 99 : 100}
            />
          </div>
        );
      },
    },
  ];

  const onSubmit = async () => {
    const _response = await mutateAsync({
      swaps: deposit?.map((address) => {
        const formState = getValues();
        const percentage = formState?.amount[address];

        const record = walletBalances?.find((e) => e.address === address);
        const rate = record.price[selectedVault];
        const total = record.balance * rate;
        const _amount = (percentage / 100 || 0) * total;
        return {
          amount: _amount,
          address: address,
          tokenInfo: record,
        };
      }),
    });
    const txs = _response?.data?.data || [];
    let _transactions = txs.map((tx) => {
      const transactionDecoded = new Buffer(tx!, "base64");
      const transaction = VersionedTransaction.deserialize(transactionDecoded);
      return transaction;
    });
    _transactions = await window.xnft.solana.signAllTransactions(_transactions);
    for (const e of _transactions) {
      const serializedTransaction = bs58.encode(
        e.serialize({ verifySignatures: false }),
      );
      const { data } = await sendAndConfirmSolis(serializedTransaction);
      message.success(
        <a target="_blank" href={`https://solscan.io/tx/${data?.signature}`}>
          View this transaction on Solscan
        </a>,
      );
    }
  };

  useEffect(() => {
    if (vaults && vaults?.length !== 0) {
      setValue("selectedVault", vaults?.[0]?.token_address);
    }
  }, [vaults]);

  useEffect(() => {
    if (walletBalances && walletBalances?.length !== 0 && vault) {
      walletBalances?.forEach((record) => {
        setValue(
          `amount.${record?.address}`,
          record?.symbol === "SOL" ? 99 : 100,
        );
      });
    }
  }, [walletBalances, vault]);

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
              setValue("deposit", selectedRowKeys);
            },
          }}
          pagination={false}
          rowKey="address"
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
          bottom: 80,
          width: "96%",
        }}
        disabled={disabled}
        onClick={onSubmit}
        loading={isMutating || isSendingAndConfirm}
      >
        <div className="d-flex align-items-center justify-content-center">
          <SendOutlined style={{ marginRight: "6px" }} />
          Deposit
        </div>
      </Button>

      {contextHolder}
    </div>
  );
};

export default DepositScreen;

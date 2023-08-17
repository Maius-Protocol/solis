import {
  Avatar,
  Button,
  Card,
  Divider,
  Dropdown,
  Input,
  Space,
  Typography,
} from "antd";
import { findToken } from "../../constants/token";
import { formatTokenAmountNotFixed, isNumber } from "../../util/formater";
import { CaretDownOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import useUserMeteoraVaultBalance from "../../service/useUserMeteoraVaultBalance";
import { usePublicKeys } from "../../hooks/xnft-hooks";

const { Text } = Typography;

const TransferForm = ({ formProps, onSubmit, isUpdating, type }) => {
  const isWithdrawal = type === "withdrawal";
  const keys = usePublicKeys();
  const userWalletAddress = keys?.solana?.toString();
  const { watch, setValue, register, getValues } = formProps;
  const { data: vaults } = useUserMeteoraVaultBalance(userWalletAddress!);
  const selectedVault = watch("selectedVault");
  const amount = watch("amount");
  const address = watch("address");
  const token = findToken(selectedVault);
  const vault = vaults?.find((e) => e.token === selectedVault);
  const maxAmount = vault?.lpTokenAmount
    ? formatTokenAmountNotFixed(vault.lpTokenAmount, token?.decimals || 1)
    : "0";

  const handleMaxAmount = async () => {
    setValue("amount", maxAmount);
  };

  const disabled =
    "" ||
    !isNumber(amount) ||
    Number(amount) > Number(maxAmount) ||
    Number(amount) < 0 ||
    address === "" ||
    !address;

  useEffect(() => {
    if (isWithdrawal && userWalletAddress) {
      setValue("address", userWalletAddress);
    }
  }, [userWalletAddress]);

  return (
    <div className="px-2 mt-3">
      <Card
        title={
          isWithdrawal
            ? "Withdrawal to your wallet"
            : "Withdrawal to below wallet"
        }
        style={{ width: "100%", margin: 0 }}
      >
        <div className="py-2">
          <b>Amount</b>
        </div>
        <div className="py-2">
          <Space.Compact style={{ width: "100%" }}>
            <Input
              size="large"
              placeholder="Amount"
              max={maxAmount}
              onChange={(e) => {
                setValue("amount", e.target.value);
              }}
              value={amount}
            />
            <Button size={"large"} onClick={() => handleMaxAmount()}>
              Max
            </Button>
          </Space.Compact>
        </div>

        <div className="py-2">
          <b>From below vault</b>
        </div>
        <div>
          <Dropdown
            trigger={["click"]}
            menu={{
              onClick: (e) => {
                setValue("selectedVault", e?.key);
                setValue("amount", "");
              },
              items: vaults?.map((e) => {
                const tokenMap = findToken(e?.token);
                return {
                  key: e?.token,
                  label: (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ marginRight: "12px" }}>
                        <Avatar size={48} src={tokenMap?.logoURI} />
                      </div>
                      <div>
                        <Typography.Title level={5} style={{ margin: 0 }}>
                          {tokenMap?.symbol}
                        </Typography.Title>
                        <Text>
                          {"Balance "}
                          {formatTokenAmountNotFixed(
                            e.lpTokenAmount,
                            tokenMap?.decimals || 1,
                          )}
                        </Text>
                      </div>
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
                          {token?.symbol}
                        </Typography.Title>
                        <Typography.Text>
                          {"Balance "}
                          {formatTokenAmountNotFixed(
                            vault.lpTokenAmount,
                            token?.decimals || 1,
                          )}
                        </Typography.Text>
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
        </div>
        <div className="py-2">
          <b>To this address</b>
        </div>
        <div>
          <Input
            disabled={isWithdrawal}
            value={address}
            onChange={(e) => setValue("address", e.target.value)}
            size="large"
          />
        </div>
        <Divider />
        <div className="py-2">
          <Button
            type="primary"
            block
            size="large"
            disabled={disabled}
            onClick={onSubmit}
            loading={isUpdating}
          >
            <div className="d-flex align-items-center justify-content-center">
              Continue
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TransferForm;

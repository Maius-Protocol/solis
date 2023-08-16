import { Avatar, Card, Space, Dropdown, Typography, Input, Button } from "antd";
import { CaretDownOutlined, SendOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { findToken } from "../../constants/token";
import React, { useEffect, useState } from "react";
import useUserMeteoraVaultBalance from "../../service/useUserMeteoraVaultBalance";
import { usePublicKeys } from "../../hooks/xnft-hooks";
import { formatTokenAmountNotFixed } from "../../util/formater";
import useWithdraw from "../../service/useWithdraw";
import { VersionedTransaction } from "@solana/web3.js";
const { Text } = Typography;

const WithdrawalScreen = () => {
  const { watch, setValue, register, getValues } = useForm();
  const keys = usePublicKeys();
  const userWalletAddress = keys?.solana?.toString();
  const [amount, setAmount] = useState("");
  const { data: vaults, isRefetching } = useUserMeteoraVaultBalance(
    userWalletAddress!,
  );
  const selectedVault = watch("selectedVault");
  const vault = vaults?.find((e) => e.token === selectedVault);
  const token = findToken(selectedVault);
  const { mutateAsync: createInstructions, isLoading: isUpdating } =
    useWithdraw();
  useEffect(() => {
    if (vaults && vaults?.length !== 0) {
      setValue("selectedVault", vaults?.[0]?.token);
    }
  }, [vaults]);

  const handleMaxAmount = async () => {
    setAmount(
      formatTokenAmountNotFixed(vault.lpTokenAmount, token?.decimals || 1),
    );
  };

  const onSubmit = async () => {
    const instructions = await createInstructions({
      userWalletAddress: userWalletAddress!,
      vaultTokenMint: vault?.token,
      amount: Number(amount),
    });
    const tx = VersionedTransaction.deserialize(
      new Buffer.from(instructions?.data?.data, "base64"),
    );
    window.xnft.solana.sendAndConfirm(tx);
  };

  return (
    <div className="px-2">
      <Typography.Title className="my-2" level={4}>
        Withdraw
      </Typography.Title>
      <Card
        style={{ width: "100%", margin: 0 }}
        bodyStyle={{ padding: "16px" }}
      >
        <div className="py-2">
          <div>Enter withdraw amount:</div>
        </div>
        <div className="py-2">
          <Space.Compact style={{ width: "100%" }}>
            <Input
              size="large"
              placeholder="Amount"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
            <Button size={"large"} onClick={() => handleMaxAmount()}>
              Max
            </Button>
          </Space.Compact>
        </div>
        <div>
          <Dropdown
            trigger="click"
            menu={{
              onClick: (e) => {
                setValue("selectedVault", e?.key);
                setAmount("");
              },
              items: vaults
                ?.filter((e) => e?.token != vault?.token)
                .map((e) => {
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
                            {"v"}
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
                          {"v"}
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
          <Button
            type="primary"
            block
            size="large"
            // disabled={disabled}
            onClick={onSubmit}
            loading={isUpdating}
          >
            <div className="d-flex align-items-center justify-content-center">
              Withdraw
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WithdrawalScreen;

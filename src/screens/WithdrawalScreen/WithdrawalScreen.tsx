import {
  Avatar,
  Card,
  Space,
  Dropdown,
  Typography,
  Input,
  Button,
  Divider,
} from "antd";
import { CaretDownOutlined, SendOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { findToken } from "../../constants/token";
import React, { useEffect, useState } from "react";
import useUserMeteoraVaultBalance from "../../service/useUserMeteoraVaultBalance";
import { usePublicKeys } from "../../hooks/xnft-hooks";
import { formatTokenAmountNotFixed, isNumber } from "../../util/formater";
import useWithdraw from "../../service/useWithdraw";
import { VersionedTransaction } from "@solana/web3.js";
import { useNavigation } from "@react-navigation/native";
import TransferForm from "../../components/TransferForm/TransferForm";
const { Text } = Typography;

const WithdrawalScreen = () => {
  const navigation = useNavigation();
  const formProps = useForm();
  const { watch, setValue, register, getValues } = formProps;
  const keys = usePublicKeys();
  const userWalletAddress = keys?.solana?.toString();
  const [amount, setAmount] = useState("");
  const { mutateAsync: createInstructions, isLoading: isUpdating } =
    useWithdraw();

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
    navigation.goBack();
  };

  useEffect(() => {
    if (vaults && vaults?.length !== 0) {
      setValue("selectedVault", vaults?.[0]?.token);
    }
  }, [vaults]);

  return <TransferForm formProps={formProps} />;
};

export default WithdrawalScreen;

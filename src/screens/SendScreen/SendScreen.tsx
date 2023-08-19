import { usePublicKeys } from "../../hooks/xnft-hooks";
import useUserMeteoraVaultBalance from "../../service/useUserMeteoraVaultBalance";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { VersionedTransaction } from "@solana/web3.js";
import React, { useEffect, useState } from "react";
import TransferForm from "../../components/TransferForm/TransferForm";
import useWithdrawAndTransfer from "../../service/useWithdrawAndTransfer";
import WithdrawFromMeteora from "../../components/WithdrawFromMeteora";

const SendScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigation = useNavigation();
  const keys = usePublicKeys();
  const userWalletAddress = keys?.solana?.toString();
  const { data: vaults } = useUserMeteoraVaultBalance(userWalletAddress!);
  const formProps = useForm();
  const { watch, setValue, register, getValues } = formProps;
  const { refetch } = useUserMeteoraVaultBalance(userWalletAddress!);

  const selectedVault = watch("selectedVault");
  const vault = vaults?.find((e) => e.token === selectedVault);
  const { mutateAsync: createInstructions, isLoading: isUpdating } =
    useWithdrawAndTransfer();

  const onSubmit = async () => {
    const { amount, address } = getValues();
    setIsModalOpen(true);
    const instructions = await createInstructions({
      sender: userWalletAddress!,
      receiver: address,
      vaultTokenMint: vault?.token,
      amount: Number(amount),
    });
    const tx = VersionedTransaction.deserialize(
      new Buffer.from(instructions?.data?.data, "base64"),
    );
    setIsModalOpen(false);
    await window.xnft.solana.sendAndConfirm(tx);
    refetch();
    navigation.goBack();
  };

  useEffect(() => {
    if (vaults && vaults?.length !== 0) {
      setValue("selectedVault", vaults?.[0]?.token);
    }
  }, [vaults]);

  return (
    <>
      <TransferForm
        formProps={formProps}
        onSubmit={onSubmit}
        isUpdating={isUpdating}
        type="transfer"
      />
      <WithdrawFromMeteora
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default SendScreen;

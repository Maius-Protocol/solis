import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import useUserMeteoraVaultBalance from "../../service/useUserMeteoraVaultBalance";
import { usePublicKeys } from "../../hooks/xnft-hooks";
import useWithdraw from "../../service/useWithdraw";
import { VersionedTransaction } from "@solana/web3.js";
import { useNavigation } from "@react-navigation/native";
import TransferForm from "../../components/TransferForm/TransferForm";
import WithdrawFromMeteora from "../../components/WithdrawFromMeteora";

const WithdrawalScreen = () => {
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
    useWithdraw();

  const onSubmit = async () => {
    const { amount } = getValues();
    setIsModalOpen(true);
    const instructions = await createInstructions({
      userWalletAddress: userWalletAddress!,
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
        type={"withdrawal"}
      />
      <WithdrawFromMeteora
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default WithdrawalScreen;

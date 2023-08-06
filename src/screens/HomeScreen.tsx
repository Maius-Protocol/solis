import { Screen } from "../components/Screen";
import { VaultRow } from "../components/VaultRow";
import { SetStateAction, useEffect, useState } from "react";
import { getAllVaultInfo } from "../service/meteora-vault";
import { tokenMap } from "../constants/token";
import { TokenRow } from "../components/TokenRow";
import { FlatList } from "react-native";

export function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const data = await getAllVaultInfo();
      const vaults: SetStateAction<any[]> = [];
      data.map((vault: any) => {
        const tokenInfo = tokenMap.find(
          (token) => token.address === vault.token_address,
        );
        if (tokenInfo && vault.closest_apy > 0) {
          vaults.push({
            vaultInfo: vault,
            tokenInfo: tokenInfo,
          });
        }
      });
      vaults.sort((a, b) =>
        a.vaultInfo.closest_apy > b.vaultInfo.closest_apy ? -1 : 1,
      );
      setData(vaults);
      setLoading(false);
    }

    fetch();
  }, []);
  return (
    <Screen>
      <FlatList
        style={{ flex: 1 }}
        data={data}
        keyExtractor={(item) => item.vaultInfo}
        renderItem={({ item }) => {
          return (
            <VaultRow
              tokenName={item.tokenInfo.symbol}
              tokenImage={item.tokenInfo.logoURI ?? ""}
              apy={item.vaultInfo.closest_apy}
            ></VaultRow>
          );
        }}
      />
    </Screen>
  );
}

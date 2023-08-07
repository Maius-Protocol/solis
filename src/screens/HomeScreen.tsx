import { Screen } from "../components/Screen";
import { VaultRow } from "../components/VaultRow";
import { SetStateAction, useEffect, useState } from "react";
import { getAllVaultInfo } from "../service/meteora-vault";
import { tokenMap } from "../constants/token";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  Text,
  View,
} from "react-native";
import {
  createStackNavigator,
  StackCardStyleInterpolator,
} from "@react-navigation/stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import tw from "twrnc";

type RootStackParamList = {
  List: {};
  Detail: { pubkey: string };
};

const Stack = createStackNavigator<RootStackParamList>();

function FullScreenLoadingIndicator() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
}

function useAllVaultData() {
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

  return { data, loading };
}

function List({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "List">) {
  const { data, loading } = useAllVaultData();

  const handlePressVaultRow = (pubkey: string) => {
    navigation.push("Detail", { pubkey });
  };

  if (loading) {
    return <FullScreenLoadingIndicator />;
  }

  const ItemSeparatorComponent = () => (
    <View
      style={{ marginVertical: 8, borderColor: "#eee", borderBottomWidth: 1 }}
    />
  );

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
              vaultKey={item.vaultInfo.pubkey}
              onPress={handlePressVaultRow}
            ></VaultRow>
          );
        }}
      />
    </Screen>
  );
}

function Detail({
  route,
}: NativeStackScreenProps<RootStackParamList, "Detail">) {
  const { data, loading } = useAllVaultData();
  const { pubkey } = route.params;

  if (loading) {
    return <FullScreenLoadingIndicator />;
  }

  const item = data.find((d) => d.vaultInfo.pubkey === pubkey);

  if (!item) {
    return null;
  }

  return (
    <Screen>
      <View style={tw`bg-yellow-100 items-center justify-center p-4`}>
        <Image source={{ uri: item.image }} style={tw`w-8 h-8 rounded m-4`} />
        <Text style={tw`font-bold text-lg`}>{item.name}</Text>
        <Text style={tw`font-bold text-lg`}>Symbol: {item.symbol}</Text>
        <Text style={tw`font-bold text-lg`}>
          Total supply: {item.total_supply}
        </Text>
        <Text style={tw`font-bold text-lg`}>All time high: {item.ath}</Text>
      </View>
    </Screen>
  );
}

const forSlide: StackCardStyleInterpolator = ({
  current,
  next,
  inverted,
  layouts: { screen },
}) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: "clamp",
        })
      : 0,
  );

  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.width, // Focused, but offscreen in the beginning
                0, // Fully focused
                screen.width * -0.3, // Fully unfocused
              ],
              extrapolate: "clamp",
            }),
            inverted,
          ),
        },
      ],
    },
  };
};

export const VaultListNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        cardStyleInterpolator: forSlide,
      }}
    >
      <Stack.Screen name="List" component={List} options={{ title: "Home" }} />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{ title: "Vault Detail" }}
      />
    </Stack.Navigator>
  );
};

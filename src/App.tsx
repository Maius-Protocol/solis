import { registerRootComponent } from "expo";
import { RecoilRoot } from "recoil";
import { ActivityIndicator, View } from "react-native";
import { Raleway_300Light, useFonts } from "@expo-google-fonts/dev";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationScreen from "./screens/NavigationScreen/NavigationScreen";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  let [fontsLoaded] = useFonts({
    Raleway_300Light,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <NavigationScreen />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default registerRootComponent(App);

import { registerRootComponent } from "expo";
import { RecoilRoot } from "recoil";
import { ActivityIndicator, View } from "react-native";
import { useFonts } from "@expo-google-fonts/dev";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NavigationScreen from "./screens/NavigationScreen/NavigationScreen";
import { ConfigProvider } from "antd";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  defineElement(lottie.loadAnimation);
  let [fontsLoaded] = useFonts({});

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <RecoilRoot>
      <ConfigProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationScreen />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ConfigProvider>
    </RecoilRoot>
  );
}

export default registerRootComponent(App);

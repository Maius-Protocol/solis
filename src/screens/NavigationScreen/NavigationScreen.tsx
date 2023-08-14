import { RouteNames } from "../../util/routes";
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../HomeScreen/HomeScreen";
import {
  createStackNavigator,
  StackCardStyleInterpolator,
} from "@react-navigation/stack";
import { Animated } from "react-native";
import { SolisTheme } from "../../constants/theme";
import DepositScreen from "../DepositScreen/DepositScreen";
import SolisAppHeaderLite from "../../components/SolisAppHeader/SolisAppHeaderLite";
import WithdrawalScreen from "../WithdrawalScreen/WithdrawalScreen";
import TransferScreen from "../TransferScreen/TransferScreen";
import BuyScreen from "../BuyScreen/BuyScreen";
import DetailCollectionScreen from "../CollectionScreen/DetailCollection";

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

const Stack = createStackNavigator();

const NavigationScreen = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            animationTypeForReplace: "push",
            cardStyle: { backgroundColor: SolisTheme.background },
            animationEnabled: true,
            cardStyleInterpolator: forSlide,
            header: () => <SolisAppHeaderLite />,
          }}
          initialRouteName={RouteNames.HOME}
        >
          <Stack.Screen
            name={RouteNames.WELCOME}
            options={{
              headerTitle: () => <></>,
              headerShown: false,
            }}
            component={WelcomeScreen}
          />
          <Stack.Screen
            name={RouteNames.HOME}
            options={{
              headerTitle: () => <></>,
              headerShown: false,
            }}
            component={HomeScreen}
          />
          <Stack.Screen name={RouteNames.DEPOSIT} component={DepositScreen} />
          <Stack.Screen
            name={RouteNames.WITHDRAWAL}
            component={WithdrawalScreen}
          />
          <Stack.Screen name={RouteNames.TRANSFER} component={TransferScreen} />
          <Stack.Screen name={RouteNames.BUY} component={BuyScreen} />
          <Stack.Screen
            name={RouteNames.DETAIL_COLLECTION}
            component={DetailCollectionScreen}
          />
        </Stack.Navigator>
        {/*<TabNavigator />*/}
      </NavigationContainer>
    </>
  );
};

export default NavigationScreen;

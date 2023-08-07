import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RouteNames } from "../../util/routes";
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../HomeScreen/HomeScreen";

const Stack = createNativeStackNavigator();

const NavigationScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: "#F9F9F9" } }}
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
      </Stack.Navigator>
      {/*<TabNavigator />*/}
    </NavigationContainer>
  );
};

export default NavigationScreen;

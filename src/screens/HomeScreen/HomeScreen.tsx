import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TokenListNavigator } from "../TokenNavigator";
import { ExamplesScreens } from "../ExamplesScreen";
import DashboardScreen from "./DashboardScreen";
import { RouteNames } from "../../util/routes";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={RouteNames.DASHBOARD}
      screenOptions={{
        tabBarActiveTintColor: "#0057eb",
        headerTitle: () => <></>,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={RouteNames.DASHBOARD}
        component={DashboardScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="List"
        component={TokenListNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Tokens",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bank" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Examples"
        component={ExamplesScreens}
        options={{
          tabBarLabel: "Examples",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
  1;
}

const HomeScreen = () => {
  return <TabNavigator />;
};

export default HomeScreen;

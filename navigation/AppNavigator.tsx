import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import WorkHistoryScreen from "../screens/WorkHistoryScreen";
import AccountSettingsScreen from "../screens/AccountSettingsScreen";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
      />

      <Stack.Screen
        name="AccountSettings"
        component={AccountSettingsScreen}
      />

      <Stack.Screen
        name="WorkHistory"
        component={WorkHistoryScreen}
      />
    </Stack.Navigator>
  );
}
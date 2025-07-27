import "./global.css";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GradientIcon } from "./components/UI_Common/Gradients/GradientIcon";
import { GradientText } from "./components/UI_Common/Gradients/GradientText";
import { GradientHeaderTitle } from "./components/UI_Common/Gradients/GradientHeaderTitle";

// Import screens
import HomeScreen from "./screens/HomeScreen";
import ProductsScreen from "./screens/ProductsScreen";
import RoutinesScreen from "./screens/RoutinesScreen";
import BudgetScreen from "./screens/BudgetScreen";

import SkinProfileScreen from "./components/Home_Screen/Phase1_SkinProfile/SkinProfileScreen";
import ScanFaceScreen from "./components/Home_Screen/Phase2_ScanFace/ScanFaceScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="MainHome"
        component={HomeScreen}
        options={{ title: "Seraface" }}
      />
      <Stack.Screen
        name="SkinProfile"
        component={SkinProfileScreen}
        options={{ title: "Skin Profile" }}
      />
      <Stack.Screen
        name="ScanFace"
        component={ScanFaceScreen}
        options={{ title: "Scan Face" }}
      />
    </Stack.Navigator>
  );
}

// Main App with Bottom Tab Navigation
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeStackNavigator}
            options={{
              tabBarLabel: ({ focused }) => (
                <GradientText
                  text={"Home"}
                  focused={focused}
                  style={{ fontSize: 12 }}
                />
              ),
              title: "SerafaceAI",
              tabBarIcon: ({ focused }) => (
                <GradientIcon name={"home"} size={24} focused={focused} />
              ),
            }}
          />
          <Tab.Screen
            name="Products"
            component={ProductsScreen}
            options={{ tabBarLabel: "Products", title: "Recommendations" }}
          />
          <Tab.Screen
            name="Routine"
            component={RoutinesScreen}
            options={{ tabBarLabel: "Routine", title: "Your Routine" }}
          />
          <Tab.Screen
            name="Budget"
            component={BudgetScreen}
            options={{ tabBarLabel: "Budget", title: "Budget Planner" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

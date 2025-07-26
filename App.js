import "./global.css";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// Import screens
import HomeScreen from "./screens/HomeScreen";
import ProductsScreen from "./screens/ProductsScreen";
import RoutinesScreen from "./screens/RoutinesScreen";
import BudgetScreen from "./screens/BudgetScreen";

// Import phase screens (adjust the imports according to your actual file structure)
// These are placeholders - replace with your actual screen components
import SkinProfileScreen from "./components/Home_Screen/Phase1_SkinProfile/SkinProfileScreen";
import ScanFaceScreen from "./components/Home_Screen/Phase2_ScanFace/ScanFaceScreen";
import ScanFaceImageScreen from "./components/Home_Screen/Phase3_ScanFace/ScanFaceImageScreen";

import Colors from "./constants/colors";

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Home Stack Navigator with the 3 phases
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
      {/* <Stack.Screen
        name="ScanFaceImage"
        component={ScanFaceImageScreen}
        options={{ title: "Skin Profile" }}
      /> */}
    </Stack.Navigator>
  );
}

// Main App with Bottom Tab Navigation
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator
          // tabBar={(props) => <CustomTabBar {...props} />}
          screenOptions={{}}
        >
          <Tab.Screen
            name="Home"
            component={HomeStackNavigator}
            options={{ title: "Home" }}
          />
          <Tab.Screen
            name="Products"
            component={ProductsScreen}
            options={{ title: "Recommendations" }}
          />
          <Tab.Screen
            name="Routine"
            component={RoutinesScreen}
            options={{ title: "Your Routine" }}
          />
          <Tab.Screen
            name="Budget"
            component={BudgetScreen}
            options={{ title: "Budget Planner" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

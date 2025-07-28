import "./global.css";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GradientIcon } from "./components/UI_Common/Gradients/GradientIcon";
import { GradientText } from "./components/UI_Common/Gradients/GradientText";
import { GradientHeaderTitle } from "./components/UI_Common/Gradients/GradientHeaderTitle";

import HomeScreen from "./screens/HomeScreen";
import ProductsScreen from "./screens/ProductsScreen";
import RoutinesScreen from "./screens/RoutinesScreen";
import BudgetScreen from "./screens/BudgetScreen";

import SkinProfileScreen from "./components/Home_Screen/Phase1_SkinProfile/SkinProfileScreen";
import ScanFaceScreen from "./components/Home_Screen/Phase2_ScanFace/ScanFaceScreen";
import Colors from "./constants/colors";
import { Pressable, View } from "react-native";
import { GradientView } from "./components/UI_Common/Gradients/GradientView";
import TabBarLabel from "./components/UI_Common/Commons/TabBarLabel";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.mainBackground, // Using your existing color constant
  },
};

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

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: Colors.background,
              height: 67,
              paddingTop: 6,
            },
            headerStyle: {
              backgroundColor: Colors.background,
              height: 80,
            },
            tabBarButton: (props) => (
              <Pressable
                {...props}
                android_ripple={{
                  color: Colors.primary200,
                  borderless: true,
                }}
              />
            ),
            headerTitleContainerStyle: {
              flex: 1,
              margin: 0,
              padding: 0,
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeStackNavigator}
            options={{
              headerTitle: () => <GradientHeaderTitle title={"SerafaceAI"} />,
              tabBarIcon: ({ focused }) => (
                <GradientIcon name={"home"} size={28} focused={focused} />
              ),
              tabBarLabel: ({ focused }) => (
                <TabBarLabel text={"Home"} focused={focused} />
              ),
            }}
          />
          <Tab.Screen
            name="Products"
            component={ProductsScreen}
            options={{
              headerTitle: () => (
                <GradientHeaderTitle title={"Recommendations"} />
              ),
              tabBarIcon: ({ focused }) => (
                <GradientIcon name={"cube"} size={28} focused={focused} />
              ),
              tabBarLabel: ({ focused }) => (
                <TabBarLabel text={"Products"} focused={focused} />
              ),
            }}
          />
          <Tab.Screen
            name="Routine"
            component={RoutinesScreen}
            options={{
              headerTitle: () => <GradientHeaderTitle title={"Your Routine"} />,
              tabBarIcon: ({ focused }) => (
                <GradientIcon name={"time"} size={28} focused={focused} />
              ),
              tabBarLabel: ({ focused }) => (
                <TabBarLabel text={"Routine"} focused={focused} />
              ),
            }}
          />
          <Tab.Screen
            name="Budget"
            component={BudgetScreen}
            options={{
              headerTitle: () => (
                <GradientHeaderTitle title={"Budget Planner"} />
              ),
              tabBarIcon: ({ focused }) => (
                <GradientIcon name={"wallet"} size={28} focused={focused} />
              ),
              tabBarLabel: ({ focused }) => (
                <TabBarLabel text={"Products"} focused={focused} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

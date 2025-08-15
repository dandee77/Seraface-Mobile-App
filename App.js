import "./global.css";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, View } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GradientIcon } from "./components/UI_Common/Gradients/GradientIcon";
import { GradientHeaderTitle } from "./components/UI_Common/Gradients/GradientHeaderTitle";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Redux setup
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

import HomeScreen from "./screens/Major_Screens/HomeScreen";
import ProductsScreen from "./screens/Major_Screens/ProductsScreen";
import RoutinesScreen from "./screens/Major_Screens/RoutinesScreen";
import BudgetScreen from "./screens/Major_Screens/BudgetScreen";

import SkinProfileScreen from "./screens/Minor_Screens/Home/SkinProfileScreen";
import ScanFaceScreen from "./screens/Minor_Screens/Home/ScanFaceScreen";
import ResultScreen from "./screens/Minor_Screens/Home/ResultScreen";
import ProductScreen from "./screens/Minor_Screens/Products/ProductScreen";
import Colors from "./constants/colors";
import TabBarLabel from "./components/UI_Common/Commons/TabBarLabel";

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.mainBackground,
  },
};

// Custom Bottom Navigation Component
function CustomBottomNavigation({ currentRoute }) {
  const navigation = useNavigation();

  const getCurrentTab = () => {
    const routeName = currentRoute;
    if (
      routeName === "Home" ||
      routeName === "SkinProfile" ||
      routeName === "ScanFace" ||
      routeName === "Result"
    )
      return "Home";
    if (routeName === "Products" || routeName === "Product") return "Products";
    if (routeName === "Routines") return "Routines";
    if (routeName === "Budget") return "Budget";
    return "Home";
  };

  const currentTab = getCurrentTab();

  const handleTabPress = (tabName) => {
    switch (tabName) {
      case "Home":
        navigation.navigate("Home");
        break;
      case "Products":
        navigation.navigate("Products", {
          recommendations: null,
          sessionId: null,
        });
        break;
      case "Routines":
        navigation.navigate("Routines");
        break;
      case "Budget":
        navigation.navigate("Budget");
        break;
    }
  };

  return (
    <View
      style={{
        backgroundColor: Colors.background,
        height: 67,
        paddingTop: 6,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Pressable
        onPress={() => handleTabPress("Home")}
        style={{ alignItems: "center", flex: 1 }}
        android_ripple={{ color: Colors.primary200, borderless: true }}
      >
        <GradientIcon name={"home"} size={28} focused={currentTab === "Home"} />
        <TabBarLabel text={"Home"} focused={currentTab === "Home"} />
      </Pressable>

      <Pressable
        onPress={() => handleTabPress("Products")}
        style={{ alignItems: "center", flex: 1 }}
        android_ripple={{ color: Colors.primary200, borderless: true }}
      >
        <GradientIcon
          name={"cube"}
          size={28}
          focused={currentTab === "Products"}
        />
        <TabBarLabel text={"Products"} focused={currentTab === "Products"} />
      </Pressable>

      <Pressable
        onPress={() => handleTabPress("Routines")}
        style={{ alignItems: "center", flex: 1 }}
        android_ripple={{ color: Colors.primary200, borderless: true }}
      >
        <GradientIcon
          name={"time"}
          size={28}
          focused={currentTab === "Routines"}
        />
        <TabBarLabel text={"Routine"} focused={currentTab === "Routines"} />
      </Pressable>

      <Pressable
        onPress={() => handleTabPress("Budget")}
        style={{ alignItems: "center", flex: 1 }}
        android_ripple={{ color: Colors.primary200, borderless: true }}
      >
        <GradientIcon
          name={"wallet"}
          size={28}
          focused={currentTab === "Budget"}
        />
        <TabBarLabel text={"Budget"} focused={currentTab === "Budget"} />
      </Pressable>
    </View>
  );
}

function AppNavigator() {
  const [currentRoute, setCurrentRoute] = React.useState("Home");

  const handleNavigationStateChange = (state) => {
    if (state) {
      const currentRouteName = state.routes[state.index]?.name;
      if (currentRouteName) {
        setCurrentRoute(currentRouteName);
      }
    }
  };

  return (
    <NavigationContainer
      theme={MyTheme}
      onStateChange={handleNavigationStateChange}
    >
      <View style={{ flex: 1 }}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={({ navigation, route }) => ({
            headerShown: true,
            animation: "slide_from_right",
            headerLeft: () => null,
            headerRight: () => {
              if (route.name === "Result" || route.name === "Home") return null;
              return navigation.canGoBack() ? (
                <Pressable
                  onPress={() => navigation.goBack()}
                  style={{ marginRight: 15 }}
                  android_ripple={{
                    color: Colors.primary200,
                    borderless: true,
                  }}
                >
                  <GradientIcon
                    name="exit"
                    size={28}
                    focused={true}
                    style={{ transform: [{ rotate: "180deg" }] }}
                  />
                </Pressable>
              ) : null;
            },
          })}
        >
          {/* Home Stack Screens */}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerTitle: () => <GradientHeaderTitle title={"SerafaceAI"} />,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="SkinProfile"
            component={SkinProfileScreen}
            options={{
              headerTitle: () => <GradientHeaderTitle title={"Skin Profile"} />,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="ScanFace"
            component={ScanFaceScreen}
            options={{
              headerTitle: () => <GradientHeaderTitle title={"Scan Face"} />,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="Result"
            component={ResultScreen}
            options={{
              headerTitle: () => (
                <GradientHeaderTitle title={"Analysis Report"} />
              ),
              headerRight: () => null,
              headerBackVisible: false,
            }}
          />

          {/* Main Screens */}
          <Stack.Screen
            name="Products"
            component={ProductsScreen}
            options={{
              headerTitle: () => (
                <GradientHeaderTitle title={"Recommendations"} />
              ),
              headerBackVisible: false,
            }}
            initialParams={{ recommendations: null, sessionId: null }}
          />
          <Stack.Screen
            name="Routines"
            component={RoutinesScreen}
            options={{
              headerTitle: () => <GradientHeaderTitle title={"Your Routine"} />,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="Budget"
            component={BudgetScreen}
            options={{
              headerTitle: () => (
                <GradientHeaderTitle title={"Budget Planner"} />
              ),
              headerBackVisible: false,
            }}
          />

          {/* Detail Screens */}
          <Stack.Screen
            name="Product"
            component={ProductScreen}
            options={{
              headerTitle: () => (
                <GradientHeaderTitle title={"Product Details"} />
              ),
              headerBackVisible: false,
            }}
          />
        </Stack.Navigator>

        <CustomBottomNavigation currentRoute={currentRoute} />
      </View>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <StatusBar style="dark" />
            <AppNavigator />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

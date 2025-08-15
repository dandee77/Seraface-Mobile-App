// import { Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Hello World - App is Working!</Text>
//     </View>
//   );
// }

import "./global.css";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, View, Text, Alert } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GradientIcon } from "./components/UI_Common/Gradients/GradientIcon";
import { GradientHeaderTitle } from "./components/UI_Common/Gradients/GradientHeaderTitle";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Redux setup with error handling
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Import components with error handling
let store, persistor;
try {
  const storeModule = require("./store");
  store = storeModule.store;
  persistor = storeModule.persistor;
} catch (error) {
  console.error("Redux store import failed:", error);
}

// Import screens with error handling
let HomeScreen, ProductsScreen, RoutinesScreen, BudgetScreen;
let SkinProfileScreen, ScanFaceScreen, ResultScreen, ProductScreen;
let Colors, TabBarLabel, CommunityScreen, ChatFAB;

try {
  HomeScreen = require("./screens/Major_Screens/HomeScreen").default;
  ProductsScreen = require("./screens/Major_Screens/ProductsScreen").default;
  RoutinesScreen = require("./screens/Major_Screens/RoutinesScreen").default;
  BudgetScreen = require("./screens/Major_Screens/BudgetScreen").default;
  
  SkinProfileScreen = require("./screens/Minor_Screens/Home/SkinProfileScreen").default;
  ScanFaceScreen = require("./screens/Minor_Screens/Home/ScanFaceScreen").default;
  ResultScreen = require("./screens/Minor_Screens/Home/ResultScreen").default;
  ProductScreen = require("./screens/Minor_Screens/Products/ProductScreen").default;
  
  Colors = require("./constants/colors").default;
  TabBarLabel = require("./components/UI_Common/Commons/TabBarLabel").default;
  CommunityScreen = require("./screens/Major_Screens/CommunityScreen").default;
  ChatFAB = require("./components/UI_Common/Commons/ChatFAB").default;
} catch (error) {
  console.error("Component import failed:", error);
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    console.error('ErrorBoundary caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
    // In production, you might want to send this to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: 20,
          backgroundColor: '#f0f0f0'
        }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: 'bold', 
            marginBottom: 10,
            textAlign: 'center'
          }}>
            Something went wrong
          </Text>
          <Text style={{ 
            fontSize: 14, 
            textAlign: 'center',
            color: '#666',
            marginBottom: 20
          }}>
            The app encountered an error and needs to restart.
          </Text>
          <Text style={{ 
            fontSize: 12, 
            textAlign: 'center',
            color: '#999'
          }}>
            Please close and reopen the app.
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors?.mainBackground || '#FFFFFF',
  },
};

function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => ({
        headerShown: true,
        animation: "slide_from_right",
        headerLeft: () => null,
        headerRight: () => {
          if (route.name === "Result" || route.name === "MainHome") return null;
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
      <Stack.Screen
        name="MainHome"
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
          headerTitle: () => <GradientHeaderTitle title={"Analysis Report"} />,
          headerRight: () => null,
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function ProductsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => ({
        headerShown: true,
        animation: "slide_from_right",
        headerLeft: () => null,
        headerRight: () => {
          if (route.name === "Result" || route.name === "MainHome") return null;
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
      <Stack.Screen
        name="MainProducts"
        component={ProductsScreen}
        options={{
          headerTitle: () => <GradientHeaderTitle title={"Recommendations"} />,
          headerBackVisible: false,
        }}
        initialParams={{ recommendations: null, sessionId: null }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{
          headerTitle: () => <GradientHeaderTitle title={"Product Details"} />,
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  try {
    if (!Colors || !Tab || !NavigationContainer) {
      console.error('AppNavigator: Missing required dependencies');
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, textAlign: 'center' }}>
            Navigation Error: Missing dependencies
          </Text>
        </View>
      );
    }

    return (
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: Colors?.background || '#FFFFFF',
              height: 67,
              paddingTop: 6,
            },
            headerStyle: {
              backgroundColor: Colors?.background || '#FFFFFF',
              height: 85,
            },
            tabBarButton: (props) => (
              <Pressable
                {...props}
                android_ripple={{
                  color: Colors?.primary200 || '#CCCCCC',
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
            headerShown: false,
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
          component={ProductsStackNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <GradientIcon name={"cube"} size={28} focused={focused} />
            ),
            tabBarLabel: ({ focused }) => (
              <TabBarLabel text={"Products"} focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Budget"
          component={BudgetScreen}
          options={{
            headerTitle: () => <GradientHeaderTitle title={"Budget Planner"} />,
            tabBarIcon: ({ focused }) => (
              <GradientIcon name={"wallet"} size={28} focused={focused} />
            ),
            tabBarLabel: ({ focused }) => (
              <TabBarLabel text={"Budget"} focused={focused} />
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
        
      </Tab.Navigator>
    </NavigationContainer>
    );
  } catch (error) {
    console.error('AppNavigator error:', error);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, textAlign: 'center' }}>
          Navigation Error: {error.message}
        </Text>
      </View>
    );
  }
}

export default function App() {
  // Early return if critical dependencies failed to load
  if (!store || !persistor) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 20 }}>
          App Configuration Error
        </Text>
        <Text style={{ fontSize: 14, textAlign: 'center', color: '#666' }}>
          Failed to load core dependencies. Please restart the app.
        </Text>
      </View>
    );
  }

  if (!HomeScreen || !Colors) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 20 }}>
          Component Loading Error
        </Text>
        <Text style={{ fontSize: 14, textAlign: 'center', color: '#666' }}>
          Failed to load app components. Please restart the app.
        </Text>
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate 
          loading={
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Loading...</Text>
            </View>
          } 
          persistor={persistor}
          onBeforeLift={() => {
            console.log('Redux persist rehydration starting...');
          }}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
              <StatusBar style="dark" />
              <AppNavigator />
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}

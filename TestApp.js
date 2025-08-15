import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

// Test each critical component one by one
const TestApp = () => {
  try {
    // Test 1: Basic React Native components
    console.log('Test 1: Basic components loaded');
    
    // Test 2: Try to load Colors
    let Colors;
    try {
      Colors = require('./constants/colors').Colors;
      console.log('Test 2: Colors loaded successfully', Colors ? 'Yes' : 'No');
    } catch (error) {
      console.error('Test 2: Colors failed to load:', error);
      Colors = { background: '#FFFFFF', primary200: '#CCCCCC' };
    }

    // Test 3: Try to load Redux store
    let store;
    try {
      store = require('./store').store;
      console.log('Test 3: Store loaded successfully', store ? 'Yes' : 'No');
    } catch (error) {
      console.error('Test 3: Store failed to load:', error);
    }

    // Test 4: Try to load screens
    let HomeScreen;
    try {
      HomeScreen = require('./screens/Major_Screens/HomeScreen').default;
      console.log('Test 4: HomeScreen loaded successfully', HomeScreen ? 'Yes' : 'No');
    } catch (error) {
      console.error('Test 4: HomeScreen failed to load:', error);
    }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors?.background || '#FFFFFF' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
            SeraFace Test App
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            ✅ Basic React Native components: Working
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            {Colors ? '✅' : '❌'} Colors: {Colors ? 'Loaded' : 'Failed'}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            {store ? '✅' : '❌'} Redux Store: {store ? 'Loaded' : 'Failed'}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            {HomeScreen ? '✅' : '❌'} HomeScreen: {HomeScreen ? 'Loaded' : 'Failed'}
          </Text>
          <View style={{ marginTop: 20, padding: 15, backgroundColor: '#f0f0f0', borderRadius: 8 }}>
            <Text style={{ fontSize: 14, textAlign: 'center' }}>
              Check console logs for detailed error information
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );

  } catch (error) {
    console.error('TestApp crashed:', error);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: 'red' }}>
            App Crashed
          </Text>
          <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 20 }}>
            Error: {error.message}
          </Text>
          <Text style={{ fontSize: 14, textAlign: 'center', color: '#666' }}>
            Check console for full error details
          </Text>
        </View>
      </SafeAreaView>
    );
  }
};

export default TestApp;

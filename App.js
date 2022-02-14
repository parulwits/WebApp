/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useRef } from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Initial from './src/containers/Initial';
import TermsAndConditions from './src/containers/TermsAndConditions';
import WebScreen from './src/containers/WebScreen';
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const AuthStack = createNativeStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={screenOptions} >
      <AuthStack.Screen name="Initial" component={Initial} options={{ headerShown: false }} />
      <AuthStack.Screen name="TermsAndConditions" component={TermsAndConditions} options={{ headerShown: false }} />
      <AuthStack.Screen name="WebScreen" component={WebScreen} options={{ headerShown: false }} />

    </AuthStack.Navigator>
  );
}
const RootStack = createNativeStackNavigator();

function AppContainer() {
  return (
    <NavigationContainer initialRouteName='Initial'>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Auth" component={AuthStackScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
};
  return (
        <SafeAreaView style={backgroundStyle}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>
          </ScrollView>
          <AppContainer/>
        </SafeAreaView>
  );
};

export default App;


import * as React from 'react';
import Initial from './src/containers/Initial';
import TermsAndConditions from './src/containers/TermsAndConditions';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Initial" component={Initial} options={{ headerShown: false }}/>
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import type { Node } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Provider, useDispatch, useSelector } from 'react-redux'
import {store, persistor} from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <UserInfo />
        </ScrollView>
      </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

function UserInfo() {

  const user = useSelector((state) => state.userReducer.user)
  const dispatch = useDispatch();

  const [first_name, setFirstName] = useState()
  const [last_name, setLastName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()

  submit = () => {
    const data = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone
    }
    dispatch({ type: 'SET_USER', payloads: data })
  }
  return (
    <View style={{ margin: 50 }}>
      {user?.first_name ?
        <View>
          <Text>First Name: {user?.first_name}</Text>
          <Text>Last Name: {user?.last_name}</Text>
          <Text>Email: {user?.email}</Text>
          <Text>Phone: {user?.phone}</Text>
          <Button
            onPress={() => dispatch({ type: 'USER_SUBMITED', payloads: {} })}
            title="Reset"
          />
        </View>
        :
        <View>
          <TextInput
            style={styles.textBox}
            onChangeText={(value) => setFirstName(value)}
            value={first_name}
            placeholder='First Name'
          />
          <TextInput
            style={styles.textBox}
            onChangeText={(value) => setLastName(value)}
            value={last_name}
            placeholder='Last Name'
          />
          <TextInput
            keyboardType='email-address'
            style={styles.textBox}
            onChangeText={(value) => setEmail(value)}
            value={email}
            placeholder='Email'
          />
          <TextInput
            keyboardType='phone-pad'
            style={styles.textBox}
            onChangeText={(value) => setPhone(value)}
            value={phone}
            placeholder='Phone Number'
          />
          <Button
            onPress={() => submit()}
            title="Submit"
          />
        </View>
      }
    </View>
  )
}
const styles = StyleSheet.create({
  textBox: {
    borderWidth: 1,
    padding: 15,
    margin: 20
  }
});

export default App;

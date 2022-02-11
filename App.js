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
  Button,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
const { height, width } = Dimensions.get('window');
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
            {/* <UserInfo /> */}
            {/* <Directions /> */}
            <Chunks />
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
  reset = () => {
    setEmail();
    setFirstName();
    setLastName();
    setPhone();
    dispatch({ type: 'USER_SUBMITED', payloads: {} })
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
            onPress={() => reset()}
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

function Directions() {
  const origin = { latitude: 37.3318456, longitude: -122.0296002 };
  const destination = { latitude: 37.771707, longitude: -122.4053769 };
  const GOOGLE_MAPS_APIKEY = 'AIzaSyCxvKKhSh379jxDPtIBzHMmPjoUO9gSCbQ';

  return (
    <MapView initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}>
      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={GOOGLE_MAPS_APIKEY}
      />
    </MapView>
  )
}

function Chunks() {
  const [joke, setJokes] = useState()
  const [list, setList] = useState([])
  const ref = useRef();
  const previousJoke = getPreviousJoke(joke)
  function getPreviousJoke(value){
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }

  useEffect(() => {
    getData()
  }, [])

  getData=()=>{
    fetch('https://api.chucknorris.io/jokes/random')
      .then(response => response.json())
      .then(data => {
        setJokes(data.value)
        list.push(data.value)
      });
  }
  showNext = () => {
    if(list.length > 1){
      const index = list.indexOf(joke)
      if(index!== list.length-1){
        setJokes(list[index+1])
      }else{
        getData()
      }     
    }else{
    getData()
    }
  }
  showPrevious = () => {
    if(list.length >1){
      const index = list.indexOf(joke)
      if(index!==0){
      setJokes(list[index-1])
      }else{
        // do nothing
      }
    }
  }
  return (
    <View style={{ height: height * 0.8, marginHorizontal: 20, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{joke}</Text>
    
      <View style={{ width:'100%',margin:20,flexDirection:'row', justifyContent:'space-around' }}>
        <Button
          onPress={() => showPrevious()}
          title="Previous"
        />
        <Button
          onPress={() => showNext()}
          title="Next"
        />
      </View>

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

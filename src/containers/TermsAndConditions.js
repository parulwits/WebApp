// import React from "react";
// import WebView from "react-native-webview";
// import { useBridge } from "react-native-react-bridge";
// import webApp from "./WebScreen";

// const TermsAndConditions = (props) => {
//   // useBridge hook create props for WebView and handle communication
//   // The argument is callback to receive message from React
//     const { ref, onMessage, emit } = useBridge((message) => {
//         console.log('message from WebApp', message)
//     // emit sends message to React
//     //   type: event name
//     //   data: some data which will be serialized by JSON.stringify
//     if (message.type === "formData") {
//       emit({ type: "success", data: "succeeded!" });
//       props.navigation.navigate('Initial',{data: message.data})
//     }
//   });

//   return (
//     <WebView
//       // ref, source and onMessage must be passed to react-native-webview
//       ref={ref}
//       // Pass the source code of React app
//       source={{ html: webApp }}
//       onMessage={onMessage}
//     />
//   );
// };

// export default TermsAndConditions;

import React, {useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';

const App = (props) => {
  function onMessage(data) {
    props.navigation.navigate('Initial',{data: JSON.parse(data.nativeEvent.data)})
  }

  function sendDataToWebView() {
    webviewRef.current.postMessage('Data from React Native App');
  }

  const webviewRef = useRef();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => sendDataToWebView()}
          style={{
            padding: 20,
            width: 300,
            marginTop: 100,
            backgroundColor: '#6751ff',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, color: 'white'}}>
            Send Data To WebView / Website
          </Text>
        </TouchableOpacity>
      </View>
      <WebView
        ref={webviewRef}
        scalesPageToFit={false}
        mixedContentMode="compatibility"
        onMessage={onMessage}
        source={{uri: 'http://localhost:3000/' }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
// --------------Without Brige---------------
import React, { useState, useRef, useLayoutEffect } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview';

const TermsAndConditions = ({ navigation }) => {

  const [data, setData] = useState()
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (<Button
        onPress={() => navigation.navigate('Initial', { data: data })}
        title="Go Back"
      />),
    });
  }, [navigation, data]);
  function onMessage(data) {
    setData(JSON.parse(data.nativeEvent.data))
    webviewRef.current.postMessage('Data from React Native App');
  }

  const webviewRef = useRef();
  const INJECTED_JAVASCRIPT = `(function() {
    const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);
  })();`;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        ref={webviewRef}
        onMessage={onMessage}
        source={{ uri: 'http://localhost:3000/' }}
        scrollEnabled={false}
        injectedJavaScript={INJECTED_JAVASCRIPT}
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

export default TermsAndConditions;

// --------------With Brige---------------

// import React from "react";
// import WebView from "react-native-webview";
// import { useBridge } from "react-native-react-bridge";
// import webApp from "./WebScreen";

// const TermsAndConditions = ({navigation}) => {
//   // useBridge hook create props for WebView and handle communication
//   // The argument is callback to receive message from React
//     const { ref, onMessage, emit } = useBridge((message) => {
//         console.log('message from WebApp', message)
//     // emit sends message to React
//     //   type: event name
//     //   data: some data which will be serialized by JSON.stringify
//     if (message.type === "formData") {
//       emit({ type: "success", data: "succeeded!" });
//       navigation.navigate('Initial',{data: message.data})
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
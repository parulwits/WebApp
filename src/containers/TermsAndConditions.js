import React from "react";
import WebView from "react-native-webview";
import { useBridge } from "react-native-react-bridge";
import webApp from "./WebScreen";

const TermsAndConditions = (props) => {
  // useBridge hook create props for WebView and handle communication
  // The argument is callback to receive message from React
    const { ref, onMessage, emit } = useBridge((message) => {
        console.log('message from WebApp', message)
    // emit sends message to React
    //   type: event name
    //   data: some data which will be serialized by JSON.stringify
    if (message.type === "formData") {
      emit({ type: "success", data: "succeeded!" });
      props.navigation.navigate('Initial',{data: message.data})
    }
  });

  return (
    <WebView
      // ref, source and onMessage must be passed to react-native-webview
      ref={ref}
      // Pass the source code of React app
      source={{ html: webApp }}
      onMessage={onMessage}
    />
  );
};

export default TermsAndConditions;
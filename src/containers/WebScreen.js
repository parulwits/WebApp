import React, { useState } from "react";
import {
  webViewRender,
  emit,
  useSubscribe,
} from "react-native-react-bridge/lib/web";
import './App.css'
const Root = () => {
  const [data, setData] = useState("");
  // useSubscribe hook receives message from React Native
  useSubscribe((message) => {
    console.log('message from App', message)
    if (message.type === "success") {
      setData(message.data);
    }
  });
  const onSubmit = () => {
    alert('ffffff')
    emit({ type: "hello", data: 123 });
  };
  return (
    <div className='container'>
      <div className='wrapper'>
        Information Form {data}
        <form onSubmit={onSubmit}>
          <div className='form_section'>
            <input type='text' placeholder='Name'></input>
            <input type='text' placeholder='Age'></input>
            <input type='text' placeholder='City'></input>
            <input type='number' placeholder='Phone No.'></input>
            <input type='submit'></input>
          </div>
        </form>
      </div>
    </div>
  );
};

// This statement is detected by babelTransformer as an entry point
// All dependencies are resolved, compressed and stringified into one file
export default webViewRender(<Root />);
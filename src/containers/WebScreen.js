import React from "react";
import {
  webViewRender,
  emit,
  useSubscribe,
} from "react-native-react-bridge/lib/web";
import { useForm } from 'react-hook-form';
import './App.css'
const Root = () => {
  // useSubscribe hook receives message from React Native
  useSubscribe((message) => {
    console.log('message', message)
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    emit({ type: "formData", data: data });
  };
  return (
    <div className='container'>
      <div className='wrapper'>
        Information Form
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form_section'>
            <input
              type='text'
              name='name'
              placeholder='Name'
              {...register('name')}></input>
            <input
              type='text'
              name='age'
              placeholder='Age'
              {...register('age')}></input>
            <input
              type='text'
              name='city'
              placeholder='City'
              {...register('city')}></input>
            <input
              type='number'
              name='phone_number'
              placeholder='Phone No.'
              {...register('phone_number')}></input>
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


import React, { useState } from 'react';
import {StyleSheet,Text, View,} from 'react-native';
export default function Initial() {
  
    return (
      <View style={styles.bg}>
         <Text>Hello</Text>
      </View>
    )
  }

  const styles = StyleSheet.create({
    bg: {
      flex:1,
     backgroundColor:'red'
    }
  });
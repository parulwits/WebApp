import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
export default function Initial({ route, navigation }) {
  const formData = route?.params?.data;
  return (
    <View style={styles.bg}>
      {formData ?
        <View style={{flex:0.3}}>
          <Text>Name: {formData?.name}</Text>
          <Text>Age: {formData?.age}</Text>
          <Text>City: {formData?.city}</Text>
          <Text>Phone: {formData?.phone_number}</Text>
        </View>
        : null}
      <View style={styles.banner}>
        <Text style={{ color: 'blue' }} onPress={() => navigation.navigate('TermsAndConditions')}>Tap the banner !</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 100,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
  }
});
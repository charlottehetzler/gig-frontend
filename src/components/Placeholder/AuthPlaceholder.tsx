import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GigColors } from '../../constants/colors';
import { AuthButtons } from '../Button/AuthButtons';

export default function AuthPlaceholder (props:any) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>{props.title}</Text>
      <AuthButtons />
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    marginHorizontal: 20
  },
  title: {
    fontSize: 20,
    marginTop: 100,
    textAlign: 'center',
    color: GigColors.DarkGrey
  },
  signupText: {
    fontSize: 20,
    textAlign: 'center',
    color: GigColors.Black, 
    fontWeight: '500'
  },
  loginText: {
    fontSize: 20,
    textAlign: 'center',
    color: GigColors.DarkGrey, 
    fontWeight: '500'
  },
  buttons: {
    marginTop: 50
  }
});
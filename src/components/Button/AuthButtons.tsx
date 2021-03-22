import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GigColors } from '../../constants/colors';

export function AuthButtons (props: any) {
    return (
        <View style={styles.buttons}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
                <Text style={styles.signupText}>Signup here</Text>
            </TouchableOpacity>
            <Text style={{textAlign: 'center', color: GigColors.DarkGrey, marginTop: 25, marginBottom: 5}}>Already have an account?</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
         </View>
    )
}

const styles = StyleSheet.create({
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
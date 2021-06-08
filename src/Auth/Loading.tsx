import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, AsyncStorage } from "react-native";
import { useDispatch } from 'react-redux';
import { AUTHENTICATE } from '../redux/actions/user';
import { GigColors } from '../constants/colors';

export default function LoadingScreen (props:any) {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        return;
      }
      const transformedData = JSON.parse(userData);
      const { userId, token, userType } = transformedData;
      if (!userId || !token) {
        return;
      }
      
      // props.navigation.navigate('HomeScreen');
      dispatch({
        type: AUTHENTICATE, 
        token: token, 
        userId: userId, 
        isLoggedIn: true,
        userType: userType
      });
    }
    tryLogin();
  }, [dispatch])

  return (
    <View style={styles.center}>
      {/* <Text style={styles.title}>Loading...</Text> */}
      <ActivityIndicator size="small" color={GigColors.Blue} style={{alignItems:'center', justifyContent:'center'}}/>
    </View>
  );
};
    
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
});
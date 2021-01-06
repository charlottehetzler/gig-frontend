import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, AsyncStorage } from "react-native";
import { useDispatch } from 'react-redux';
import { AUTHENTICATE } from '../../redux/actions/user';

export default function LoadingScreen (props:any) {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData : string = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.navigate('Login');
        return;
      }
      const transformedData = JSON.parse(userData);
      const { userId, token } = transformedData;
      if (!userId || !token) {
        props.navigation.navigate('Login');
        return;
      }
      props.navigation.navigate('HomeScreen');
      dispatch({
        type: AUTHENTICATE, 
        token: token, 
        userId: userId, 
        isLoggedIn: true
      });
    }
    tryLogin();
  }, [dispatch])

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Loading...</Text>
      <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>
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
import React, { useEffect, useState } from 'react';
import { AuthNavigator } from './Auth';
import LoadingScreen from '../Auth/Loading';
import MainNavigator from './Main';
import { NavigationContainer } from '@react-navigation/native';
import { GigColors } from '../constants/colors';

import firebase from 'firebase';

function AppNavigator(props: any) {
  const [isAuth, setIsAuth] = useState('')
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        const uid = user.uid;

        setIsAuth(uid)
        setLoader(false)
        console.log('onAuthStateChanged')
        // ...
      } else {
        setIsAuth('')
        setLoader(false)

      }
    });
  }, []);

  const MyTheme = {
    colors: {
      background: GigColors.Greyish,
    }
  };

  if (loader) {
    return <LoadingScreen />

  }
  return (
    <NavigationContainer theme={MyTheme}>
      {
        isAuth ?
          <MainNavigator />
          :
          <AuthNavigator />
      }
    </NavigationContainer>
  );
}

export default AppNavigator;
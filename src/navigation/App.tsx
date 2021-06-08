import React from 'react';
import { useSelector } from 'react-redux';
import { AuthNavigator } from './Auth';
import LoadingScreen from '../Auth/Loading';
import { MainNavigator } from './Main';
import { NavigationContainer } from '@react-navigation/native';
import { GigColors } from '../constants/colors';


export function AppNavigator (props: any) {
    const isAuth = useSelector((state: any) => !!state.user.token);
    const didTryAutoLogin = useSelector((state: any) => state.user.didTryAutoLogin);

    const MyTheme = {
        colors: {
          background: GigColors.Greyish,
        }
      };

    return (
        <NavigationContainer theme={MyTheme}>
            {isAuth && <MainNavigator/>}
            {!isAuth && didTryAutoLogin && <AuthNavigator/>}
            {!isAuth && !didTryAutoLogin && <LoadingScreen/> }
        </NavigationContainer>
    );
}
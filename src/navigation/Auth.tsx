import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import SigninScreen from "../Auth/Signin";
import SignupScreen from "../Auth/Signup";
import DecisionScreen from '../Auth/Decision';
import LoadingScreen from '../Auth/Loading';
import UpdateProfileScreen from '../Auth/UpdateProfile';
import ProfileCreationScreen from '../Auth/ProfileCreation';

const AuthStackNavigator = createStackNavigator();
export function AuthNavigator() {
    return (
        <AuthStackNavigator.Navigator>
            <AuthStackNavigator.Screen name="Login" component={SigninScreen} options={{ headerShown: false }}/>
            <AuthStackNavigator.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}/>
            <AuthStackNavigator.Screen name="UpdateProfile" component={UpdateProfileScreen} options={{ headerShown: false }}/>
            <AuthStackNavigator.Screen name="ProfileCreation" component={ProfileCreationScreen} options={{ headerShown: false }}/>
            <AuthStackNavigator.Screen name="Decision" component={DecisionScreen} options={{ headerShown: false }}/>
            <AuthStackNavigator.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }}/>
        </AuthStackNavigator.Navigator>
    );
}
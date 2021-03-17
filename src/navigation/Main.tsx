import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { Tabs } from "./MainScreen";
import ProducersScreen from "../screens/Producers";
import ChatScreen from "../screens/Message/Chat";
import ReviewsScreen from "../screens/Reviews";
import SigninScreen from "../screens/Auth/Signin";
import SignupScreen from "../screens/Auth/Signup";
import ProfileScreen from '../screens/Profile/Profile';
import DecisionScreen from '../screens/Auth/Decision';
import LoadingScreen from '../screens/Auth/Loading';

const MainStack = createStackNavigator();
export function MainStackScreen() {
    return (
        <MainStack.Navigator>
            <MainStack.Screen name="HomeScreen" component={Tabs} options={{ headerShown: false }}/>
            <MainStack.Screen name="Producers" component={ProducersScreen} options={{ headerShown: false }}/>
            <MainStack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }}/>
            <MainStack.Screen name="Reviews" component={ReviewsScreen} options={{ headerShown: false }}/>
            <MainStack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
            <MainStack.Screen name="Login" component={SigninScreen} options={{ headerShown: false }}/>
            <MainStack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}/>
            <MainStack.Screen name="Decision" component={DecisionScreen} options={{ headerShown: false }}/>
            <MainStack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }}/>
        </MainStack.Navigator>
    );
}
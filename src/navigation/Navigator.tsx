import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from '../screens/Home';
import ProducersScreen from '../screens/Producers';
import ProfileScreen from '../screens/Profile/Profile';
import MessagesScreen from '../screens/Message/Messages';
import ChatScreen from '../screens/Message/Chat';
import ReviewsScreen from '../screens/Reviews';
import SigninScreen from '../screens/Auth/Signin';
import SignupScreen from '../screens/Auth/Signup';
import DecisionScreen from '../screens/Auth/Decision';

const HomeStack = createStackNavigator();
export function HomeStackScreen(loggedIn: boolean) {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
            <HomeStack.Screen name="Producers" component={ProducersScreen} options={{ headerShown: false }}/>
            <HomeStack.Screen name="Profile" component={ProfileStackScreen} options={{ headerShown: false }}/>
        </HomeStack.Navigator>
  );
}

const MessageStack = createStackNavigator();
export function MessageStackScreen() {
    return (
        <MessageStack.Navigator>
            <MessageStack.Screen name="Messages" component={MessagesScreen} options={{ headerShown: false }}/>
            <MessageStack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }}/>
        </MessageStack.Navigator>
  );
}


const ProfileStack = createStackNavigator();
export function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
            <ProfileStack.Screen name="Reviews" component={ReviewsScreen} options={{ headerShown: false }}/>
        </ProfileStack.Navigator>
    );
}

const AuthStack = createStackNavigator();
export const AuthStackScreen = () => (
    <AuthStack.Navigator headerMode='none'>
        {/* <AuthStack.Screen name="LoadingScreen" component={LoadingScreen}/> */}
        <AuthStack.Screen name="Login" component={SigninScreen}/>
        <AuthStack.Screen name="Signup" component={SignupScreen}/>
        <AuthStack.Screen name="Decision" component={DecisionScreen}/>
    </AuthStack.Navigator>
);
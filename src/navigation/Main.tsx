import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { Tabs } from "./MainScreen";
import ProducersScreen from "../Producers/Producers";
import ChatScreen from "../Messages/Chat";
import ReviewsScreen from "../Reviews/Reviews";
import SigninScreen from "../Auth/Signin";
import SignupScreen from "../Auth/Signup";
import ProfileScreen from '../Profile/Profile';
import DecisionScreen from '../Auth/Decision';
import LoadingScreen from '../Auth/Loading';
import CategoriesScreen from '../Gigs/Categories';
import SkillsScreen from '../Gigs/Skills';
import NetworkScreen from '../Network/Network';
import FriendsScreen from '../Network/Friends';
import SettingsScreen from '../Profile/Settings/Settings';
import LanguagesScreen from '../Profile/Settings/EditLanguages';

const MainStack = createStackNavigator();
export function MainStackScreen() {
    return (
        <MainStack.Navigator>
            <MainStack.Screen name="HomeScreen" component={Tabs} options={{ headerShown: false }}/>
            <MainStack.Screen name="Categories" component={CategoriesScreen} options={{ headerShown: false }}/>
            <MainStack.Screen name="Skills" component={SkillsScreen} options={{ headerShown: false }}/>
            <MainStack.Screen name="Producers" component={ProducersScreen} options={{ headerShown: false }}/>
            <MainStack.Screen name="Network" component={NetworkScreen} options={{ headerShown: false }}/>
            <MainStack.Screen name="Friends" component={FriendsScreen} options={{ headerShown: false }}/>
            <MainStack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }}/>
            <MainStack.Screen name="Reviews" component={ReviewsScreen} options={{ headerShown: false }}/>
            <MainStack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
            <MainStack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }}/>
            <MainStack.Screen name="Login" component={SigninScreen} options={{ headerShown: false }}/>
            <MainStack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}/>
            <MainStack.Screen name="Decision" component={DecisionScreen} options={{ headerShown: false }}/>
            <MainStack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }}/>
        </MainStack.Navigator>
    );
}
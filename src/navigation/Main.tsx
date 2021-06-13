import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { Tabs } from "./Tab";
import ProducersScreen from "../Producers/Producers";
import ChatScreen from "../Messages/Chat";
import ReviewsScreen from "../Reviews/Reviews";
import ProfileScreen from '../Profile/Profile';
import DecisionScreen from '../Auth/Decision';
import CategoriesScreen from '../Gigs/Categories';
import SkillsScreen from '../Gigs/Skills';
import NetworkScreen from '../Network/Network';
import FriendsScreen from '../Network/Friends';
import SettingsScreen from '../Profile/Settings/Settings';
import GigsScreen from '../Gigs/Gigs';


const MainStackNavigator = createStackNavigator();
export function MainNavigator() {
    return (
        <MainStackNavigator.Navigator>
            <MainStackNavigator.Screen name="HomeScreen" component={Tabs} options={{ headerShown: false }}/>
            <MainStackNavigator.Screen name="Categories" component={CategoriesScreen} options={{ headerShown: false }}/>
            <MainStackNavigator.Screen name="Skills" component={SkillsScreen} options={{ headerShown: false }}/>
            <MainStackNavigator.Screen name="Gigs" component={GigsScreen} options={{ headerShown: false }}/>
            <MainStackNavigator.Screen name="Producers" component={ProducersScreen} options={{ headerShown: false }}/>
            <MainStackNavigator.Screen name="Network" component={NetworkScreen} options={{ headerShown: false }}/>
            <MainStackNavigator.Screen name="Friends" component={FriendsScreen} options={{ headerShown: false }}/>
            <MainStackNavigator.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }}/>
            <MainStackNavigator.Screen name="Reviews" component={ReviewsScreen} options={{ headerShown: false }}/>
            <MainStackNavigator.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
            <MainStackNavigator.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }}/>
            <MainStackNavigator.Screen name="Decision" component={DecisionScreen} options={{ headerShown: false }}/>
        </MainStackNavigator.Navigator>
    );
}
import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackScreen, GigStackScreen, CalendarStackScreen, MessageStackScreen, ProfileStackScreen } from './Navigator'
import { Icon } from 'react-native-elements';
import { GigColors } from '../constants/colors';

export function MainScreen(props: any) {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName : string;
                    let iconType = Platform.OS === 'ios' ? 'ionicon' : 'material'
                    // let color = GigColors.DarkGrey;
                    let color = focused ? GigColors.Black : GigColors.DarkGrey;

                    if (route.name === 'Home') {
                        iconName = "home"
                    }
                    else if (route.name === 'Gigs') {
                        iconName = 'list';
                    } else if (route.name === 'Calendar') {
                        iconName = 'calendar';
                    } else if (route.name === 'Messages') {
                        iconName = 'mail'
                    } else {
                        iconName = 'person'
                    }

                    return <Icon name={iconName} size={30} color={color} type={iconType} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: GigColors.Black,
                tabStyle: {
                    alignItems: 'center'
                },
                showLabel: false
            }}>

                <Tab.Screen name="Home" component={HomeStackScreen} />
                <Tab.Screen name="Gigs" component={GigStackScreen} />
                <Tab.Screen name="Calendar" component={CalendarStackScreen} />
                <Tab.Screen name="Messages" component={MessageStackScreen} />
                <Tab.Screen name="Profile" component={ProfileStackScreen} />

        </Tab.Navigator>

    );
}
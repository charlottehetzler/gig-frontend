import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { GigColors } from '../constants/colors';
import HomeScreen from '../screens/Home';
import GigsScreen from '../screens/Gig/Gigs';
import CalendarScreen from '../screens/Calendar';
import MessagesScreen from '../screens/Message/Messages';
import MyProfileScreen from '../screens/Profile/MyProfile';

const Tab = createBottomTabNavigator();
export function Tabs(props: any) {
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

            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Gigs" component={GigsScreen} />
            <Tab.Screen name="Calendar" component={CalendarScreen} />
            <Tab.Screen name="Messages" component={MessagesScreen} />
            <Tab.Screen name="MyProfile" component={MyProfileScreen} />
        </Tab.Navigator>

    );
}



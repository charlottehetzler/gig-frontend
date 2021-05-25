import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { GigColors } from '../constants/colors';
import HomeScreen from '../Gigs/Home';
import MessagesScreen from '../Messages/Messages';
import MyProfileScreen from '../Profile/MyProfile';
import NetworkScreen from '../Network/Network';

const Tab = createBottomTabNavigator();
export function Tabs(props: any) {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
                let iconName : string;
                let iconType = Platform.OS === 'ios' ? 'ionicon' : 'material'
                let color = focused ? GigColors.Mustard : GigColors.Blue;

                if (route.name === 'Home') {
                    iconName = 'home'
                } else if (route.name === 'Network') {
                    iconName = 'people'
                } else if (route.name === 'Messages') {
                    iconName = 'mail'
                } else {
                    iconName = 'person'
                }
                return <Icon name={iconName} size={35} color={color} type={iconType} />;
            },
        })}

        tabBarOptions={{
            activeTintColor: GigColors.Mustard,
            activeBackgroundColor: GigColors.Greyish,
            inactiveBackgroundColor: GigColors.Greyish,
            tabStyle: {
                alignItems: 'center'
            },
            showLabel: false,
            style: {
                borderTopColor: "transparent",
                height: 100
            }
        }}>

            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Network" component={NetworkScreen} />
            <Tab.Screen name="Messages" component={MessagesScreen} />
            <Tab.Screen name="MyProfile" component={MyProfileScreen} />
        </Tab.Navigator>

    );
}



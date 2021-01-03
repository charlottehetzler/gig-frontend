import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation'
import HomeScreen from '../screens/Home'
import GigsScreen from '../screens/Gigs'
import MessagesScreen from '../screens/Messages'
import ChatScreen from '../screens/Chat'
import ProfileScreen from '../screens/Profile'
import ProducersScreen from '../screens/Producers';
import ReviewsScreen from '../screens/Reviews';
import { Icon } from 'react-native-elements';
import { GigColors } from '../constants/colors';


const AppNavigator = createStackNavigator({
    Home: {screen: HomeScreen, navigationOptions: {headerShown: false}}, 
    Profile: {screen: ProfileScreen, navigationOptions: {headerShown: false}},
    Producers: {screen: ProducersScreen, navigationOptions: {headerShown: false}},
    Reviews: {screen: ReviewsScreen, navigationOptions: {headerShown: false}}
});

const MessageNavigator = createStackNavigator({
    Messages: {screen: MessagesScreen, navigationOptions: {headerShown: false}},
    Chat: {screen: ChatScreen, navigationOptions: {headerShown: false, tabBarVisible: false }},
})

const TabNavigator = createBottomTabNavigator({
    Home: {screen: AppNavigator, navigationOptions: {
        tabBarIcon: (tabInfo) => {
            return <Icon
                type={Platform.OS === 'ios' ? 'ionicon' : 'material'}
                color={tabInfo.tintColor}
                name={Platform.OS === 'ios' ? 'home' : 'home'}
                size={30}
            />
        }
    }},
    Gigs: {screen: GigsScreen, navigationOptions: {
        tabBarIcon: (tabInfo) => {
            return <Icon
                type={Platform.OS === 'ios' ? 'ionicon' : 'material'}
                color={tabInfo.tintColor}
                name={Platform.OS === 'ios' ? 'list' : 'list'}
                size={30}
            />
        }
    }},
    Calendar: {screen: GigsScreen, navigationOptions: {
        tabBarIcon: (tabInfo) => {
            return <Icon
                type={Platform.OS === 'ios' ? 'ionicon' : 'material'}
                color={tabInfo.tintColor}
                name={Platform.OS === 'ios' ? 'calendar' : 'calendar'}
                size={30}
            />
        }
    }},
    Messages: {screen: MessageNavigator, navigationOptions: {
        tabBarIcon: (tabInfo) => {
            return <Icon
                type={Platform.OS === 'ios' ? 'ionicon' : 'material'}
                color={tabInfo.tintColor}
                name={Platform.OS === 'ios' ? 'mail' : 'mail'}
                size={30}
            />
        }
    }},
    Profile: {screen: ProfileScreen, navigationOptions: {
        tabBarIcon: (tabInfo) => {
            return <Icon
                type={Platform.OS === 'ios' ? 'ionicon' : 'material'}
                color={tabInfo.tintColor}
                name={Platform.OS === 'ios' ? 'person' : 'person'}
                size={30}
            />
            
        }
    }}
}, {
    tabBarOptions: {
        activeTintColor: GigColors.Black,
        tabStyle: {
            alignItems: 'center'
        },
        showLabel: false
    }
});

const SideNavigator = createDrawerNavigator({
    Home: TabNavigator,
    Account: MessagesScreen,
    History: GigsScreen,
    Settings: GigsScreen,
    Logout: GigsScreen
}, {
    contentOptions: {
        labelStyle: {
            textTransform: 'uppercase',
            color: '#C4C4C4',
            fontSize: 18,
            letterSpacing: 2,
            marginLeft: 25
        },
        activeLabelStyle: {
            color: GigColors.Black
        }
    }
})

export default createAppContainer(SideNavigator);

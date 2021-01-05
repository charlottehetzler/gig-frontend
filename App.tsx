import React from 'react';
import {AppNavigator} from './src/navigation/AppNavigator';
import { MainScreen } from './src/navigation/MainScreen';
// import { enableScreens } from 'react-native-screens'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import GigsScreen from './src/screens/Gig/Gigs';
import { GigColors } from './src/constants/colors';

// enableScreens();

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(), 
});

const Drawer = createDrawerNavigator();

export default function App () {

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Drawer.Navigator 
            initialRouteName="Home" 
            drawerContentOptions={{activeTintColor: GigColors.Black,  labelStyle: {texTransform: 'uppercase'}}}
          >
          <Drawer.Screen name="Home" component={MainScreen}/>
          <Drawer.Screen name="Account" component={GigsScreen} />
          <Drawer.Screen name="History" component={GigsScreen} />
          <Drawer.Screen name="Settings" component={GigsScreen} />
          <Drawer.Screen name="Logout" component={GigsScreen} />
        </Drawer.Navigator>
        {/* <AppNavigator/> */}
      </NavigationContainer>
    </ApolloProvider>
  );
  
}

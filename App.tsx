import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GigColors } from './src/constants/colors';
import GigsScreen from './src/screens/Gig/Gigs';
import GigHistoryScreen from './src/screens/Gig/History';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux';
import { userReducer } from './src/redux/reducers/user';
import { MainStackScreen } from './src/navigation/Main';
import { registerRootComponent } from 'expo'

const rootReducer = combineReducers({
  user: userReducer
});

const store = createStore(rootReducer);

export default function App () {
  const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache(), 
  });
  const Drawer = createDrawerNavigator();

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home" drawerContentOptions={{activeTintColor: GigColors.Black}}>
            <Drawer.Screen name="Home" component={MainStackScreen}/>
            <Drawer.Screen name="Account" component={GigsScreen} />
            <Drawer.Screen name="GigHistory" component={GigHistoryScreen} />
            <Drawer.Screen name="Settings" component={GigsScreen} />
            {/* <Drawer.Screen name="Logout" component={AuthStackScreen} /> */}
          </Drawer.Navigator> 
      </NavigationContainer>
      </Provider>
    </ApolloProvider>
  );
}

registerRootComponent(App);
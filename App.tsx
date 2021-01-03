import React from 'react';
import { StyleSheet, StatusBar} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { enableScreens } from 'react-native-screens'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';


enableScreens();

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  // link: new WebSocketLink({
  //   uri: `ws://localhost:3000/`,
  //   options: {
  //     reconnect: true
  //   }
  // }),
  cache: new InMemoryCache(), 
});

export default function App () {

  return (
    <ApolloProvider client={client}>
      <AppNavigator/>
    </ApolloProvider>
  );
  
}

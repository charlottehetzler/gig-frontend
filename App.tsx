import React from 'react';
import { StyleSheet, StatusBar} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { enableScreens } from 'react-native-screens'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

enableScreens();

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});

export default function App () {

  return (
    <ApolloProvider client={client}>
      <AppNavigator/>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    flex: 1,
    
  },
  wrapper: {
    // marginHorizontal: 10,
    // flex: 1,
  },
  h4Style: {
    marginTop: 15,
    fontSize: 24,
    textAlign: 'center',
  },
  gigWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

});

import React, { useState } from 'react';
import store from './src/redux/index'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Provider, useSelector } from 'react-redux';
import { registerRootComponent, AppLoading } from 'expo'
import * as Font from 'expo-font'
import  AppNavigator  from './src/navigation/App';



// const fetchFonts = () => {
//   return Font.loadAsync({
//     'montserrat-light': require('./assets/fonts/Montserrat-Light.tff'),
//     'montserrat-medium': require('./assets/fonts/Montserrat-Medium.tff'),
//     'montserrat-regular': require('./assets/fonts/Montserrat-Regular.tff'),
//     'montserrat-semi-bold': require('./assets/fonts/Montserrat-SemiBold.tff'),
//   });
// }


export default function App() {

  // const [ fontLoading, setFontLoading ] = useState(false);
  // if (!fontLoading) {
  //   return (
  //     <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoading(true)} onError={(err:any) => console.log(err)}/>
  //   );
  // }

  const client = new ApolloClient({
    uri: 'http://localhost:3030/graphql',
    cache: new InMemoryCache(),
  });

  const Drawer = createDrawerNavigator();

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        {/* <Drawer.Navigator initialRouteName="Home" drawerContentOptions={{activeTintColor: GigColors.Black}}>
            <Drawer.Screen name="Home" component={MainStackScreen}/> */}
        {/* <Drawer.Screen name="Logout" component={AuthStackScreen} /> */}
        {/* </Drawer.Navigator>  */}
        <AppNavigator />
      </Provider>
    </ApolloProvider>
  );
}

registerRootComponent(App);
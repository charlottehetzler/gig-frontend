import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GigColors } from './src/constants/colors';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux';
import { userReducer } from './src/redux/reducers/user';
import { MainStackScreen } from './src/navigation/Main';
import { registerRootComponent, AppLoading } from 'expo'
import * as Font from 'expo-font'

const rootReducer = combineReducers({
  user: userReducer
});


// const fetchFonts = () => {
//   return Font.loadAsync({
//     'montserrat-light': require('./assets/fonts/Montserrat-Light.tff'),
//     'montserrat-medium': require('./assets/fonts/Montserrat-Medium.tff'),
//     'montserrat-regular': require('./assets/fonts/Montserrat-Regular.tff'),
//     'montserrat-semi-bold': require('./assets/fonts/Montserrat-SemiBold.tff'),
//   });
// }

const store = createStore(rootReducer);

export default function App () {
  // const [ fontLoading, setFontLoading ] = useState(false);
  // if (!fontLoading) {
  //   return (
  //     <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoading(true)} onError={(err:any) => console.log(err)}/>
  //   );
  // }

  const client = new ApolloClient({
    uri: 'https://00f1f8828dc8.ngrok.io/graphql',
    cache: new InMemoryCache(), 
  });

  const Drawer = createDrawerNavigator();

  const MyTheme = {
    colors: {
      background: GigColors.White,
    },
  };

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <NavigationContainer theme={MyTheme}>
          <Drawer.Navigator initialRouteName="Home" drawerContentOptions={{activeTintColor: GigColors.Black}}>
            <Drawer.Screen name="Home" component={MainStackScreen}/>
            {/* <Drawer.Screen name="Logout" component={AuthStackScreen} /> */}
          </Drawer.Navigator> 
      </NavigationContainer>
      </Provider>
    </ApolloProvider>
  );
}

registerRootComponent(App);
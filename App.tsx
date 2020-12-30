import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, ScrollView, Button, Alert, TouchableOpacity } from 'react-native';
import {DefaultHeader} from './src/components/Header/DefaultHeader';
import AppNavigator from './src/navigation/AppNavigator';

export default function App () {

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <DefaultHeader title={'my messages'}/>
      </View>

      {/* <AppNavigator/> */}

    </SafeAreaView>
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

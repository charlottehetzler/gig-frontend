import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { Producer } from '../components/Card/Producer';
import { DefaultHeader } from '../components/Header/DefaultHeader';


const producers = [
  {id: "1", firstName: "Isaac", lastName: "Hirsch", rating: 5, lastGig: "2020/12/20"},
  {id: "2", firstName: "Charley", lastName: "Hetzler", rating: 4.5, lastGig: "2020/11/10"},
  {id: "3", firstName: "Joe", lastName: "Doe", rating: 2.5, lastGig: "2020/07/01"},
];

export default function ProducersScreen() {
  const renderItem = ({ item } : any) => (
    <Producer firstName={item.firstName} lastName={item.lastName} rating={item.rating} lastGig={item.lastGig} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <DefaultHeader title={'your producers'}/>
      </View>
        <Text style={styles.h4Style}>CategoryName:</Text>

        <FlatList
          data={producers}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
  h4Style: {
    marginTop: 25,
    fontSize: 26
  },
  header: {
    height: 75, 
    alignItems: 'center', 
    justifyContent:'center',
    backgroundColor: 'grey'
  }
});

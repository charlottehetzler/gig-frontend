import React, { Props } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, StatusBar, Text } from 'react-native';
import { DefaultHeader } from '../components/Header/DefaultHeader';
import { Tile } from '../components/Card/Tile';


const randomGigs = [
  {id: "1", title: "Dog Food Tester"}, {id: "2", title: "Window Cleaner"}, {id: "3", title: "Don't know"}, 
  {id: "4", title: "Food Cooker"}, {id: "5", title: "Blablabla"}, {id: "6", title: "Blibalblub"},
  {id: "7", title: "Food Cooker"}, {id: "8", title: "Blablabla"}, {id: "9", title: "vvv"},
];
  
const allGigs = [
  {id: "1", title: "Babysitting"}, {id: "2", title: "House Cleaning"}, {id: "3", title: "Water my plants"}, 
  {id: "4", title: "Don't know 1"}, {id: "5", title: "Don't know 2"}, {id: "6", title: "Don't know 3"},
  {id: "7", title: "Food Don't know 4"}, {id: "8", title: "Don't know 5"}, {id: "9", title: "Don't know 6"},
];

export default function HomeScreen() {

  const renderItem = ({ item } : any ) => (
    <Tile title={item.title} />
  );
    
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <DefaultHeader title={'Home'}/>
      </View>
      <Text style={styles.h4Style}> Browse random gigs:</Text>
    
      <FlatList
        data={randomGigs}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        style={styles.flatListHorizontal}
      />
    
      <Text style={styles.h4Style}> All gigs:</Text>

      <FlatList
        data={allGigs}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />  

    </SafeAreaView>
  )
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  flatListHorizontal: {
    height: 200
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
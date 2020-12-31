import React from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, StatusBar, Text, TouchableOpacity } from 'react-native';
import { DefaultHeader } from '../components/Header/DefaultHeader';
import { SearchBar } from 'react-native-elements';
import { GET_All_JOBS } from '../lib/job';
import { useQuery } from '@apollo/client';
import { ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen (props: any) {

  const { data, loading, error } = useQuery(GET_All_JOBS);

  const jobs = data?.getAllJobs || [];

  const renderItem = ({ item } : any ) => (
    <View >
      <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('Producers', {jobId: item.id})} >
        <Text style={styles.title}>{item.name} </Text>
      </TouchableOpacity>
    </View>
  );
    
  return (
    
    <SafeAreaView style={styles.container}>
      <View>
        <DefaultHeader title={'Home'}/>
      </View>
      <SearchBar lightTheme containerStyle={{backgroundColor: '#FFFFFF'}} style={{backgroundColor: '#FFFFFF'}} inputContainerStyle={{backgroundColor: '#FFFFFF'}}></SearchBar>
      <ScrollView>
        <Text style={styles.h4Style}> Browse random gigs:</Text>
          <FlatList
            data={jobs}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
            style={styles.flatListHorizontal}
            />
      
          <Text style={styles.h4Style}> All gigs:</Text>
          <FlatList
            data={jobs}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />  
      </ScrollView>
    </SafeAreaView>
  )
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  flatListHorizontal: {
    height: 125
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
  },
  item: {
    backgroundColor: '#C4C4C4',
    borderRadius: 4,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
title: {
    fontSize: 20,
    textAlign: 'center',
    textTransform: 'uppercase'
}
});
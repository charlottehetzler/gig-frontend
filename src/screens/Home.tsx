import React, { useState, useMemo, useEffect } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, StatusBar, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { DefaultHeader } from '../components/Header/DefaultHeader';
import { GET_All_SKILLS } from '../lib/skill';
import { useQuery } from '@apollo/client';
import { ScrollView } from 'react-native-gesture-handler';
import { GigColors } from '../constants/colors';
import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';

export default function HomeScreen (props: any) {

  const isLoggedIn = useSelector( (state: any) => state.user.isLoggedIn);

  const { data, error, loading, refetch } = useQuery(GET_All_SKILLS);

  const [ skills, setSkills ] = useState()

  useMemo(() => {
    if (data && data?.getAllSkills) {
      setSkills(data?.getAllSkills)
    }
  },[ data]);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const newSkills = await refetch();
      setSkills(newSkills.data.getAllSkills);
    } catch (e) {
      console.log(e)
    }
  }

  const renderItem = ({ item } : any ) => (
    <View >
      <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('Producers', {skillId: item['id'], skillName: item['name']})} >
        <Text style={styles.title}>{item['name']} </Text>
      </TouchableOpacity>
    </View>
  );
    
  return (
    
    <SafeAreaView style={styles.container}>
      <View>
        <DefaultHeader title={'Home'} navigation={props.navigation} goBack={false}/>
      </View>
      {loading && <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
      
      {!loading &&  <>
      <SearchBar navigation={props.navigation} isPersonal={false} refetchSkills={fetchSkills} profileMode={false}/>

      <ScrollView>
        <Text style={styles.h4Style}> Browse random gigs:</Text>
        <FlatList
          data={skills}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          horizontal
          style={styles.flatListHorizontal}
        />
        <View style={styles.subHeader}>
          <Text style={styles.h4Style}> All gigs:</Text>
          <TouchableOpacity style={styles.moreButton} onPress={() => props.navigation.navigate('Categories')}>
            <Text>See all</Text>
          </TouchableOpacity>

        </View>
        <FlatList
          data={skills}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />  
      </ScrollView>
      </>}
    </SafeAreaView>
  ) 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: GigColors.White
  },
  h4Style: {
    marginTop: 25,
    fontSize: 26
  },
  flatListHorizontal: {
    height: 100
  },
  item: {
    backgroundColor: GigColors.White,
    borderColor: GigColors.Black,
    borderWidth: 1,
    borderRadius: 4,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: GigColors.Black
  },
  moreButton: {
    backgroundColor: GigColors.White,
    color: GigColors.Black,
    borderWidth: 1,
    borderColor: GigColors.Black,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
    justifyContent: "center",
    marginBottom: 0,
    marginRight: 16
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  }
});
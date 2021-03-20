import React, { useState, useMemo } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, StatusBar, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { DefaultHeader } from '../components/Header/DefaultHeader';
import { GET_All_SKILLS } from '../lib/skill';
import { useQuery } from '@apollo/client';
import { ScrollView } from 'react-native-gesture-handler';
import { GigColors } from '../constants/colors';
import { useSelector } from 'react-redux';
import AuthPlaceholder from '../components/Placeholder/AuthPlaceholder';

export default function HomeScreen (props: any) {

  const isLoggedIn = useSelector( (state: any) => state.user.isLoggedIn);

  const { data, error, loading } = useQuery(GET_All_SKILLS);

  const [filtered, setFiltered] = useState();

  const [searching, setSearching] = useState(false);

  const skills = useMemo(() => {
    if (data?.getAllSkills) {
      const allSkills = (data.getAllSkills as any[]).map(skill => {
        const { id, name } = skill
        return {id: id, name: name};
      });
    return allSkills;
    } else {
      return [];
    }
  }, [data]);

  const onSearch = (text: any) => {
    if (text) {
      setSearching(true);
      const temp = text.toLowerCase();
      let skillNames = [];
      for (const skill of skills) {
        const skillItem = [];
        skillItem.push(skill.id);
        skillItem.push(skill.name);
        skillNames.push(skillItem)
      }
      const tempList = skillNames.filter((item: any) => {
        if (item[1].toLowerCase().includes(temp)) {
          return item
        }
      })
      setFiltered(tempList);
    } else {
      setSearching(false)
      setFiltered(skills)
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
        <TextInput 
          style={styles.textInput}
          placeholder="Searchh"
          placeholderTextColor='#C4C4C4'
          onChangeText={onSearch}
        />
        {searching &&
          <View style={styles.subContainer}>
          {
            filtered.length ?
            filtered.map((item: any) => {
              return (
                <View style={styles.itemView} key={item.id}>
                  <TouchableOpacity onPress={() => props.navigation.navigate('Producers', {jobId: item[0]})} >
                    <Text style={styles.itemText}>{item[1]}</Text>
                  </TouchableOpacity>
                </View>
              )
            })
            :
            <View style={styles.noResultView}>
                <Text style={styles.noResultText}>No search items matched</Text>
            </View>
          }
          </View>
      }
      <ScrollView>
        <Text style={styles.h4Style}> Browse random gigs:</Text>
          <FlatList
            data={skills}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            horizontal
            style={styles.flatListHorizontal}
            />
      
          <Text style={styles.h4Style}> All gigs:</Text>
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
  flatListHorizontal: {
    height: 100
  },
  h4Style: {
    marginTop: 25,
    fontSize: 26
  },
  header: {
    height: 75, 
    alignItems: 'center', 
    justifyContent:'center',
    backgroundColor: GigColors.White
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
  textInput: {
    backgroundColor: GigColors.White,
    width: '100%',
    borderRadius: 5,
    height: 50,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  subContainer: {
    backgroundColor: GigColors.White,
    paddingTop: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  itemView: {
    backgroundColor: GigColors.White,
    height: 30,
    width: '90%',
    marginBottom: 10,
    justifyContent: 'center',
    borderRadius: 4,
  },
  itemText: {
    color: GigColors.Black,
    paddingHorizontal: 10,
    fontSize: 16
  },
  noResultView: {
    alignSelf: 'center',
    height: 75,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  noResultText: {
    fontSize: 18,
    color: GigColors.Black
  }
});
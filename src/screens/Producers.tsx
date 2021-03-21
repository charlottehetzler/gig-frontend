import React, { useState, useMemo } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { Producer } from '../components/Card/Producer';
import { useQuery } from '@apollo/client';
import { GigColors } from '../constants/colors';
import { DefaultHeader } from '../components/Header/DefaultHeader';
import { GET_PRODUCERS_FOR_SKILL } from '../lib/user';
import { useSelector } from 'react-redux';
import { NoDataText } from '../components/Placeholder/NoDataText';


export default function ProducersScreen(props: any) {

  const currentUserId = useSelector((state: any) => state.user.userId);
    
  const { skillId, skillName } = props.route.params;
  
  const { data, loading, error } = useQuery(GET_PRODUCERS_FOR_SKILL, {variables: {query: {skillId: skillId, currentUserId: currentUserId}}});  
  
  let [producers, setProducers] = useState<any>()

  console.log(data?.getProducersForSkill)
    
  useMemo(() => {
    if (data && data?.getProducersForSkill) {
      const producerList = (data?.getProducersForSkill.map((item: { firstName: string; lastName: string; avgRating: number; id: number; }) => {
        return {
          firstName: item.firstName,
          lastName: item.lastName,
          avgRating: item.avgRating,
          userId: item.id,
        }
      }));
      producerList.sort((a, b) => (a.avgRating > b.avgRating) ? -1 : 1)
      setProducers(producerList)
    }
  }, [data]);

  const renderItem = ({ item } : any) => (
    <Producer 
      firstName={item["firstName"]} 
      lastName={item["lastName"]} 
      rating={item["avgRating"]} 
      userId={item["userId"]}
      navigation={props.navigation}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <DefaultHeader title={skillName} navigation={props.navigation} goBack={true}/>
      </View> 
      {loading &&  <ActivityIndicator size="small" color='#000000' style={{alignItems:'center', justifyContent:'center'}}/>}

      {producers && producers.length > 0 && <>
        <FlatList
          data={producers}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </>}
      {producers && producers.length === 0 && <> 
        <View style={{marginLeft: 10}}>
          <NoDataText text={`We couldn\'t find any producers for ${skillName}.`}/>
        </View>
      </>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0
  },
  h4Style: {
    marginTop: 25,
    fontSize: 26,
    marginBottom: 10
  },
  header: {
    height: 75, 
    alignItems: 'center', 
    justifyContent:'center',
    backgroundColor: GigColors.DarkGrey
  }
});

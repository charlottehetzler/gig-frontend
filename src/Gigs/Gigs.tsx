import React, { useState, useMemo } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { GigColors } from '../constants/colors';
import { DefaultHeader } from '../components/Header/DefaultHeader';
import {  GET_ALL_GIGS } from '../lib/gig';
import { GigCard } from './GigCard';

export default function GigsScreen(props: any) {

  const { isConsumer } = props.route.params;
  
  const { data: gigData, error: gigsError, loading: gigsLoading, refetch: gigsRefetch } = useQuery(
    GET_ALL_GIGS, { variables: { isAd: isConsumer } }
  );

  const [ gigs, setGigs ] = useState();

  useMemo(() => {

    if (gigData && gigData?.getAllGigs) {
      setGigs(gigData?.getAllGigs)
    }
  
  },[ gigData ]);

  const renderGigs = ({ item } : any ) => (
    <GigCard 
      gig={item} 
      isMine={false} 
      isConsumer={isConsumer} 
      navigation={props.navigation} 
      isList={true}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <DefaultHeader title={isConsumer ? 'Hot deals' : 'Now wanted'} navigation={props.navigation} goBack={true} isConsumer={isConsumer}/>
      </View> 

      {gigsLoading &&  <ActivityIndicator size="large" color={GigColors.Blue} style={{alignItems:'center', justifyContent:'center'}}/>}
      
      <FlatList
        data={gigs}
        renderItem={renderGigs}
        keyExtractor={item => item.id.toString()}
        style={{marginHorizontal: 16}}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    flex: 1
  },
});

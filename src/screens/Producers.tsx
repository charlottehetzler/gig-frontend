import React, { useState, useMemo } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { Producer } from '../components/Card/Producer';
import { SecondaryHeader } from '../components/Header/SecondaryHeader';
import { useQuery } from '@apollo/client';
import { GET_PRODUCERS_FOR_JOB } from '../lib/producer';
import { GET_ONE_JOB } from '../lib/job';
import { GigColors } from '../constants/colors';


export default function ProducersScreen(props: any) {
  
  const jobId = props.navigation.getParam('jobId');
  
  const { data, loading, error } = useQuery(GET_PRODUCERS_FOR_JOB, {variables: {query: {jobId: jobId}}});

  const { data: jobData, loading: jobLoading, error: jobError } = useQuery(GET_ONE_JOB, {variables: {query: {jobId: jobId}}});
  
  const job = jobData?.getOneJob || [];
  
  let [producers, setProducers] = useState<any>()
  
  useMemo(() => {
    if (data && data.getProducersForJob) {
      setProducers(data.getProducersForJob.map((item: { id: number; user: { firstName: string; lastName: string; avgRating: any; id: number; }; }) => {
        return {
          producerId: item.id,
          producerFirstName: item.user.firstName,
          producerLastName: item.user.lastName,
          producerAvgRating: item.user.avgRating,
          userId: item.user.id,
          // producerLastGig: item.lastGig[0]["createdAt"]
        }
      }));
    }
  }, [data]);

  const renderItem = ({ item } : any) => (
    <Producer 
      firstName={item["producerFirstName"]} 
      lastName={item["producerLastName"]} 
      rating={item["producerAvgRating"]} 
      lastGig={"2020/07/01"} 
      userId={item["userId"]}
      navigation={props.navigation}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SecondaryHeader title={'your producers'} navigation={props.navigation}/>
      </View> 
        {jobData && <>
          <Text style={styles.h4Style}>{job.name}</Text>
        </>}
        {producers && <>
          <FlatList
            data={producers}
            renderItem={renderItem}
            keyExtractor={item => item.id}

          />
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

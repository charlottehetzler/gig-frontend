import React, { useState, useMemo } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, ActivityIndicator } from 'react-native';
import { Producer } from '../components/Card/Producer';
import { useQuery } from '@apollo/client';
import { GET_PRODUCERS_FOR_JOB } from '../lib/producer';
import { GET_ONE_JOB } from '../lib/job';
import { GigColors } from '../constants/colors';
import { DefaultHeader } from '../components/Header/DefaultHeader';


export default function ProducersScreen(props: any) {
    
  const { jobId } = props.route.params;
  
  const { data, loading, error } = useQuery(GET_PRODUCERS_FOR_JOB, {variables: {query: {jobId: jobId}}});

  const { data: jobData, loading: jobLoading, error: jobError } = useQuery(GET_ONE_JOB, {variables: {query: {jobId: jobId}}});
  
  const job = jobData?.getOneJob || [];
  
  let [producers, setProducers] = useState<any>()
  
  let [lastGig, setLastGig] = useState<any>()
  
  useMemo(() => {
    if (data && data.getProducersForJob) {
      setProducers(data.getProducersForJob.map((item: { id: number; user: { firstName: string; lastName: string; avgRating: any; id: number; }; }) => {
        return {
          producerId: item.id,
          producerFirstName: item.user.firstName,
          producerLastName: item.user.lastName,
          producerAvgRating: item.user.avgRating,
          userId: item.user.id,
        }
      }));
      // data.getProducersForJob.map(function(producer:any) {
      //   let current : any = []; 
      //   let lastGig : any;
      //   if (producer.gigs) {
      //     for (const gig of producer.gigs) {
      //       if (gig.date <= new Date()) {
      //         current.push(gig.date);
      //       }
      //     }
      //     console.log(current.length)
      //     lastGig = new Date(Math.max.apply(null, current.map(function(gig: any) {
      //       return new Date(gig.date);
      //     })));
      //     setLastGig(lastGig);
      //   }
      // });
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
        <DefaultHeader title={'your producers'} navigation={props.navigation} goBack={true}/>
      </View> 
      {loading &&  <ActivityIndicator size="small" color='#000000' style={{alignItems:'center', justifyContent:'center'}}/>}

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

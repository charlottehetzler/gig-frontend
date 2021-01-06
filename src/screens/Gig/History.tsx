import React, { useState, useMemo } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import { Gig } from '../../components/Card/Gig';
import { DefaultHeader } from '../../components/Header/DefaultHeader';
import { useQuery } from '@apollo/client';
import { GET_GIG_HISTORY } from '../../lib/gig';
import { useSelector } from 'react-redux';
import AuthPlaceholder from '../../components/Placeholder/AuthPlaceholder';

export default function GigHistoryScreen(props: any) {

  const isLoggedIn = useSelector( (state: any) => state.user.isLoggedIn);

  const currentUserId = useSelector( (state: any) => state.user.userId);

  const { data, loading, error, refetch } = useQuery(GET_GIG_HISTORY, {variables: {query: {userId: currentUserId }}});

  let [activeGigs, setActiveGigs] = useState<any>();
  
  useMemo(() => {
    if (data && data.getGigHistory) {
      setActiveGigs(data.getGigHistory.map((item: any) => {
        return {
          gigId: item.id,
          description: item.description,
          title: item.title,
          date: item.date,
          price: item.price,
          currency: item.currency,
          updatedAt: item.updatedAt,
          status: item.status,
          members: item.members,
          jobId: item.job.id,
          jobName: item.job.name,
          categoryId: item.job.gigCategory.id,
          categoryName: item.job.gigCategory.name
          // addressId: item.address.id,
          // streetRoadName: item.address.streetRoadName,
          // stateCountry: item.address.stateCounty,
          // houseNumber: item.address.houseNumber,
        }
      }));
    }
  }, [data]);

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <DefaultHeader title={'my gig history'} navigation={props.navigation}/>
            </View>
            {loading &&  <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
            {!isLoggedIn && <AuthPlaceholder title={'You have not registered any gigs yet. Signup or login to get started!'}/>}
            {activeGigs &&
            <View>
                <ScrollView>
                {activeGigs.map((gig: any) => { return (
                    <View style={styles.gigWrapper} key={gig.gigId}>
                        <Gig gig={gig} navigation={props.navigation} currentUserId={currentUserId} />
                    </View>
                )})}
                </ScrollView>
            </View>
            }
        </SafeAreaView>
    )
    
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight || 0,
        flex: 1,
        
    },
    h4Style: {
        marginTop: 15,
        fontSize: 24,
        textAlign: 'center',
    },
    gigWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    }
});
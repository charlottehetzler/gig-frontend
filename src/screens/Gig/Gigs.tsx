import React, { useState, useMemo } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Gig } from '../../components/Card/Gig';
import { DefaultHeader } from '../../components/Header/DefaultHeader';
import { useQuery } from '@apollo/client';
import { GET_All_ACTIVE_GIGS_FOR_USER } from '../../lib/gig';

export default function GigsScreen(props: any) {

  const currentUserId = 4;

  const { data, loading, error, refetch } = useQuery(GET_All_ACTIVE_GIGS_FOR_USER, {variables: {query: {userId: currentUserId }}});

  let [activeGigs, setActiveGigs] = useState<any>();
  
  useMemo(() => {
    if (data && data.getAllActiveGigsForUser) {
      setActiveGigs(data.getAllActiveGigsForUser.map((item: any) => {
        return {
          gigId: item.id,
          description: item.description,
          title: item.title,
          date: item.date,
          time: item.time,
          price: item.price,
          currency: item.currency,
          updatedAt: item.updatedAt,
          members: item.members,
          addressId: item.address.id,
          streetRoadName: item.address.streetRoadName,
          stateCountry: item.address.stateCounty,
          houseNumber: item.address.houseNumber,
        }
      }));
    }
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <DefaultHeader title={'my live gigs'} navData={props.navigation}/>
      </View>
      <View>
        {activeGigs && 
        <ScrollView>
          {activeGigs.map((gig: any) => { return (
            <View style={styles.gigWrapper}>
              <Gig gig={gig} navigation={props.navigation} currentUserId={currentUserId} key={gig.gigId}/>
            </View>
          )})}
        </ScrollView>
        }
      </View>
    </SafeAreaView>
  )
    
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight || 0,
        flex: 1,
        
    },
    wrapper: {
    // marginHorizontal: 10,
    // flex: 1,
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
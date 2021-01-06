import React, { useState, useMemo } from 'react';
import { SafeAreaView, View, ActivityIndicator } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { DefaultHeader } from '../components/Header/DefaultHeader';
import { GET_All_GIGS_FOR_USER } from '../lib/gig';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import AuthPlaceholder from '../components/Placeholder/AuthPlaceholder';


export default function CalendarScreen (props: any) {

    const isLoggedIn = useSelector( (state: any) => state.user.isLoggedIn);

    const currentUserId = useSelector( (state: any) => state.user.userId);

    const { data, loading, error, refetch } = useQuery(GET_All_GIGS_FOR_USER, {variables: {query: {userId: currentUserId }}});
  
    const [gigs, setGigs] = useState([]);

    const [gigDates, setGigDates] = useState();

    const [markedDates, setMarkedDates] = useState();
    
    useMemo(() => {
        if (data && data.getAllGigsForUser) {
            setGigs(data.getAllGigsForUser.map((item: any) => {
                return {
                    gigId: item.id,
                    description: item.description,
                    title: item.title,
                    date: item.date,
                    price: item.price,
                    currency: item.currency,
                    updatedAt: item.updatedAt,
                    members: item.members,
                    // addressId: item.address.id,
                    // streetRoadName: item.address.streetRoadName,
                    // stateCountry: item.address.stateCounty,
                    // houseNumber: item.address.houseNumber,
                }
            }));
            let dates : any = [];
            data.getAllGigsForUser.map((gig: any) => {
                const date = gig.date;
                dates.push(date);
            });
            setGigDates(dates);
            const obj = dates.reduce( (c:any, v:any) => Object.assign(
                c, { [v.split('T')[0]]: { 
                    selected: true, 
                    selectedColor: 'rgba(127, 127, 127, .5)', 
                    marked: true, 
                    dotColor: '#FFFFFF',
                } }), 
            {} ); 
            setMarkedDates({obj});
        }
    }, [data]);

    return (
    
        <SafeAreaView>
            <View>
                <DefaultHeader title={'Calendar'} navigation={props.navigation}/>
            </View>
            {loading &&  <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
            {!isLoggedIn && <AuthPlaceholder title={'You have not registered any gigs yet. Signup or login to get started!'}/>}
            
            {markedDates ? 
                <View>
                    <CalendarList
                        markedDates={markedDates.obj}
                        calendarWidth={320}
                        theme={{ todayTextColor: '#000000', dayTextColor: '#7F7F7F' }}
                    />
                </View>
            :

                <View>
                    <CalendarList
                        calendarWidth={320}
                        theme={{ todayTextColor: '#000000', dayTextColor: '#7F7F7F' }}
                    />
                </View>
            }   
        </SafeAreaView>
    );
}
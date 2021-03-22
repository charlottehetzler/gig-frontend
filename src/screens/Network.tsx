import React, { useState, useMemo } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, StatusBar, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { DefaultHeader } from '../components/Header/DefaultHeader';
import { GigColors } from '../constants/colors';
import { GET_FRIEND_REQUESTS, GET_NUMBER_OF_FRIENDS} from '../lib/friend';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import { Friend } from '../components/Card/Friend';
import { NoDataText } from '../components/Placeholder/NoDataText';



export default function NetworkScreen(props: any) {

    const currentUserId = useSelector((state: any) => state.user.userId);
    
    const { data: friendData, loading: friendLoading, error: friendError, refetch: friendRefetch } = useQuery(GET_NUMBER_OF_FRIENDS, {variables: {query: {currentUserId: currentUserId } }});
    
    const { data: requestData, loading: requestLoading, error: requestError, refetch: requestRefetch } = useQuery(GET_FRIEND_REQUESTS, {variables: {query: {currentUserId: currentUserId} }});

    const [ numberOfFriends, setNumberOfFriends ] = useState(0);

    const [ requests, setRequests ] = useState();

    useMemo(() => {
        if (friendData && friendData?.getNumberOfFriendsForUser) {
            setNumberOfFriends(friendData?.getNumberOfFriendsForUser);
        } 
        if (requestData && requestData?.getFriendRequestsForUser) {
            setRequests(requestData?.getFriendRequestsForUser);
        }
    }, [friendData, requestData]);

    const fetchRequests = async () => {
        try {
            const refetchData = await requestRefetch();

            if (refetchData && refetchData?.getFriendRequestsForUser) {
                setRequests(refetchData?.getFriendRequestsForUser);
            }
        } catch (e) {
            console.log(e)
        }
    }

    const loading = useMemo(() => {
        return friendLoading || requestLoading;
    }, [ friendLoading, requestLoading ]);

    const renderItem = ({ item } : any) => (
        <Friend 
          firstName={item["firstName"]} 
          lastName={item["lastName"]} 
          userId={item["userId"]}
          currentUserId={currentUserId}
          onUpdate={fetchRequests}
          isFriend={false}
          navigation={props.navigation}
        />
      );


    return (
        <SafeAreaView style={styles.container}>
        <View>
            <DefaultHeader title={'my network'} navigation={props.navigation} goBack={true}/>
        </View> 
        {loading &&  <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
        
        {numberOfFriends !== 0 ?  
            <TouchableOpacity style={styles.friendsButton} onPress={() => props.navigation.navigate('Friends')}>
                <Text style={styles.h4Style}>All ({numberOfFriends})</Text>
                <Icon type='material' name='keyboard-arrow-right' />
            </TouchableOpacity>
        :
            <View style={styles.friendsButton}>
                <Text style={styles.h4Style}>All ({numberOfFriends})</Text>
                <Icon type='material' name='keyboard-arrow-right' />
            </View>
        }
        <View style={styles.friendSection}>
            <Text style={styles.h4Style}>Requests</Text>
            {requests && requests.length > 0 &&
                <FlatList
                    data={requests}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            }
            {requests && requests.length === 0 &&
                <NoDataText text={`You have no pending friend requests.`}/>
            }

        </View>
        
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight || 0
    },
    friendsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    h4Style: {
        fontSize: 26
    },
    friendSection: {
        paddingHorizontal: 10
    }
});

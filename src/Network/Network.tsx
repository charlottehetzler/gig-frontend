import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, StatusBar, Text, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { DefaultHeader } from '../components/Header/DefaultHeader';
import { GET_FRIEND_REQUESTS, GET_NUMBER_OF_FRIENDS, GET_NEW_USERS} from '../lib/friend';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import { NoDataText } from '../components/Placeholder/NoDataText';
import { GigColors } from '../constants/colors';
import { Friend } from './Friend';


export default function NetworkScreen(props: any) {

    const currentUserId = useSelector((state: any) => state.user.userId);
    const type = useSelector( (state: any) => state.user.userType);
    const isConsumer = () => { return type === 'consumer' }
    
    const { data: friendData, loading: friendLoading, error: friendError, refetch: friendRefetch } = useQuery(GET_NUMBER_OF_FRIENDS, {variables: {query: {currentUserId: currentUserId } }});
    const { data: requestData, loading: requestLoading, error: requestError, refetch: requestRefetch } = useQuery(GET_FRIEND_REQUESTS, {variables: {query: {currentUserId: currentUserId} }});
    const { data: newUserData, loading: newUserLoading, error: newUserError, refetch: newUserRefetch } = useQuery(GET_NEW_USERS, {variables: {query: {currentUserId: currentUserId} }});

    const [ numberOfFriends, setNumberOfFriends ] = useState(0);
    const [ requests, setRequests ] = useState();
    const [ newUsers, setNewUsers ] = useState();
    const [ refreshing, setRefreshing ] = useState(false);

    useEffect(() => {
        onUpdate()
    }, [numberOfFriends, requests, newUsers])

    useMemo(() => {
        if (friendData && friendData?.getNumberOfFriendsForUser) {
            setNumberOfFriends(friendData?.getNumberOfFriendsForUser);
        } 
        if (requestData && requestData?.getFriendRequestsForUser) {
            setRequests(requestData?.getFriendRequestsForUser);
        }
        if (newUserData && newUserData?.getNewUsers) {
            setNewUsers(newUserData?.getNewUsers)
        }
    }, [friendData, requestData, newUserData]);

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

    const fetchNumberOfFriends = async () => {
        try {
            const refetchData = await friendRefetch();
            if (refetchData && refetchData?.getNumberOfFriendsForUser) {
                setNumberOfFriends(refetchData?.getNumberOfFriendsForUser);
            }
        } catch (e) {
            console.log(e)
        }
    }

    const fetchNewUsers = async () => {
        try {
            const refetchData = await newUserRefetch();
            if (refetchData && refetchData?.getNewUsers) {
                setNewUsers(refetchData?.getNewUsers);
            }
        } catch (e) {
            console.log(e)
        }
    }

    const onUpdate = () => {
        fetchRequests();
        fetchNumberOfFriends();
        fetchNewUsers();
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await newUserRefetch()
        setRefreshing(false)
      }, [refreshing]);
  
    const loading = useMemo(() => {
        return friendLoading || requestLoading || newUserLoading;
    }, [ friendLoading, requestLoading, newUserLoading ]);

    const renderItem = ({ item } : any) => (
        <Friend 
          firstName={item["firstName"]} 
          lastName={item["lastName"]} 
          userId={item["id"]}
          currentUserId={currentUserId}
          onUpdate={onUpdate}
          isFriend={false}
          isNew={false}
          navigation={props.navigation}
          isConsumer={isConsumer()}
        />
    );

    const renderNewUser = ({ item } : any) => (
        <Friend 
          firstName={item["firstName"]} 
          lastName={item["lastName"]} 
          userId={item["id"]}
          currentUserId={currentUserId}
          onUpdate={onUpdate}
          isFriend={false}
          isNew={true}
          navigation={props.navigation}
          isConsumer={isConsumer()}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <DefaultHeader title={'Network'} navigation={props.navigation} goBack={false} isConsumer={isConsumer()}/>
            </View> 
            {loading &&  <ActivityIndicator size="large" color={GigColors.Blue} style={{alignItems:'center', justifyContent:'center'}}/>}

            {numberOfFriends !== 0 ?  
                <TouchableOpacity 
                    style={styles.friendsButton} 
                    onPress={() => props.navigation.navigate('Friends', { isConsumer: isConsumer() })}
                >
                    <Text style={styles.h4Style}>All ({numberOfFriends})</Text>
                    <Icon 
                        type='material' 
                        name='keyboard-arrow-right' 
                        color={isConsumer() ? GigColors.Sky : GigColors.Mustard} size={35}
                    />
                </TouchableOpacity>
            :
                <View style={styles.friendsButton}>
                    <Text style={styles.h4Style}>All ({numberOfFriends})</Text>
                    {/* <Icon type='material' name='keyboard-arrow-right' /> */}
                </View>
            }
            <View style={styles.friendSection}>
                <Text style={styles.h4Style}>Requests</Text>
                {requests && requests.length > 0 &&
                    <FlatList
                        data={requests}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                    />
                }
                {requests && requests.length === 0 &&
                    <View>
                        <NoDataText text={`You have no pending friend requests.`}/>
                    </View>
                }
            </View>
            <View style={styles.friendSection}>
                <Text style={styles.h4Style}>New to Gig</Text>
                {newUsers && newUsers.length > 0 && 
                    <FlatList
                        data={newUsers}
                        renderItem={renderNewUser}
                        keyExtractor={item => item.id.toString()}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    />
                }
                {newUsers && newUsers.length === 0 &&
                    <View>
                        <NoDataText text={`You're connected to all Gig Users`}/>
                    </View>
                }
            </View>
        
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight || 0,
    },
    friendsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        marginHorizontal: 16
    },
    h4Style: {
        fontSize: 26,
        color: GigColors.Blue,
        paddingBottom: 15
    },
    friendSection: {
        paddingBottom: 30,
        marginHorizontal: 16
    }
});

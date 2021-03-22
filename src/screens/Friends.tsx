import React, { useState, useMemo } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, StatusBar, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { DefaultHeader } from '../components/Header/DefaultHeader';
import { GET_FRIENDS} from '../lib/friend';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { GigColors } from '../constants/colors';
import { Friend } from '../components/Card/Friend';

export default function FriendsScreen(props: any) {
    
    const currentUserId = useSelector((state: any) => state.user.userId);

    const { data, loading, error, refetch } = useQuery(GET_FRIENDS, {variables: {query: {currentUserId: currentUserId } }});

    const [ friends, setFriends ] = useState();

    useMemo(() => {
        if (data && data?.getFriendsForUser) {
            setFriends(data?.getFriendsForUser);
        }
    }, [data]);

    
    const renderItem = ({ item } : any) => (
        <Friend 
          firstName={item["firstName"]} 
          lastName={item["lastName"]} 
          userId={item["id"]}
          currentUserId={currentUserId}
          isFriend={true}
          navigation={props.navigation}
        />
    ); 

    return (
        <SafeAreaView style={styles.container}>
        <View>
            <DefaultHeader title={'my friends'} navigation={props.navigation} goBack={true}/>
        </View> 
        {loading &&  <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
        
        {friends && friends.length > 0 && <>
            <FlatList
                data={friends}
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
    title: {
        fontSize: 18,
        textAlign: 'center',
        textTransform: 'uppercase',
        color: GigColors.Black
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
});

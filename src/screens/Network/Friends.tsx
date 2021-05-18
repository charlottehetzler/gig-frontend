import React, { useState, useMemo } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, StatusBar, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { DefaultHeader } from '../../components/Header/DefaultHeader';
import { GET_FRIENDS} from '../../lib/friend';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { GigColors } from '../../constants/colors';
import { Friend } from '../../components/Card/Friend';
import FriendSearch from '../../components/Search/FriendSearch';

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
          isNew={false}
          navigation={props.navigation}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
        <View>
            <DefaultHeader title={'Friends'} navigation={props.navigation} goBack={true}/>
        </View> 
        {loading &&  <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
        <View style={{marginHorizontal: 16}}>
            {friends && friends.length > 0 && <>
                <FriendSearch isChat={false} navigation={props.navigation}/>
                <FlatList
                    data={friends}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    style={{paddingTop: 20}}
                />
            </>}

        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight || 0
    }
});

import React, { useState, useMemo } from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GigColors } from '../../constants/colors';
import { GET_COMMON_CHAT_ROOM } from '../../lib/chat';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';


export function MessageButton (props: any) {

    const currentUserId = useSelector((state: any) => state.user.userId);

    const { navigate } = props.navigation;

    const { data, loading, error } = useQuery(GET_COMMON_CHAT_ROOM, {variables: {currentUserId: currentUserId, userId: props.userId} });  

    const [ chatRoomId, setChatRoomId ] = useState();

    useMemo(() => {
        if (data && data?.getCommonChatRoom) {
          setChatRoomId(data?.getCommonChatRoom.id);
        }
      }, [data]);

    return (<>
        {loading && <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
        
        <TouchableOpacity style={[styles.profileAction]} onPress={() => navigate('Chat', {
            chatRoomId: chatRoomId, userId: props.userId, firstName: props.firstName, lastName: props.lastName
        })}>
            <Icon type='material' name='mail-outline' color={GigColors.Black} style={{marginRight: 10}}/>
            <Text>Message</Text>
        </TouchableOpacity>
    </>)
}


const styles = StyleSheet.create({
    profileAction: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: GigColors.Black,
        borderWidth: 1,
        borderRadius: 4,
        padding: 5,
      },
});
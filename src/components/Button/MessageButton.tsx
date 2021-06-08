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

    const handleSelect = () => {
        navigate('Chat', {
            chatRoomId: chatRoomId, userId: props.userId, firstName: props.firstName, lastName: props.lastName
        });
        if (props.isSearchBar) {
            props.onSelect();
        }
    }

    return (<>
        {loading && <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}

        <TouchableOpacity 
            style={[
                props.isSearchBar ? styles.searchAction : styles.profileAction,
                {backgroundColor: props.isConsumer ? GigColors.Sky : GigColors.Mustard}
            ]} 
            onPress={handleSelect}
        >
            {!props.isSearchBar ? <>
                <Icon type='material' name='mail-outline' color={GigColors.White}/>
                {/* <Text style={props.isSearchBar ? styles.searchText : null}>{props.title}</Text> */}
            </>
            :   <>
                <Text style={props.isSearchBar ? styles.searchText : null}>{props.title}</Text>
                <Icon type='material' name='keyboard-arrow-right' color={GigColors.Blue} />
                </>
            }
        </TouchableOpacity>
    </>)
}


const styles = StyleSheet.create({
    profileAction: {
        borderRadius: 50,
        padding: 10
    },
    searchAction: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: GigColors.White
    },
    searchText: {
        fontSize: 18, 
        color: GigColors.Blue
    }
});
import React, { useState, useMemo } from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GigColors } from '../../constants/colors';
import { useQuery, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { ACCEPT_OR_DECLINE_REQUEST } from '../../lib/friend';



export function RequestButton (props: any) {

    const currentUserId = useSelector((state: any) => state.user.userId);

    const [ doUpdateRequest, { loading: updateRequestLoading } ] = useMutation(ACCEPT_OR_DECLINE_REQUEST);

    // console.log(props)
    const onUpdateRequest = async () => {
        
        try {
            const { data, errors } = await doUpdateRequest({
                variables: { input: {currentUserId: currentUserId, userId: props.userId, status: props.status} }
            });
            if (data && data?.acceptOrDeclineRequest) {
                props.onUpdate();
            }
        } catch (e) {
          console.log(e);
        }
    }

    return (
        <TouchableOpacity style={styles.requestButton} onPress={onUpdateRequest}>
            {updateRequestLoading && <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
            <Text>{props.title}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    requestButton: {
        borderColor: GigColors.Black,
        borderWidth: 1,
        borderRadius: 4,
        padding: 5,
        marginLeft: 5
    }
});
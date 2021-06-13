import React  from 'react';
import {StyleSheet, Text, ActivityIndicator} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GigColors } from '../../constants/colors';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { ACCEPT_OR_DECLINE_REQUEST, SEND_FRIEND_REQUEST } from '../../lib/friend';


export function RequestButton (props: any) {

    const currentUserId = useSelector((state: any) => state.user.userId);

    const [ doUpdateRequest, { loading: updateRequestLoading } ] = useMutation(ACCEPT_OR_DECLINE_REQUEST);
    
    const [ doSendRequest, { loading: sendRequestLoading } ] = useMutation(SEND_FRIEND_REQUEST);

    const onUpdateRequest = async () => {
        try {
            if (props.status === 'connect') {
                const { data, errors } = await doSendRequest({
                    variables: { input: {currentUserId: currentUserId, userId: props.userId} }
                });
                if (data && data?.sendFriendRequest) {
                    props.onUpdate();
                }
            } else {
                const { data, errors } = await doUpdateRequest({
                    variables: { input: {currentUserId: currentUserId, userId: props.userId, status: props.status} }
                });
                if (data && data?.acceptOrDeclineRequest) {
                    props.onUpdate();
                }
            }
        } catch (e) {
          console.log(e);
        }
    }

    return (
        <TouchableOpacity 
            style={[styles.requestButton, { borderColor: props.isConsumer ? GigColors.Sky : GigColors.Mustard}]} 
            onPress={onUpdateRequest}
        >
            {updateRequestLoading && <ActivityIndicator size="large" color={GigColors.Blue} style={{alignItems:'center', justifyContent:'center'}}/>}
            <Text style={{color: props.isConsumer ? GigColors.Sky : GigColors.Mustard}}>{props.title}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    requestButton: {
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginLeft: 5
    }
});
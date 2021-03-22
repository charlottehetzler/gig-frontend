import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Avatar, Rating, AirbnbRating } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GigColors } from '../../constants/colors';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AVG_RATING_FOR_SKILL } from '../../lib/review';
import { ACCEPT_OR_DECLINE_REQUEST } from '../../lib/friend';


export function Friend (props: any) {
        
    const { navigate } = props.navigation;

    const getInitials = (firstName : string, lastName : string) => {
        let first = firstName.charAt(0).toUpperCase();
        let last = lastName.charAt(0).toUpperCase();
        return first + last;
    }

    const [ doUpdateRequest, { loading: updateRequestLoading } ] = useMutation(ACCEPT_OR_DECLINE_REQUEST);

    const onUpdateRequest = async () => {
        try {
            const { data, errors } = await doUpdateRequest({
                variables: { input: {currentUserId: props.currentUserId, userId: props.userId, status: 'accept'} }
            });
            if (data && data?.acceptOrDeclineRequest) {
                props.onUpdate();
            }
        } catch (e) {
          console.log(e);
        }
    }

    return ( <>
        <View style={styles.card}>
            <Avatar title={getInitials(props.firstName, props.lastName)} containerStyle={styles.avatar} size={60} />
            <Text style={styles.name}>{props.firstName + " " + props.lastName}</Text>
            <TouchableOpacity style={styles.requestButton} onPress={onUpdateRequest}>
                {updateRequestLoading &&  
                    <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>
                }
                <Text>Accept</Text>
            </TouchableOpacity>
        </View>
   </> )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: GigColors.White,
        borderRadius: 4,
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: GigColors.Grey,
        borderBottomWidth: 1,
    },
    avatar: {
        backgroundColor: GigColors.DarkGrey, 
        borderRadius: 50, 
        marginRight: 20
    },
    name: {
        fontSize: 18,
        textAlign: 'left',
        fontWeight: '600',
        color: GigColors.Black,
        marginBottom: 5
    },
    requestButton: {
        borderWidth: 1,
        borderBottomColor: GigColors.Black,
        padding: 5,
        justifyContent: 'center'
    }
});
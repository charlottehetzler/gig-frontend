import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_USER } from '../lib/user';
import { USER_UPDATE } from '../redux/actions/user';
import { GigColors } from '../constants/colors';

export default function DecisionScreen (props:any) {
    const [ doUserUpdate, { loading: userUpdateLoading } ] = useMutation(UPDATE_USER);
    
    const dispatch = useDispatch();

    const userId = useSelector( (state: any) => state.user.userId);

    const handleDecision = async (val: string) => {
        try {
            const { data, errors } = await doUserUpdate({
                variables: { input: { userId: userId, type: val }}
            });
            if (data.userUpdate) {
                dispatch({
                    type: USER_UPDATE, 
                    token: data.userUpdate.token, 
                    userId: data.userUpdate.userId, 
                    isLoggedIn: true,
                    firstName: data.userUpdate.firstName, 
                    lastName: data.userUpdate.lastName,
                    userType: data.userUpdate.userType
                });
                props.navigation.navigate('HomeScreen');
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <View style={styles.center}>
        <TouchableOpacity style={styles.producer} onPress={() => handleDecision('producer')}>
            <Text style={styles.producerTitle}>Producer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.consumer} onPress={() => handleDecision('consumer')}>
            <Text style={styles.consumerTitle}>Consumer</Text>
        </TouchableOpacity>
    </View>
  );
};
    
const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    producerTitle: {
        fontSize: 25,
        marginBottom: 16,
        textAlign: 'center',
        color: GigColors.Black
    },
    consumerTitle: {
        fontSize: 25,
        marginBottom: 16,
        textAlign: 'center',
        color: GigColors.White
    },
    producer: {
        backgroundColor: GigColors.White,
        height: '50%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    consumer: {
        backgroundColor: GigColors.Black,
        height: '50%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
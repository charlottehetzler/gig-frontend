import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_USER } from '../lib/user';
import { USER_UPDATE, saveUserDataToStorage } from '../redux/actions/user';
import { GigColors } from '../constants/colors';
import * as Animatable from 'react-native-animatable';

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
                    // firstName: data.userUpdate.firstName, 
                    // lastName: data.userUpdate.lastName,
                    userType: data.userUpdate.userType
                });
                saveUserDataToStorage(data.userUpdate.userId,data.userUpdate.token, data.userUpdate.userType);
                props.navigation.navigate('HomeScreen');
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={GigColors.White} barStyle="light-content"/>
            <Animatable.View animation="fadeInUpBig" style={styles.header}>
                <Text style={styles.textHeader}>Welcome to gig!</Text>
                <Text style={styles.textSubheader}>Choose your role</Text>
                <Text style={styles.text}>No worries - you can switch your role at any time!</Text>
                <View style={styles.tiles}>
                    <TouchableOpacity style={[styles.tile, {backgroundColor: GigColors.Mustard}]} onPress={() => handleDecision('producer')}>
                        <Text style={styles.tileTitle}>Producer</Text>
                        <Text style={styles.tileText}>
                            Offer your skills and find cool gigs! 
                            Publish flash sales and build your own gig network!
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tile, {backgroundColor: GigColors.Sky}]} onPress={() => handleDecision('consumer')}>
                        <Text style={styles.tileTitle}>Consumer</Text>
                        <Text style={styles.tileText}>
                            Find the perfect producer for your needs! 
                            Post urgent needs and connect with your friends!
                        </Text>
                    </TouchableOpacity>

                </View>

            </Animatable.View>
        </View>
    );
};
    
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: GigColors.White
    },
    header: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 40, 
        marginTop: 50, 
        alignItems: 'center'
    },
    textHeader: {
        color: GigColors.Blue,
        fontWeight: 'bold',
        fontSize: 30
    },
    textSubheader: {
        color: GigColors.Blue,
        fontSize: 24,
        paddingTop: 10
    },
    text: {
        fontSize: 18,
        color: GigColors.Taupe,
        paddingTop: 20
    },
    tiles: {
        marginTop: 50,
        marginHorizontal: 16
    },
    tile: {
        backgroundColor: GigColors.Mustard,
        alignItems: 'center',
        justifyContent: 'center', 
        borderRadius: 10, 
        paddingHorizontal: 16,
        paddingVertical: 40,
        marginBottom: 60
    }, 
    tileTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: GigColors.White
    },
    tileText: {
        fontSize: 18,
        marginBottom: 16,
        textAlign: 'center',
        color: GigColors.White
    }
});
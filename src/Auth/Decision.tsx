import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import { connect, useSelector, useDispatch } from 'react-redux';

import { SetUserRole, RetrieveDataAssyncStorage } from '../redux/middlewares/user'; // importing middleware functions
import { GigColors } from '../constants/colors';
import * as Animatable from 'react-native-animatable';
import { ActionTypes } from '../redux/actions/user';

function DecisionScreen(props: any) {
    const [userUID, setUserUID] = useState<string>('');

    const getUserUID = useSelector((state: any) => state.user.uid);
    const dispatch = useDispatch();
    const { isSignUp } = props.route.params;
    useEffect(() => {
        props.RetrieveDataAssyncStorageAction();

    }, []);

    useEffect(() => {
        setUserDetails();
    }, [props.userData]);

    const setUserDetails = () => {
        const { uid } = props.userData;
        setUserUID(uid);

    };
    const selectRole = async (val: string) => {
        let uid = userUID || getUserUID;
        if (isSignUp) {
            dispatch({
                type: ActionTypes.SELECT_USER_ROLE,
                payload: val
            });
            props.navigation.goBack()
        } else {
            props.SetUserRoleAction(val, uid);
        }
    }
    return (

        <SafeAreaView style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >


                <View>
                    <StatusBar backgroundColor={GigColors.White} barStyle="light-content" />
                    <Animatable.View animation="fadeInUpBig" style={styles.header}>
                        <Text style={styles.textHeader}>Welcome to gig!</Text>
                        <Text style={styles.textSubheader}>Choose your role</Text>
                        <Text style={styles.text}>No worries - you can switch your role at any time!</Text>
                        <View style={styles.tiles}>

                            <TouchableOpacity style={[styles.tile, { backgroundColor: GigColors.Mustard }]} onPress={() => selectRole('producer')}>
                                <Text style={styles.tileTitle}>Producer</Text>
                                <Text style={styles.tileText}>
                                    Offer your skills and find cool gigs!
                                    Publish flash sales and build your own gig network!
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.tile, { backgroundColor: GigColors.Sky }]} onPress={() => selectRole('consumer')}>
                                <Text style={styles.tileTitle}>Consumer</Text>
                                <Text style={styles.tileText}>
                                    Find the perfect producer for your needs!
                                    Post urgent needs and connect with your friends!
                                </Text>
                            </TouchableOpacity>



                        </View>

                    </Animatable.View>
                </View>




            </ScrollView>
        </SafeAreaView >
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
function mapStateToProps(state: any) {
    return {
        userData: state.user.async_storage_data?.data?.store
    }
}
function mapDispatchToProps(dispatch: any) {
    return ({
        // set/update user role to DB
        SetUserRoleAction: (role: string, userUID: string) => { dispatch(SetUserRole(role, userUID)) },
        // get user data from asyncstorage
        RetrieveDataAssyncStorageAction: () => { dispatch(RetrieveDataAssyncStorage()); },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(DecisionScreen);
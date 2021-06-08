import React from 'react';
import { Text } from 'react-native-elements';
import { StyleSheet, View, TouchableOpacity, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { GigColors } from '../constants/colors';

export default function ProfileCreationScreen ( props  : any ) {

const { email, password } = props.route.params;

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={GigColors.White} barStyle="light-content"/>
            <Animatable.View animation="fadeInUpBig" style={styles.header}>
                <Text style={styles.textHeader}>You successfully signed up!</Text>
                <Text style={styles.textSubheader}>Now we just need some few more personal details to get you started.</Text>
                <TouchableOpacity 
                    style={[styles.signIn, {backgroundColor: GigColors.Blue}]} 
                    onPress={() => props.navigation.navigate('UpdateProfile', {email: email, password: password})}
                    >
                    <Text style={[styles.textSigIn, {color: GigColors.White}]}>Continue</Text>
                </TouchableOpacity>

            </Animatable.View>
        </View>
    );
}


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
        marginTop: 70
    },
    textSubheader: {
        color: GigColors.Blue,
        fontSize: 20,
        paddingTop: 20
    },
    textHeader: {
        color: GigColors.Blue,
        fontWeight: 'bold',
        fontSize: 30
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, 
        marginTop: 100
    },
    textSigIn: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });
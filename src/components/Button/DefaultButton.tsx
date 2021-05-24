import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GigColors } from '../../constants/colors';


export function DefaultButton (props: any) {
    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress} >
            <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export function DisabledDefaultButton (props: any) {
    console.log(props)
    return (
        <View style={styles.disabled}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </View>
    )
}

export function WhiteDefaultButton (props: any) {
    return (
        <View style={styles.white}>
            <Text style={styles.buttonTextBlack}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center', 
        paddingVertical: 15,
        backgroundColor: GigColors.Mustard,
        borderRadius: 10, 
        marginVertical: 5
    },
    disabled: {
        alignItems: 'center', 
        paddingVertical: 15,
        backgroundColor: 'rgba(209, 165, 23, 0.5)',
        borderRadius: 10, 
        marginVertical: 5
    },
    white:{
        alignItems: 'center', 
        paddingVertical: 15,
        backgroundColor: GigColors.White,
        borderRadius: 10, 
        marginVertical: 5,
        borderColor: GigColors.DarkGrey,
        borderWidth: 1
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: GigColors.Blue, 
        textTransform: 'uppercase'
    },
    buttonTextBlack: {
        fontSize: 20,
        textAlign: 'center',
        color: GigColors.Black, 
        textTransform: 'uppercase'
    }
});
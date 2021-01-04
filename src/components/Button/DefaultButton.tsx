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
    return (
        <View style={styles.disabled}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center', 
        paddingVertical: 15,
        backgroundColor: GigColors.Black,
        borderRadius: 10, 
        marginVertical: 5
    },
    disabled: {
        alignItems: 'center', 
        paddingVertical: 15,
        backgroundColor: GigColors.DarkGrey,
        borderRadius: 10, 
        marginVertical: 5
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: GigColors.White, 
        textTransform: 'uppercase'
    },
});
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GigColors } from '../../constants/colors';

type Props = { title: string, navigation: any }

export function DefaultButtom ({title, navigation} : Props) {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
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
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: GigColors.White, 
        textTransform: 'uppercase'
    },
});
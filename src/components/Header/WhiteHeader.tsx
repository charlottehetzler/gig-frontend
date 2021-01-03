import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GigColors } from '../../constants/colors';

type Props = { title: string, navigation: any }

export function WhiteHeader ({title, navigation} : Props) {
    return (
        <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.goBack()}>
                <Icon type={'material'} name='keyboard-backspace' color={'#7F7F7F'}/>
                <Text style={styles.iconText}>back</Text> 
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: GigColors.White,
        paddingVertical: 10
    },
    iconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    },
    iconText: {
        color: GigColors.DarkGrey,
        marginLeft: 10
    }
});
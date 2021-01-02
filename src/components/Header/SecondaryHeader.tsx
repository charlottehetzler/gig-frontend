import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GigColors } from '../../constants/colors';

type Props = { title: string, navigation: any }

export function SecondaryHeader ({title, navigation} : Props) {
    return (
    <View >
        <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.goBack()}>
                <Icon type={'material'} name='keyboard-backspace' color={'#FFFFFF'}/>
                {/* <Text style={styles.iconText}>back</Text> */}
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}</Text>
            <Icon name='add' color={'#FFFFFF'}/>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
        height: 75,
        backgroundColor: GigColors.DarkGrey
    },
    iconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    },
    iconText: {
        color: GigColors.White,
        marginLeft: 10
    },
    headerTitle: {
        fontSize: 20,
        textAlign: 'center',
        color: GigColors.White,
    },
});
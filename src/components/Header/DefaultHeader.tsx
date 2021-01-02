import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GigColors } from '../../constants/colors';

type Props = { title: string, navData: any }

export function DefaultHeader ({title, navData} : Props) {
    return (
        <View >
            <View style={styles.headerWrapper}>
                <TouchableOpacity onPress={() => navData.toggleDrawer()}>
                    <Icon name='menu' style={styles.icon}/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{title}</Text>
                <Icon name='add' style={styles.icon}/>
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
    headerTitle: {
        fontSize: 20,
        textAlign: 'center',
        color: GigColors.White
    },
    icon: {
        color: GigColors.White
    }
});
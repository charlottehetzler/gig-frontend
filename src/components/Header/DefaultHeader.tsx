import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { Icon } from 'react-native-elements';

type Props = { title: string }

export function DefaultHeader ({title} : Props) {
    return (
    <View >
        <View style={styles.headerWrapper}>
            <Icon name='menu' color='#ffffff'/>
            <Text style={styles.headerTitle}>{title}</Text>
            <Icon name='add' color='#ffffff'/>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 75, 
        alignItems: 'center', 
        justifyContent:'center',
        backgroundColor: 'grey'
    },
    headerTitle: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    },
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
        height: 75,
        backgroundColor: 'grey'
    }
});
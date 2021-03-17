import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { GigColors } from '../../constants/colors';

export function NoDataText (props: any) {
    
    return (
        <View>
            <Text style={styles.noItems}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    noItems: {
        marginTop: 10,
        color: GigColors.DarkGrey
    }
});
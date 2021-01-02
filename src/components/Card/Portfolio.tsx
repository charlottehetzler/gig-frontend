import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GigColors } from '../../constants/colors';

type Props = { name: string }

export function Portfolio ({name} : Props) {
    return (
        <View style={styles.portfolio}>
          <Text style={styles.portfolioText} >{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    portfolio: {
        textTransform: 'uppercase',
        backgroundColor: GigColors.DarkGrey,
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 5,
        width: 100,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }, 
    portfolioText: {
        color: GigColors.White
    }
});
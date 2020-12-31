import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Props = { title: string }

export function Tile ({title} : Props) {
    return (
        <View >
            <TouchableOpacity style={styles.item}  >
                <Text style={styles.title}>{title} </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#C4C4C4',
        borderRadius: 4,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        textTransform: 'uppercase'
    }
  })
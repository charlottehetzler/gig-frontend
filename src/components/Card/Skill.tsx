import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

type Props = { name: string }

export function Skill ({name} : Props) {
    return (
        <View>
          <Text style={styles.skill}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    skill: {
        borderWidth: 1,
        borderColor: '#7F7F7F',
        textTransform: 'uppercase',
        padding: 5,
        borderRadius: 4,
        color: '#7F7F7F',
        marginBottom: 10
    }
});
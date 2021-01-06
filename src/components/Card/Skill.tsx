import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GigColors } from '../../constants/colors';

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
        borderColor: GigColors.DarkGrey,
        textTransform: 'uppercase',
        padding: 5,
        borderRadius: 4,
        color: GigColors.DarkGrey,
        marginBottom: 10,
        marginRight: 3,
    }
});
import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { Icon } from 'react-native-elements';

type Props = { title: string, firstName: string, lastName: string, date: string }

export function Gig ({title, firstName, lastName, date} : Props) {
    return (
        <View style={styles.card}>        
            <View style={styles.text}>
                <Text style={styles.name}>{title}</Text>
                <Text style={styles.smallText}>{firstName + " " + lastName}</Text>
            </View>

            <View>
                <Text style={styles.date}> {date}</Text>
            </View>

            <Icon
                type={Platform.OS === 'ios' ? 'ionicon' : 'material'}
                color="#D1D1D6"
                name={
                    Platform.OS === 'ios'
                    ? 'chevron-forward-outline'
                    : 'keyboard-arrow-right'
                }
                size={16}
            />
      </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        paddingVertical: 20,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
        flex: 1
    },
    avatar: {
        backgroundColor: 'grey', 
        borderRadius: 50, 
        marginRight: 10
    },
    text: {
        width: 200,
        alignItems: 'flex-start'
    },
    name: {
        fontSize: 18,
        textAlign: 'left',
        fontWeight: '600',
        color: '#000000',
        marginBottom: 5
    },
    date: {
        fontSize: 12,
        textAlign: 'right',
        fontWeight: '300',
        color: '#C4C4C4'
    },
    smallText: {
        fontSize: 14,
        color: '#000000',
    }
});
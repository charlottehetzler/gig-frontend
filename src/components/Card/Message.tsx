import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { GigColors } from '../../constants/colors';

type Props = { firstName: string, lastName: string, message: string}

export function Message ({firstName, lastName, message} : Props) {
    const getInitials = (firstName : string, lastName : string) => {
        let first = firstName.charAt(0).toUpperCase();
        let last = lastName.charAt(0).toUpperCase();
        return first + last;
    }
    return (
        <View style={styles.card}>
            <Avatar title={getInitials(firstName, lastName)} containerStyle={styles.avatar} size={60} />
        
            <View style={styles.text}>
                <Text style={styles.name}>{firstName + " " + lastName}</Text>
                <Text style={styles.smallText}>{message}</Text>
            </View>

            <View>
                {/* <Text style={styles.date}>Last Gig:</Text>
                <Text style={styles.date}> {lastGig}</Text> */}
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

      </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: GigColors.White,
        borderRadius: 4,
        paddingVertical: 20,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: GigColors.Grey,
        borderBottomWidth: 1,
        flex: 1
    },
    avatar: {
        backgroundColor: GigColors.DarkGrey, 
        borderRadius: 50, 
        marginRight: 10
    },
    text: {
        width: 250,
        alignItems: 'flex-start'
    },
    name: {
        fontSize: 18,
        textAlign: 'left',
        fontWeight: '600',
        color: GigColors.Black,
        marginBottom: 5
    },
    smallText: {
        fontSize: 14,
        color: GigColors.Black,
    }
});
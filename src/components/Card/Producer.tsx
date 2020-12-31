import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar, Rating } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = { firstName: string, lastName: string, rating: number, lastGig: string, userId: number, navigation: any }

export function Producer ({firstName, lastName, rating, lastGig, userId, navigation} : Props) {
    const getInitials = (firstName : string, lastName : string) => {
        let first = firstName.charAt(0).toUpperCase();
        let last = lastName.charAt(0).toUpperCase();
        return first + last;
    }
    const { navigate } = navigation;
    
    return (
        <TouchableOpacity style={styles.card} onPress={() => navigate('Profile', {userId: userId})}>
            <Avatar title={getInitials(firstName, lastName)} containerStyle={styles.avatar} size={60} />
        
            <View style={styles.text}>
                <Text style={styles.name}>{firstName + " " + lastName}</Text>
                <Rating imageSize={18} readonly startingValue={rating}/>
            </View>

            <View>
                <Text style={styles.date}>Last Gig:</Text>
                <Text style={styles.date}> {lastGig}</Text>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
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
    }
});
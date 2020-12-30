import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Rating } from 'react-native-elements';

type Props = { comment: string, rating: number, fromUser: string, date: string}

export function Review ({comment, rating, fromUser, date} : Props) {

    return (
        <View style={styles.card}>
            <View>
                <Text style={styles.name}>{fromUser}</Text>
                <Text style={styles.comment}>{comment}</Text>
            </View>
        
            <View>
                <Text style={styles.date}>{date}</Text>
                <View style={styles.rating}>
                    <Rating imageSize={16} readonly startingValue={rating}/>
                </View>
            </View>
      </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
        flex: 1
    },
    name: {
        fontSize: 20,
        textAlign: 'left',
        fontWeight: '600',
        color: '#000000',
        marginBottom: 5
    },
    comment: {
        fontSize: 16,
        color: '#7F7F7F',
    },
    smallText: {
        fontSize: 14,
        color: '#000000',
        marginTop: 10
    },
    rating: {
        marginTop: 10
    },
    date: {
        fontSize: 12,
        textAlign: 'right',
        fontWeight: '300',
        color: '#7F7F7F'
    }
});
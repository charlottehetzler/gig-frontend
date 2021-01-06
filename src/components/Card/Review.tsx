import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Rating } from 'react-native-elements';
import { GigColors } from '../../constants/colors';

type Props = { comment: string, rating: number, firstName: string, lastName: string, date: string}

export function Review ({comment, rating, firstName, lastName, date} : Props) {

    return (
        <View style={styles.card}>
            <View>
                <Text style={styles.name}>{firstName + " " + lastName}</Text>
                <Text style={styles.comment}>{comment}</Text>
            </View>
        
            <View>
                <Text style={styles.date}>{date.split('T')[0]}</Text>
                <View style={styles.rating}>
                    <Rating imageSize={16} readonly startingValue={rating}/>
                </View>
            </View>
      </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: GigColors.White,
        borderRadius: 4,
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: GigColors.Grey,
        borderBottomWidth: 1,
        flex: 1
    },
    name: {
        fontSize: 20,
        textAlign: 'left',
        fontWeight: '600',
        color: GigColors.Black,
        marginBottom: 5
    },
    comment: {
        fontSize: 16,
        color: GigColors.DarkGrey,
    },
    smallText: {
        fontSize: 14,
        color: GigColors.Black,
        marginTop: 10
    },
    rating: {
        marginTop: 10
    },
    date: {
        fontSize: 12,
        textAlign: 'right',
        fontWeight: '300',
        color: GigColors.DarkGrey
    }
});
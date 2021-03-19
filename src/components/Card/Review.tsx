import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';
import { GigColors } from '../../constants/colors';

type Props = { comment: string, rating: number, firstName: string, lastName: string, date: string}

export function Review ({comment, rating, firstName, lastName, date} : Props) {

    return (
        <View style={styles.card}>
            <View>
                <Text style={styles.name}>{firstName + " " + lastName}</Text>
                <View style={styles.rating}>
                    <AirbnbRating
                        count={5}
                        selectedColor={GigColors.Black}
                        defaultRating={rating}
                        size={15}
                        showRating={false}
                        isDisabled={true}
                    />
                </View>
                <Text style={styles.comment}>{comment}</Text>
            </View>
        
            <View>
                <Text style={styles.date}>{date.split('T')[0]}</Text>
            </View>
      </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: GigColors.White,
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottomColor: GigColors.Grey,
        borderBottomWidth:1,
        marginBottom: 5,
        flex:1
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
        marginBottom: 5,
    },
    date: {
        fontSize: 12,
        textAlign: 'right',
        fontWeight: '300',
        color: GigColors.DarkGrey
    }
});
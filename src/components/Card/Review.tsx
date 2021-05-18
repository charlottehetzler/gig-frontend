import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AirbnbRating } from 'react-native-elements';
import { GigColors } from '../../constants/colors';

type Props = { comment: string, rating: number, firstName: string, lastName: string, date: string}

export function Review ({comment, rating, firstName, lastName, date} : Props) {

    return (
        <View style={styles.card}>
            <View style={{alignItems: 'flex-start'}}>
                <Text style={styles.name}>{firstName + " " + lastName}</Text>
                <View style={styles.rating}>
                    <AirbnbRating
                        count={5}
                        selectedColor={GigColors.Blue}
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
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
        flex:1
    },
    name: {
        fontSize: 18,
        textAlign: 'left',
        fontWeight: '400',
        color: GigColors.Blue,
        marginBottom: 5
    },
    comment: {
        fontSize: 16,
        color: GigColors.Taupe,
    },
    rating: {
        marginBottom: 5,
    },
    date: {
        fontSize: 14,
        textAlign: 'right',
        fontWeight: '300',
        color: GigColors.Taupe
    }
});
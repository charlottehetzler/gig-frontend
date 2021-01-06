import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { GigColors } from '../../constants/colors';
import { PortfolioImage } from './PortfolioImage';

export function Portfolio (props: any) {
    return (
        <View style={styles.profileSection}>
            <View style={styles.sectionHeader}>
                <Text style={styles.h4Style}>My portfolio</Text>
                <TouchableOpacity style={styles.moreButton} onPress={() => console.log('See all reviews pressed')}>
                    <Text>See all</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.overview}>
            {props.portfolio.map((p) => { return (
                <PortfolioImage name={p.title} key={p.id}/>
            )})}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profileSection: {
        alignItems: 'flex-start',
        marginVertical: 5
    },
    h4Style: {
        marginTop: 15,
        fontSize: 24,
        textAlign: 'center',
    },
    moreButton: {
        backgroundColor: GigColors.White,
        color: GigColors.Black,
        borderWidth: 1,
        borderColor: GigColors.Black,
        paddingVertical: 3,
        paddingHorizontal: 5,
        borderRadius: 5,
        justifyContent: "center",
        marginBottom: 0,
        marginLeft: 10
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    overview: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10
    },


});
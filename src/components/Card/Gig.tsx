import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, Text, Platform, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import { GigColors } from '../../constants/colors';
import moment from 'moment';

type Props = { gig: any, navigation: any, currentUserId: number }

export function Gig (props: any) {

    const { navigate } = props.navigation;
    
    const [ gig, setGig ] = useState();
    
    const [ date, setDate ] = useState();

    // const [ otherUser, setOtherUser] = useState();
    
    // const getOtherUser = async () => {
    //     if (props.gig.members[0]['id'] === props.currentUserId) {
    //     setOtherUser(props.gig.members[1]);
    //     } else {
    //     setOtherUser(props.gig.members[0]);
    //     }
    // }

    // useEffect(() => {
    //     getOtherUser();
    // }, [])

    useMemo(() => {
        if (props && props.gig) {
            setGig(props.gig);
            setDate(props.gig.date);
        }
    }, [])

    const isMe = () => {
        return props.gig.members[0] === props.currentUserId;
    }

    const otherUser = () => {
        if (isMe()) {
            return props.gig.members[1]
        } else {
            return props.gig.members[0]
        }
    } 

    const isToday = () => {
        if(gig) {
            const today = new Date();
            const gigDate = gig.date;
            return gigDate.split('T')[0] === today.toISOString().split('T')[0];
        }
    }

    const isTomorrow = () => {
        if (gig) {
            var day = new Date();
            var nextDay = new Date(day);
            nextDay.setDate(day.getDate() + 1);
            const gigDate = gig.date;
            return nextDay.toISOString().split('T')[0] === gigDate.split('T')[0];
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Gig', {gig: props.gig, otherUser: otherUser()})}>
            <View style={styles.card}>
                { gig && <>
                <View style={styles.text}>

                    <Text style={styles.name}>{gig.title}</Text>
                    {isMe() ? 
                        <Text style={styles.smallText}>{gig.members[1].firstName + " " + gig.members[1].lastName}</Text>
                        :
                        <Text style={styles.smallText}>{gig.members[0].firstName + " " + gig.members[0].lastName}</Text>
                    }
                </View>

                <View>
                    {isToday() && <Text style={styles.date}> {moment(gig.date).endOf('day').fromNow()}</Text>}
                    {isTomorrow() && <Text style={styles.date}> {moment(gig.date).add(1, 'days').calendar()}</Text>}
                    {!isToday() && !isTomorrow() && <Text style={styles.date}> {gig.date.split('T')[0]}</Text>}
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

                </>}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: GigColors.White,
        borderRadius: 4,
        padding: 20,
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
        width: 200,
        alignItems: 'flex-start'
    },
    name: {
        fontSize: 18,
        textAlign: 'left',
        fontWeight: '600',
        color: GigColors.Black,
        marginBottom: 5
    },
    date: {
        fontSize: 12,
        textAlign: 'right',
        fontWeight: '300',
        color: GigColors.DarkGrey
    },
    smallText: {
        fontSize: 14,
        color: GigColors.Black,
    }
});
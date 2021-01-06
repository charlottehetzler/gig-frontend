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

    const renderStatus = (status:any) => {
        if(status === "cancelled"){
            return <Text style={[styles.status, {color: 'red'}]}>{gig.status}</Text>
        } else if (status === "closed"){
            return <Text style={[styles.status, {color: GigColors.Blue}]}>{gig.status}</Text>
        } else {
            return <Text style={[styles.status, {color: GigColors.Green}]}>{gig.status}</Text>
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
                    {renderStatus(gig.status)} 
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
    },
    status: {
        marginBottom: 5,
        marginLeft: 3,
        fontSize: 12,
        textAlign: 'left',
        fontWeight: '300',
        color: GigColors.DarkGrey
    }
});
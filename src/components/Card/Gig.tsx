import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Platform, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import { GigColors } from '../../constants/colors';

type Props = { gig: any, navigation: any, currentUserId: number }

export function Gig (props: any) {
    
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


    return (
        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Gig', {gig: props.gig, otherUser: otherUser()})}>
            <View style={styles.card}>
                <View style={styles.text}>
                    <Text style={styles.name}>{props.gig.title}</Text>
                    {isMe() ? 
                        <Text style={styles.smallText}>{props.gig.members[1].firstName + " " + props.gig.members[1].lastName}</Text>
                    :
                        <Text style={styles.smallText}>{props.gig.members[0].firstName + " " + props.gig.members[0].lastName}</Text>
                    }
                </View>

                <View>
                    <Text style={styles.date}> {props.gig.date.split('T')[0]}</Text>
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
        color: GigColors.Grey
    },
    smallText: {
        fontSize: 14,
        color: GigColors.Black,
    }
});
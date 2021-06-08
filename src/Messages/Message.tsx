import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { GigColors } from '../constants/colors';
import moment from "moment";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export function Message (props: any) {
    
    const { navigate } = props.navigation;
    
    const [ otherUser, setOtherUser] = useState();

    const isMe = () => { return props.chatRoom.lastMessage.user.id !== otherUser.id; }

    const getInitials = (firstName : string, lastName : string) => {
        let first = firstName.charAt(0).toUpperCase();
        let last = lastName.charAt(0).toUpperCase();
        return first + last;
    }

    useEffect(() => {
        const getOtherUser = async () => {
          if (props.chatRoom.members[0].user.id === props.currentUser.id) {
            setOtherUser(props.chatRoom.members[1].user);
          } else {
            setOtherUser(props.chatRoom.members[0].user);
          }
        }
        getOtherUser();
    }, [])

    const isToday = () => { 
        const today = new Date();
        const messageDate = props.chatRoom.lastMessage.createdAt;
        return messageDate.split('T')[0] === today.toISOString().split('T')[0]
    }

    if (!otherUser) return null

    return (
        <TouchableWithoutFeedback style={styles.card} onPress={() => navigate('Chat', {
            chatRoomId: props.chatRoom.id, userId: otherUser.id,
            firstName: otherUser.firstName, lastName: otherUser.lastName,
            isConsumer: props.isConsumer
        })}>
            <Avatar title={getInitials(otherUser.firstName, otherUser.lastName)} containerStyle={styles.avatar} size={60} />
        
            <View style={styles.text}>
                <Text style={styles.username}>{otherUser.firstName + " " + otherUser.lastName }</Text>
                <Text numberOfLines={2} style={styles.lastMessage}>
                    {props.chatRoom.lastMessage && isMe() ? `You: ${props.chatRoom.lastMessage.content}` : `${props.chatRoom.lastMessage.user.firstName}: ${props.chatRoom.lastMessage.content}`}
                </Text>
            </View>

            <View>
                <Text style={styles.time}>
                    {props.chatRoom.lastMessage && isToday() ?
                        moment(props.chatRoom.lastMessage.createdAt).format('LT')
                    :
                        moment(props.chatRoom.lastMessage.createdAt).format("DD/MM/YYYY") 
                    }
                </Text>
            </View>

        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: GigColors.White,
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        width: '100%'
    },
    avatar: {
        backgroundColor: GigColors.Taupe, 
        borderRadius: 50, 
    },
    text: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: 200
    },
    time: {
        fontSize: 14,
        color: 'grey',
        marginRight: 10, 
        width: 75,
        textAlign: 'right'
    },
    lastMessage: {
        fontSize: 16,
        color: GigColors.Taupe,
    },
    username: {
        fontWeight: '400',
        fontSize: 18,
    },
});
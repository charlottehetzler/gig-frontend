import React from 'react';
import { View } from 'react-native';
import { StyleSheet, Text } from "react-native";
import moment from 'moment';
import { GigColors } from '../../constants/colors';

type Props = { myId: number, message: any}

export function ChatMessage ({myId, message} : Props) {

    const isMyMessage = () => {
        return message.user.id === myId;
    }

    return (
        <View style={styles.container}>
            <View style={[
                styles.messageBox, {
                backgroundColor: isMyMessage() ? '#C4C4C4' : 'white',
                marginLeft: isMyMessage() ? 50 : 0,
                marginRight: isMyMessage() ? 0 : 50,
                }
            ]}>
                <Text style={styles.name}>{isMyMessage() ? `You` : message.user.firstName}</Text>
                <Text style={styles.message}>{message.content}</Text>
                
                <Text style={styles.time}>{moment(message.createdAt).format('LT')}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    messageBox: {
        borderRadius: 5,
        padding: 10,
    },
    name: {
        color: GigColors.DarkGrey,
        fontWeight: "bold",
        marginBottom: 5,
    },
    message: {
        color: GigColors.Black
    },
    time: {
      alignSelf: "flex-end",
      color: 'grey'
    }
 });
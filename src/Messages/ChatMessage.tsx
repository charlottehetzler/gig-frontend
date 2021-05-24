import React from 'react';
import { View } from 'react-native';
import { StyleSheet, Text } from "react-native";
import moment from 'moment';
import { GigColors } from '../constants/colors';

type Props = { myId: number, message: any}

export function ChatMessage ({myId, message} : Props) {

    const isMyMessage = () => {
        return message.user.id === myId;
    }

    return (
        <View style={styles.container}>
            <View style={[
                styles.messageBox, {
                backgroundColor: isMyMessage() ? GigColors.Taupe : GigColors.Blue,
                marginLeft: isMyMessage() ? 100 : 0,
                marginRight: isMyMessage() ? 0 : 100,
                }, 
                isMyMessage() ? styles.rightMessage : styles.leftMessage
            ]}>
                {/* <Text style={styles.name}>{isMyMessage() ? `You` : message.user.firstName}</Text> */}
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
    message: {
        color: GigColors.White,
        fontSize: 16
    },
    time: {
      alignSelf: "flex-end",
      color: GigColors.White
    },
    leftMessage: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 0,
    },
    rightMessage: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 10,
    }
 });
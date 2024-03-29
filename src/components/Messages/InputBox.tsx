import React, { useState } from 'react';
import { View, StyleSheet, Text, Platform, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import { GigColors } from '../../constants/colors';
import { Icon } from 'react-native-elements';
import { CREATE_MESSAGE, UPDATE_CHAT_ROOM_LAST_MESSAGE } from '../../lib/chat';
import { useMutation } from '@apollo/client';

type Props = { chatRoomId: number, myId: number}

export function InputBox ({chatRoomId, myId} : Props) {

    const [ doSaveMessage, { loading: saveMessageLoading } ] = useMutation(CREATE_MESSAGE);
    
    const [ doUpdateChatRoom, { loading: updateChatRoomLoading } ] = useMutation(UPDATE_CHAT_ROOM_LAST_MESSAGE);
    
    const [message, setMessage] = useState('');

    const updateChatRoomLastMessage = async (messageId: number) => {
        try {
            const updateRoom = await doUpdateChatRoom({
                variables: {input: {chatRoomId: chatRoomId, lastMessageId: messageId }}
            });
        } catch (e) {
          console.log(e);
        }
    }
    
    const onSendPress = async () => {
        try {
            const { data, errors } = await doSaveMessage({
                variables: { input: {content: message, chatRoomId: chatRoomId, userId: myId} }
            });
            let newMessage;
            if (data?.createMessage) {
                newMessage = data.createMessage;
                await updateChatRoomLastMessage(newMessage.id)
            }
        } catch (e) {
          console.log(e);
        }
        setMessage('');
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100}
            style={{width: '100%'}}
        >
        <View style={styles.container}>
            <Icon name="camera-alt" size={26} color="grey" style={{marginRight: 5}} />
            <View style={styles.mainContainer}>
                <TextInput
                    placeholder={"Type a message"}
                    style={styles.textInput}
                    multiline
                    value={message}
                    onChangeText={setMessage}
                    textAlign='center'
                />
                <TouchableOpacity style={styles.sendButton} onPress={onSendPress}>
                    <Text style={[styles.sendButton, {color: message === '' ? '#C4C4C4' : '#000000'}]}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 10,
        alignItems: 'center',
      },
      mainContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: GigColors.Grey,
      },
    textInput: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendButton: {
        marginRight: 7
    }

});
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation} from '@apollo/client';
import { GET_MESSAGES_BY_CHAT_ROOM, CREATE_MESSAGE, UPDATE_CHAT_ROOM_LAST_MESSAGE } from '../../lib/chat';
import { View, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Platform } from 'react-native';
import { ChatMessage } from '../../components/Messages/ChatMessage';
import { SecondaryHeader } from '../../components/Header/SecondaryHeader';import { Icon } from 'react-native-elements';
import { GigColors } from '../../constants/colors';
;

export default function ChatScreen (props: any) {
    // const chatRoomId = props.navigation.getParam('chatRoomId');
    // const firstName = props.navigation.getParam('firstName');
    // const lastName = props.navigation.getParam('lastName');

    const { chatRoomId, firstName, lastName } = props.route.params;


    const { data, loading, error, refetch } = useQuery(GET_MESSAGES_BY_CHAT_ROOM, {variables: {query: {chatRoomId: chatRoomId }}, pollInterval: 500,});

    // const { data: newMessage, error: newMessageError, loading: newMessageLoading } = useSubscription(ON_CREATE_MESSAGE);

    const [messages, setMessages] = useState([]);
    
    const [ doSaveMessage, { loading: saveMessageLoading } ] = useMutation(CREATE_MESSAGE);
    
    const [ doUpdateChatRoom, { loading: updateChatRoomLoading } ] = useMutation(UPDATE_CHAT_ROOM_LAST_MESSAGE);
    
    const [message, setMessage] = useState('');
    
    useEffect(() => {
      fetchMessages();
    }, []);

    const fetchMessages = async () => {
      try {
        const newMessages = await refetch();
        setMessages(newMessages.data.getMessagesByChatRoom);
      } catch (e) {
        console.log(e)
      }
    }

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
          variables: { input: {content: message, chatRoomId: chatRoomId, userId: 4} }
        });
        let newMessage;
        if (data?.createMessage) {
          newMessage = data.createMessage;
          await updateChatRoomLastMessage(newMessage.id);
          fetchMessages()
        }
      } catch (e) {
        console.log(e);
      }
      setMessage('');
    }

    return (
      <SafeAreaView style={styles.chatContainer}>
        <View>
          <SecondaryHeader  title={firstName + " " + lastName} navigation={props.navigation}/>
        </View> 
        <FlatList
          data={messages}
          renderItem={({ item }) => <ChatMessage myId={4} message={item} />}
          inverted
        />
        {/* <InputBox chatRoomId={chatRoomId} myId={4}/> */}
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
              /> 
              { message === '' ? 
                <Text style={[styles.sendButton, {color: '#C4C4C4'}]}>Send</Text>
              : 
                <TouchableOpacity style={styles.sendButton} onPress={onSendPress}>
                  <Text style={[styles.sendButton, {color: '#000000'}]}>Send</Text>
                </TouchableOpacity>
              }
            </View>
        </View>
    </KeyboardAvoidingView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    marginTop: StatusBar.currentHeight || 0,
    width: '100%', 
    height: '100%'
  },
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

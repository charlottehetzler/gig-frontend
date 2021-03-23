import React, { useEffect, useState } from 'react';
import { useQuery, useMutation} from '@apollo/client';
import { GET_MESSAGES_BY_CHAT_ROOM, CREATE_MESSAGE, UPDATE_CHAT_ROOM_LAST_MESSAGE, CREATE_CHAT_ROOM } from '../../lib/chat';
import { View, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Platform } from 'react-native';
import { ChatMessage } from '../../components/Messages/ChatMessage';
import { GigColors } from '../../constants/colors';
import { DefaultHeader } from '../../components/Header/DefaultHeader';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';


export default function ChatScreen (props: any) {

    const currentUserId = useSelector((state: any) => state.user.userId);

    const { chatRoomId, firstName, lastName, userId } = props.route.params;

    const { data, loading, error, refetch } = useQuery(GET_MESSAGES_BY_CHAT_ROOM, {variables: {query: {chatRoomId: chatRoomId }}, pollInterval: 500,});

    const [messages, setMessages] = useState();
    
    const [ doSaveMessage, { loading: saveMessageLoading } ] = useMutation(CREATE_MESSAGE);
    
    const [ doUpdateChatRoom, { loading: updateChatRoomLoading } ] = useMutation(UPDATE_CHAT_ROOM_LAST_MESSAGE);
    
    const [ doCreateChatRoom, { loading: createChatRoom } ] = useMutation(CREATE_CHAT_ROOM);
    
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
          variables: {input: {lastMessageId: messageId} }
        });
      } catch (e) {
        console.log(e);
      }
    }

    const onSendPress = async () => {
      try {
        let newChatRoomId;
        if (messages.length === 0) {
          const { data, errors } = await doCreateChatRoom({
            variables: { input: { currentUserId: currentUserId, userId: userId }}
          });

          if (data && data?.createChatRoom) {
            newChatRoomId = data.createChatRoom.id;
          }
        }

        let chatRoomID = newChatRoomId ? newChatRoomId : chatRoomId;

        const { data, errors } = await doSaveMessage({
          variables: { input: {content: message, chatRoomId: chatRoomID, userId: currentUserId } }
        });

        if (data?.createMessage) {
          await updateChatRoomLastMessage(data?.createMessage.id);
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
          <DefaultHeader title={firstName + " " + lastName} navigation={props.navigation} goBack={true}/>
        </View> 
        {messages ? 
          <FlatList
            data={messages}
            renderItem={({ item }) => <ChatMessage myId={currentUserId} message={item} />}
            inverted
            keyExtractor={item => item.id.toString()}
          />
        :
        <View></View>
        }
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            // keyboardVerticalOffset={100}
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

import React, { useEffect, useState, useMemo } from 'react';
import { useQuery, useMutation} from '@apollo/client';
import { GET_MESSAGES_BY_CHAT_ROOM, CREATE_MESSAGE, UPDATE_CHAT_ROOM_LAST_MESSAGE, CREATE_CHAT_ROOM } from '../lib/chat';
import { View, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { ChatMessage } from './ChatMessage';
import { GigColors } from '../constants/colors';
import { DefaultHeader } from '../components/Header/DefaultHeader';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';


export default function ChatScreen (props: any) {

    const currentUserId = useSelector((state: any) => state.user.userId);
    const { chatRoomId, firstName, lastName, userId, isConsumer } = props.route.params;

    const [ currentChatRoomId, setCurrentChatRoomId ] = useState(chatRoomId);
    const [ messages, setMessages ] = useState();
    const [ message, setMessage ] = useState('');

    const { data, loading, error, refetch } = useQuery(GET_MESSAGES_BY_CHAT_ROOM, {variables: {query: {chatRoomId: currentChatRoomId }}, pollInterval: 500});
    const [ doSaveMessage, { loading: saveMessageLoading } ] = useMutation(CREATE_MESSAGE);
    const [ doUpdateChatRoom, { loading: updateChatRoomLoading } ] = useMutation(UPDATE_CHAT_ROOM_LAST_MESSAGE);
    const [ doCreateChatRoom, { loading: createChatRoom } ] = useMutation(CREATE_CHAT_ROOM);
    

    useEffect(() => {
      fetchMessages();
    }, [ data ]);

    useMemo(() => {
      if (data && data?.getMessagesByChatRoom) {
        setMessages(data?.getMessagesByChatRoom)
      }
    }, [data]);

    const fetchMessages = async () => {
      try {
        const newMessages = await refetch();
        if (newMessages) {
          setMessages(newMessages.data?.getMessagesByChatRoom);
        }
      } catch (e) {
        console.log(e)
      }
    }

    const updateChatRoomLastMessage = async (messageId: number) => {
      try {
        const data = await doUpdateChatRoom({
          variables: {input: {lastMessageId: messageId} }
        });
        return data;
      } catch (e) {
        console.log(e);
      }
    }

    const onSendPress = async () => {
      try {
        let newChatRoomId;
        if (!messages) {
          const { data, errors } = await doCreateChatRoom({
            variables: { input: { currentUserId: currentUserId, userId: userId }}
          });

          if (data && data?.createChatRoom) {
            newChatRoomId = data.createChatRoom.id;
          }
        }

        let chatRoomID = newChatRoomId ? newChatRoomId : chatRoomId;
        setCurrentChatRoomId(chatRoomID)

        const { data, errors } = await doSaveMessage({
          variables: { input: {content: message, chatRoomId: chatRoomID, userId: currentUserId } }
        });

        if (data?.createMessage) {
          const test = await updateChatRoomLastMessage(data?.createMessage.id);
          await fetchMessages();
        }

      } catch (e) {
        console.log(e);
      }
      setMessage('');
    }

    return (
      <SafeAreaView style={styles.chatContainer}>
        <ScrollView>
          <View>
            <DefaultHeader 
              title={firstName + " " + lastName} 
              navigation={props.navigation} 
              goBack={true} 
              isConsumer={isConsumer}
            />
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
        </ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          // keyboardVerticalOffset={100}
          style={{width: '100%'}}
        >
        <View style={styles.actions}>
          <Icon name="add" size={30} color={GigColors.Mustard} style={{marginRight: 5}} />
          <View style={styles.messageInput}>
            <TextInput
              placeholder={"Type a message"}
              style={styles.textInput}
              multiline
              value={message}
              onChangeText={setMessage}
            /> 
              { message === '' ? 
                <Text style={{color: GigColors.Taupe}}>Send</Text>
              : 
                <TouchableOpacity onPress={onSendPress}>
                  <Text style={ {color: GigColors.Mustard}}>Send</Text>
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
  actions: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  messageInput: {
    backgroundColor: GigColors.White,
    borderRadius: 7,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  textInput: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14
  }
});

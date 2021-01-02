import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MESSAGES_BY_CHAT_ROOM } from '../lib/chat';
import { View, FlatList, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { ChatMessage } from '../components/Messages/ChatMessage';
import { InputBox } from '../components/Messages/InputBox';
import { SecondaryHeader } from '../components/Header/SecondaryHeader';

export default function ChatScreen (props: any) {
    const chatRoomId = props.navigation.getParam('chatRoomId');
    const firstName = props.navigation.getParam('firstName');
    const lastName = props.navigation.getParam('lastName')

    const { data, loading, error } = useQuery(GET_MESSAGES_BY_CHAT_ROOM, {variables: {query: {chatRoomId: chatRoomId }}});

    const [messages, setMessages] = useState([]);
    const [myId, setMyId] = useState(null);

    const fetchMessages = async () => {
      try {
        if (data && data?.getMessagesByChatRoom) {
          const messagesData = data.getMessagesByChatRoom;
          setMessages(messagesData);
        }
      } catch (e) {
        console.log(e)
      }
    }

    useEffect(() => {
      fetchMessages();
    }, []);


    return (
      <SafeAreaView style={styles.container}>
        <View>
          <SecondaryHeader  title={firstName + " " + lastName} navigation={props.navigation}/>
        </View> 
        <FlatList
          data={messages}
          renderItem={({ item }) => <ChatMessage myId={4} message={item} />}
          inverted
        />
        <InputBox chatRoomId={chatRoomId} myId={4}/>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    width: '100%', 
    height: '100%'
  }
});

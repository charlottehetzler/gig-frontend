import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { DefaultHeader } from '../components/Header/DefaultHeader';
import { Message } from '../components/Messages/Message';
import { useQuery } from '@apollo/client';
import { GET_CHAT_ROOMS_FOR_USER } from '../lib/chat';

export default function MessagesScreen (props: any) {
  const { data, loading, error } = useQuery(GET_CHAT_ROOMS_FOR_USER, {variables: {query: {userId: 3 }}});
  
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        if (data && data?.getChatRoomsForUser) {
          const roomData = data?.getChatRoomsForUser;
          setChatRooms(roomData)
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchChatRooms();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <DefaultHeader title={'my messages'} navData={props.navigation}/>
      </View>
      <View>
        {chatRooms && 
        <ScrollView>
          {chatRooms.map((chatRoom:any) => { return (
            <View style={styles.gigWrapper}>
              <Message chatRoom={chatRoom} currentUserId={3} navigation={props.navigation}/>
            </View>
          )})
          }
        </ScrollView>
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    flex: 1,
    
  },
  h4Style: {
    marginTop: 15,
    fontSize: 24,
    textAlign: 'center',
  },
  gigWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  }
});

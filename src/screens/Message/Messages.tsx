import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { DefaultHeader } from '../../components/Header/DefaultHeader';
import { Message } from '../../components/Messages/Message';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../lib/chat';

const currentUser = {id: 4, firstName: "Charly", lastName: "Hetzler"}

export default function MessagesScreen (props: any) {

  const { data, refetch } = useQuery(GET_USER, {variables: {query: {userId: currentUser.id }}});
  
  const [chatRooms, setChatRooms] = useState([]);

  const isFocused = props.navigation.isFocused();

  useEffect(() => { 
      console.log("called");
      fetchChatRooms(); 
       
  }, [isFocused]);

  const fetchChatRooms = async () => {
    try {
      const rooms = await refetch();
      setChatRooms(rooms.data['getUser']['allChatRooms']);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <DefaultHeader title={'my messages'} navData={props.navigation}/>
      </View>
      <View>
        {chatRooms && 
        <ScrollView>
          {chatRooms.map((chatRoom: any) => { return (
            <View style={styles.gigWrapper}>
              <Message chatRoom={chatRoom} currentUser={currentUser} navigation={props.navigation}/>
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

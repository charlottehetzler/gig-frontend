import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import { DefaultHeader } from '../../components/Header/DefaultHeader';
import { Message } from '../../components/Messages/Message';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../lib/chat';
import { useSelector } from 'react-redux';
import AuthPlaceholder from '../../components/Placeholder/AuthPlaceholder';


export default function MessagesScreen (props: any) {

  const isLoggedIn = useSelector( (state: any) => state.user.isLoggedIn);

  const currentUser = {
    id: useSelector( (state: any) => state.user.userId),
    firstName: useSelector( (state: any) => state.user.firstName),
    lastName: useSelector( (state: any) => state.user.lastName)
  };

  const { data, loading, refetch } = useQuery(GET_USER, {variables: {query: {userId: currentUser.id }}});
  
  const [chatRooms, setChatRooms] = useState([]);

  const isFocused = props.navigation.isFocused();

  useEffect(() => { 
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
        <DefaultHeader title={'my messages'} navigation={props.navigation}/>
      </View>
      {loading &&  <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
      <View>
      {!isLoggedIn ? 
        <AuthPlaceholder title={'you have not received any messages yet. Signup or Login to get started!'}/>
      :
      chatRooms && 
        <ScrollView>
          {chatRooms.map((chatRoom: any) => { return (
            <View style={styles.gigWrapper} key={chatRoom.id}>
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

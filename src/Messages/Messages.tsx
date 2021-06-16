import React, { useState, useMemo } from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar, ScrollView, ActivityIndicator, Text } from 'react-native';
import { DefaultHeader } from '../components/Header/DefaultHeader';
import { Message } from './Message';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../lib/chat';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { GigColors } from '../constants/colors';
import { NewMessage } from './NewMessage';


export default function MessagesScreen (props: any) {

  const currentUser = {
    id: useSelector( (state: any) => state.user.userId),
    type: useSelector( (state: any) => state.user.userType)
  };

  const isConsumer = () => { return currentUser.type === 'consumer' }

  const { data, loading, refetch, error } = useQuery(GET_USER, {variables: { query: {userId: currentUser.id }}});
  const [chatRooms, setChatRooms] = useState();
  const isFocused = props.navigation.isFocused();
  const [ isAddMode, setIsAddMode ] = useState(false);

  // useEffect(() => { 
  //   fetchChatRooms();     
  // }, [isFocused, chatRooms]);

  useMemo(() => {
    if (data && data?.getUser && data?.getUser?.allChatRooms) {
      setChatRooms(data?.getUser?.allChatRooms);
    }
  }, [data])

  const fetchChatRooms = async () => {
    try {
      const refetchData = await refetch();
      if (refetchData && refetchData?.getUser && refetchData?.getUser?.allChatRooms) {
        setChatRooms(refetchData && refetchData?.getUser && refetchData?.getUser?.allChatRooms);
      }
    } catch (e) {
      console.log(e)
    }
  }
  const closeModal = () => setIsAddMode(false);

  const closeModal2 = () => setIsAddMode(false);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <DefaultHeader title={'Messages'} navigation={props.navigation} isConsumer={isConsumer()}/>
      </View>
      {loading &&  <ActivityIndicator size="large" color={GigColors.Blue} style={{alignItems:'center', justifyContent:'center'}}/>}
      <View>

        <TouchableOpacity style={styles.newMessage}  onPress={() => setIsAddMode(true)}>
          <Icon type='material' name='edit' color={isConsumer() ? GigColors.Sky  : GigColors.Mustard} size={25}/>
          <Text style={{color: isConsumer() ? GigColors.Sky  : GigColors.Mustard, fontSize: 16, paddingLeft: 3}}>New Messaage</Text>
          <NewMessage visible={isAddMode} onCancel={closeModal} onSelect={closeModal2} navigation={props.navigation}/>
        </TouchableOpacity>

        {chatRooms && chatRooms.length > 0 &&
          <ScrollView>
            {chatRooms.map((chatRoom: any) => { return (
              <View style={styles.gigWrapper} key={chatRoom.id}>
                <Message 
                  chatRoom={chatRoom} 
                  currentUser={currentUser} 
                  navigation={props.navigation} 
                  isConsumer={isConsumer()}
                />
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
  },
  newMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
    marginRight: 10
  }
});

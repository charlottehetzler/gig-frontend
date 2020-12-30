import React from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { DefaultHeader } from '../components/Header/DefaultHeader';
import { Message } from '../components/Card/Message';


const messages = [
  {id: "1", firstName: "Charly", lastName: "Hetzler", message: "Lorem ipsum lorem ipsum lorem i..."},
  {id: "2", firstName: "Isaac", lastName: "Hirsch", message: "Lorem ipsum lorem ipsum lorem i..."},
  {id: "3", firstName: "Joe", lastName: "Doe", message: "Lorem ipsum lorem ipsum lorem i..."}
];

export default function MessagesScreen () {

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <DefaultHeader title={'my messages'}/>
      </View>
      <View style={styles.wrapper}>
        <ScrollView>
          {messages.map((message) => { return (
            <View style={styles.gigWrapper}>
              <Message firstName={message.firstName} lastName={message.lastName} message={message.message}/>
            </View>
          )})}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    flex: 1,
    
  },
  wrapper: {
    // marginHorizontal: 10,
    // flex: 1,
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

});

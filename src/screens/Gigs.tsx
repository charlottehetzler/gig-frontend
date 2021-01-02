import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Gig } from '../components/Card/Gig';
import { DefaultHeader } from '../components/Header/DefaultHeader';


const gigs = [
    {id: "1", title: "Christmas Dinner Chef", userFirstName: "Charly", userLastName: "Hetzler", date: "2020/12/24"},
    {id: "2", title: "Window Cleaner", userFirstName: "Isaac", userLastName: "Hirsch", date: "2021/01/02"},
    {id: "3", title: "Dog Walker", userFirstName: "Joe", userLastName: "Doe", date: "2021/01/10"}
];

export default function GigsScreen(props: any) {
    
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <DefaultHeader title={'my live gigs'} navData={props.navigation}/>
      </View>
      <View>
        <ScrollView>
          {gigs.map((gig) => { return (
            <View style={styles.gigWrapper}>
              <Gig title={gig.title} firstName={gig.userFirstName} lastName={gig.userLastName} date={gig.date} />
            </View>
          )})}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
    
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
    }
});
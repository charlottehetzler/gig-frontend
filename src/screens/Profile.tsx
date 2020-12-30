import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { DefaultHeader } from '../components/Header/DefaultHeader';
import { Avatar, Icon } from 'react-native-elements';
import { Rating } from 'react-native-ratings';
import { Skill } from '../components/Card/Skill';
import { Portfolio } from '../components/Card/Portfolio';
import { Review } from '../components/Card/Review';

const producer = {id: "1", firstName: "Isaac", lastName: "Hirsch", rating: 4.5, email: "isaachirsch@gmail.com", birthDay: "1990/11/16", phone: "0123456789"};

const skills = [
  {id: "1", name: "Babysitting"}, {id: "2", name: "House Cleaning"}, {id: "3", name: "Water my plants"}, 
  {id: "4", name: "Don't know 1"}, {id: "5", name: "Don't know 2"}, {id: "6", name: "Don't know 3"},
  {id: "7", name: "Food Don't know 4"}, {id: "8", name: "Don't know 5"}, {id: "9", name: "Don't know 6"},
];

const portfolio = [
  {id: "1", title: "PF 1"}, {id: "2", title: "PF 2"}, {id: "3", title: "PF 3"}
];

const reviews = [
  {id: "1", comment: "great Job", rating: 5, fromUser: "Charley Hetzler", date: "2020/12/01"},
]
export default function ProfileScreen() {
    const getInitials = (producer : any) => {
        let first = producer.firstName.charAt(0).toUpperCase();
        let last = producer.lastName.charAt(0).toUpperCase();
        return first + last;
    }

  return (
    <SafeAreaView style={styles.container}>
    <View>
      <DefaultHeader title={'Isaac Hirsch'}/>
    </View>
    <View style={styles.wrapper}>
      <ScrollView>
        <View style={styles.profile}>
          <Avatar title={getInitials(producer)} containerStyle={styles.avatar} size={75} />
          <Text style={styles.h4Style}>{producer.firstName + " " + producer.lastName}</Text>
          
          <View style={styles.infos}>
            <View style={styles.info}>
              <Icon name="email" color="#7F7F7F"/>
              <Text style={styles.infoText}>{producer.email}</Text>
            </View>
            <View style={styles.info}>
              <Icon name="calendar-today" color="#7F7F7F"/>
              <Text style={styles.infoText}>{producer.birthDay}</Text>
            </View>
            <View style={styles.info}>
              <Icon name="phone" color="#7F7F7F"/>
              <Text style={styles.infoText}>{producer.phone}</Text>
            </View>
          </View>
          <View style={styles.rating}>
            <Rating imageSize={30} readonly startingValue={producer.rating}/>
          </View>
        </View>

        <View style={styles.profileSection}>
          <Text style={styles.h4Style}>{producer.firstName}'s skills</Text>
          <View style={styles.overview}>
            {skills.map((skill) => { return (
              <Skill name={skill.name} key={skill.id}/>
            )})}
          </View>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.h4Style}>{producer.firstName}'s portfolio</Text>
            <TouchableOpacity style={styles.moreButton} onPress={() => console.log('See all reviews pressed')}>
              <Text>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.overview}>
            {portfolio.map((p) => { return (
              <Portfolio name={p.title} key={p.id}/>
            )})}
          </View>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.h4Style}>{producer.firstName}'s reviews</Text>
            <TouchableOpacity style={styles.moreButton} onPress={() => console.log('See all reviews pressed')}>
              <Text>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.overview}>
            {reviews.map((review) => { return (
              <Review comment={review.comment} rating={review.rating} fromUser={review.fromUser} date={review.date} key={review.id}/>
            )})}
          </View>
        </View>

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
      marginHorizontal: 12,
      flex: 1,
    },
    h4Style: {
      marginTop: 15,
      fontSize: 24,
      textAlign: 'center',
    },
    profile: {
      alignItems: 'center',
      marginTop: 15,
      paddingVertical: 15,
      borderBottomColor: '#C4C4C4',
      borderBottomWidth: 1
    },
    avatar: {
      backgroundColor: 'grey', 
      borderRadius: 50
    },
    infos: {
      marginTop: 10
    },
    info: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
      width: 200
    },
    infoText: {
      color: '#7F7F7F',
      marginLeft: 10
    },
    divider: {
      backgroundColor: '#C4C4C4',
      height: 2,
      color: '#C4C4C4'
    },
    rating: {
      marginVertical: 15
    },
    profileSection: {
      alignItems: 'flex-start',
    },
    overview: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: 10
    },
    moreButton: {
      backgroundColor: '#FFFFFF',
      color: '#000000',
      borderWidth: 1,
      borderColor: '#000000',
      paddingVertical: 3,
      paddingHorizontal: 5,
      borderRadius: 5,
      justifyContent: "center",
      marginBottom: 0,
      marginLeft: 10
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    }
  });

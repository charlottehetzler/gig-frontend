import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { DefaultHeader } from '../components/Header/DefaultHeader';
import { Avatar, Icon } from 'react-native-elements';
import { Rating } from 'react-native-ratings';
import { Skill } from '../components/Card/Skill';
import { Portfolio } from '../components/Card/Portfolio';
import { Review } from '../components/Card/Review';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../lib/user';
import { GET_All_JOBS_FOR_PRODUCER } from '../lib/job';
import { GET_LAST_REVIEW_FOR_USER } from '../lib/review';

const portfolio = [
  {id: "1", title: "PF 1"}, {id: "2", title: "PF 2"}, {id: "3", title: "PF 3"}
];

const reviews = [
  {id: "1", comment: "great Job", rating: 5, fromUser: "Charley Hetzler", date: "2020/12/01"},
]
export default function ProfileScreen(props: any) {
  const userId = props.navigation.getParam('userId');

  const { data, loading, error } = useQuery(GET_USER, {variables: {query: {userId: userId} } });
  const user = data?.getUser || [];
  
  const { data: jobData, loading: jobLoading, error: jobError } = useQuery(GET_All_JOBS_FOR_PRODUCER, {variables: {query: {userId: userId} } });
  const jobs = jobData?.getAllJobsForProducer || [];

  const { data: reviewData, loading: reviewLoading, error: reviewError } = useQuery(GET_LAST_REVIEW_FOR_USER, {variables: {query: {userId: userId}}});
  let [lastReview, setLastReview] = useState<any>()
  const review = reviewData?.getLastReviewForUser || [];

  console.log(review)
  

  const getFullName = (user : any) => {
    return user["firstName"] + " " + user["lastName"]
  }

  const getInitials = (firstName : string, lastName: string) => {
    let first = firstName.charAt(0).toUpperCase();
    let last = lastName.charAt(0).toUpperCase();
    return first + last;
  }

  return ( 
    <SafeAreaView style={styles.container}>
    {user && <>
    <View>
      <DefaultHeader title={getFullName(user)}/>
    </View>
      <ScrollView>
        <View style={styles.profile}>
    
          <Avatar containerStyle={styles.avatar} size={75} />
          <Text style={styles.h4Style}>{user["firstName"] + " " + user["lastName"]}</Text>
          
          <View style={styles.infos}>

            <View style={styles.info}>
              <Icon name="email" color="#7F7F7F"/>
              <Text style={styles.infoText}>{user["email"]}</Text>
            </View>

            <View style={styles.info}>
              <Icon name="calendar-today" color="#7F7F7F"/>
              <Text style={styles.infoText}>{user["birthday"]}</Text>
            </View>

            {/* <View style={styles.info}>
              <Icon name="phone" color="#7F7F7F"/>
              <Text style={styles.infoText}>{user.phone}</Text>
            </View> */}

          </View>
          <View style={styles.rating}>
            <Rating imageSize={30} readonly startingValue={user.avgRating}/>
          </View>
        
        </View>

        <View style={styles.sectionWrapper}>
          <View style={styles.profileSection}>
            <Text style={styles.h4Style}>{user["firstName"]}'s skills</Text>
            {jobs && <>
            <View style={styles.overview}>
              {jobs.map((job: { name: string; id: number }) => { return (
                <Skill name={job.name} key={job.id}/>
                )})}
            </View>
          </>}
          </View>

          <View style={styles.profileSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.h4Style}>{user["firstName"]}'s portfolio</Text>
              <TouchableOpacity style={styles.moreButton} onPress={() => console.log('See all reviews pressed')}>
                <Text>See all</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.overview}>
              {portfolio.map((p) => { return (
                < Portfolio name={p.title} key={p.id}/>
                )})}
            </View>
          </View>

          <View style={styles.profileSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.h4Style}>{user["firstName"]}'s reviews</Text>
              <TouchableOpacity style={styles.moreButton} onPress={() => props.navigation.navigate('Reviews', {userId: userId, firstName: user["firstName"], lastName: user["lastName"]})}>
                <Text>See all</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {review && <>
        <View style={styles.overview}>
          <Review 
            comment={review["comment"]} 
            rating={review["rating"]} 
            date={review["createdAt"]} 
            firstName={review["fromUser"]["firstName"]} 
            lastName={review["fromUser"]["lastName"]} 
            key={review.id}
          />
        </View>
        </>}
      </ScrollView>
    </>}
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1
    },
    sectionWrapper: {
      marginHorizontal: 10
    },
    h4Style: {
      marginTop: 15,
      fontSize: 24,
      textAlign: 'center',
    },
    profile: {
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomColor: '#C4C4C4',
      borderBottomWidth: 1,
      backgroundColor: '#FFFFFF'
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
      // width: 200
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
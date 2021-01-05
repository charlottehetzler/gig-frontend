import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { Rating } from 'react-native-ratings';
import { Skill } from '../components/Card/Skill';
import { Portfolio } from '../components/Card/Portfolio';
import { Review } from '../components/Card/Review';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../lib/user';
import { GET_All_JOBS_FOR_PRODUCER } from '../lib/job';
import { GET_LAST_REVIEW_FOR_USER } from '../lib/review';
import { SecondaryHeader } from '../components/Header/SecondaryHeader';
import { GigColors } from '../constants/colors';
import moment from 'moment';

const portfolio = [
  {id: "1", title: "PF 1"}, {id: "2", title: "PF 2"}, {id: "3", title: "PF 3"}
];

export default function ProfileScreen(props: any) {
  // const userId = props.navigation.getParam('userId');
  // let { userId } = props.route.params;

  const currentUserId = 4

  let userId = props.route.params ? props.route.params : currentUserId;
  
  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER, {variables: {query: {userId: userId} } });
  
  const { data: jobData, loading: jobLoading, error: jobError } = useQuery(GET_All_JOBS_FOR_PRODUCER, {variables: {query: {userId: userId} } });

  const { data: reviewData, loading: reviewLoading, error: reviewError } = useQuery(GET_LAST_REVIEW_FOR_USER, {variables: {query: {userId: userId}}});
  
  const [lastReview, setLastReview] = useState();

  const [user, setUser] = useState();

  const [jobs, setJobs] = useState([]);
 
  const [fullName, setFullName] = useState();
  
  const [initials, setInitials] = useState();
  
  const loading = useMemo(() => {
    return userLoading || jobLoading || reviewLoading;
  }, [userLoading, jobLoading, reviewLoading]);
  
  const error = useMemo(() => {
    return userError || jobError || reviewError;
  }, [userError, jobError, reviewError]);

  useMemo(() => {
    if (jobData && jobData.getAllJobsForProducer) {
      setJobs(jobData.getAllJobsForProducer)
    }
    if (userData && userData.getUser) {
      setUser(userData.getUser)
      setFullName(userData.getUser.firstName + " " + userData.getUser.lastName);
      setInitials(userData.getUser.firstName.charAt(0).toUpperCase() + userData.getUser.lastName.charAt(0).toUpperCase());

    }
    if (reviewData && reviewData.getLastReviewForUser) {
      setLastReview(reviewData.getLastReviewForUser)
    }
  }, [jobData, userData, reviewData])

  const hasJobs = () => {
    return jobs.length > 1
  }


  return ( 
    <SafeAreaView style={styles.container}>
    <View>
      <SecondaryHeader title={fullName} navigation={props.navigation}/>
    </View>
    {loading &&  <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}

    {user && <>
      <ScrollView>
        <View style={styles.profile}>
    
          <Avatar containerStyle={styles.avatar} size={75} title={initials}/>
          <Text style={styles.h4Style}>{fullName}</Text>
          
          <View style={styles.infos}>

            <View style={styles.info}>
              <Icon name="email" color="#7F7F7F"/>
              <Text style={styles.infoText}>{user.email}</Text>
            </View>

            <View style={styles.info}>
              <Icon name="calendar-today" color="#7F7F7F"/>
              <Text style={styles.infoText}>{moment(user.birthday).format('LL')}</Text>
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
              {hasJobs() ?
                <View style={styles.overview}>
                  {jobs.map((job: { name: string; id: number }) => { return (
                    <Skill name={job.name} key={job.id}/>
                  )})}
                </View>
              :
                <View>
                  <Text style={styles.noItems}>no skills added yet. </Text>
                </View>
              }
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
            { lastReview &&
              <View style={styles.overview}>
                <Review 
                  comment={lastReview.comment} 
                  rating={lastReview.rating} 
                  date={lastReview.createdAt} 
                  firstName={lastReview.fromUser.firstName} 
                  lastName={lastReview.fromUser.lastName} 
                  key={lastReview.id}
                />
              </View>
            }
          </View>
        </View>
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
      borderBottomColor: GigColors.Grey,
      borderBottomWidth: 1,
      backgroundColor: GigColors.White
    },
    avatar: {
      backgroundColor: GigColors.DarkGrey, 
      borderRadius: 50
    },
    infos: {
      marginTop: 10
    },
    info: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    infoText: {
      color: GigColors.DarkGrey,
      marginLeft: 10
    },
    divider: {
      backgroundColor: GigColors.Grey,
      height: 2,
      color: GigColors.Grey
    },
    rating: {
      marginVertical: 15
    },
    profileSection: {
      alignItems: 'flex-start',
      marginVertical: 5
    },
    overview: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: 10
    },
    moreButton: {
      backgroundColor: GigColors.White,
      color: GigColors.Black,
      borderWidth: 1,
      borderColor: GigColors.Black,
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
    },
    noItems: {
      marginTop: 10,
      color: GigColors.DarkGrey
    }
  });

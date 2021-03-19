import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Skill } from '../../components/Card/Skill';
import { Profile } from '../../components/Card/Profile';
import { Review } from '../../components/Card/Review';
import { GigColors } from '../../constants/colors';
import { useSelector } from 'react-redux';
import GuestProfile  from '../../components/Placeholder/GuestProfile'
import useProfile from '../../helpers/user';
import { DefaultHeader } from '../../components/Header/DefaultHeader';
import { NoDataText } from '../../components/Placeholder/NoDataText';
import { Icon } from 'react-native-elements';

export default function MyProfileScreen(props: any) {
  
  const myUserId = useSelector((state: any) => state.user.userId);

  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);

  const { user, jobs, lastReviews, loading, error, fullName, initials } = useProfile(myUserId);

  const guestFirstName = useSelector( (state: any) => state.user.firstName);
  
  const guestLastName = useSelector( (state: any) => state.user.lastName);

  const guestFullName = guestFirstName + " " + guestLastName

  const guestInitials = guestFirstName.charAt(0).toUpperCase() + " " + guestLastName.charAt(0).toUpperCase()
  
  const hasJobs = () => {
    return jobs.length > 0
  }

  const hasLastReview = () => {
    return lastReviews ? true : false
  }

  const userType = useSelector( (state: any) => state.user.userType);
  const isConsumer = () => {
    return userType === 'consumer'
}

  return ( 
    <SafeAreaView style={styles.container}>
      <View>
        <DefaultHeader title={'My Profile'} navigation={props.navigation}/>
      </View>
      {loading &&  <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
      <ScrollView>
      {!isLoggedIn && <GuestProfile initials={guestInitials} fullName={guestFullName} firstName={guestFirstName}/>}
      {user && isLoggedIn && <>

      <Profile initials={initials} fullName={fullName} user={user} isMe={true} navigation={props.navigation}/>
      
      <View style={styles.sectionWrapper}>
        {isConsumer() ? 
          null
        :
          <View style={styles.profileSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.h4Style}>My skills</Text>
              {jobs && 
                <TouchableOpacity style={{marginLeft: 10}} onPress={() => console.log('See all reviews pressed')}>
                  <Icon type='material' name='add-circle-outline' />
                </TouchableOpacity>
              }
            </View>
            {hasJobs() ? 
              <View style={styles.overview}>
              {jobs.map((job: { name: string; id: number }) => { return (
                <Skill name={job.name} key={job.id}/>
              )})}
              </View>
            : 
              <NoDataText text={'You have not added any reviews yet'}/>
            }
          </View>
        }
 
      </View>
        {/* <View style={styles.profileSection}>
          <View style={[styles.sectionHeader, {marginLeft: 10}]}>
            <Text style={styles.h4Style}>My reviews</Text>
            {lastReview && 
              <TouchableOpacity style={styles.moreButton} onPress={() => props.navigation.navigate('Reviews', {userId: myUserId, firstName: 'My'})}>
                <Text>See all</Text>
              </TouchableOpacity>
            }
          </View>
          {hasLastReview() ? 
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
          : 
            <NoDataText text={'You have not received any reviews yet'}/>
          }
        </View> */}
      </>}
      </ScrollView>
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
    },
    titleWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    }
  });

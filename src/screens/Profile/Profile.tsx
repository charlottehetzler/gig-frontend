import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Skill } from '../../components/Card/Skill';
import { Review } from '../../components/Card/Review';
import { GigColors } from '../../constants/colors';
import useProfile from '../../helpers/user';
import { Profile } from '../../components/Card/Profile';
import { Portfolio } from '../../components/Card/Portfolio';
import { DefaultHeader } from '../../components/Header/DefaultHeader';

const portfolio = [{id: "1", title: "PF 1"}, {id: "2", title: "PF 2"}, {id: "3", title: "PF 3"}];

export default function ProfileScreen(props: any) {

  const { userId } = props.route.params;
  
  const { user, jobs, lastReview, loading, error, fullName, firstName, initials } = useProfile(userId);

  const hasJobs = () => {
    return jobs.length > 1
  }

  return ( 
    <SafeAreaView style={styles.container}>
      <View>
        <DefaultHeader title={fullName} navigation={props.navigation} goBack={true}/>
      </View>
      {loading &&  <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
      <ScrollView>
      {user && <>
        <Profile initials={initials} fullName={fullName} email={user.email} birthday={user.birthday} avgRating={user.avgRating} isMe={false}/>
        
        <View style={styles.sectionWrapper}>
          <View style={styles.profileSection}>
            <Text style={styles.h4Style}>{firstName} skills</Text>
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

        <Portfolio portfolio={portfolio} name={firstName}/>
          

        </View>
        <View style={styles.profileSection}>
          <View style={[styles.sectionHeader, {marginLeft: 10}]}>
            <Text style={styles.h4Style}>{firstName} reviews</Text>
            <TouchableOpacity style={styles.moreButton} onPress={() => props.navigation.navigate('Reviews', {userId: userId, firstName: user["firstName"] + "'s",})}>
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
      justifyContent: 'flex-start',
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

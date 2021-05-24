import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { GigColors } from '../constants/colors';
import useProfile from '../helpers/user';
import { DefaultHeader } from '../components/Header/DefaultHeader';;
import { ProfileLink } from './ProfileLink';
import { ProfileCard } from './ProfileCard';

export default function ProfileScreen(props: any) {

  const { userId, skillId } = props.route.params;

  const { user, loading, error, fullName, initials } = useProfile(userId, skillId);


  return ( 
    <SafeAreaView >
      
      <View>
        <DefaultHeader title={fullName} navigation={props.navigation} goBack={true}/>
      </View>

      {loading &&  <ActivityIndicator size="small" color={GigColors.Blue} style={{alignItems:'center', justifyContent:'center'}}/>}
      
      <ScrollView>
        {user && <>
        <ProfileCard initials={initials} fullName={fullName} user={user} isMe={false} skillId={skillId} navigation={props.navigation} />
        <ProfileLink firstName={user.firstName + "'s"} navigation={props.navigation} title={'reviews'} icon={'star-outline'} user={user}/>
      </>}
    </ScrollView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  h4Style: {
    marginTop: 15,
    fontSize: 24,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginBottom: 15,
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
    marginRight: 16
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  }
});

import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { GigColors } from '../constants/colors';
import { useSelector } from 'react-redux';
import GuestProfile  from '../components/Placeholder/GuestProfile'
import useProfile from '../helpers/user';
import { DefaultHeader } from '../components/Header/DefaultHeader';
import { ProfileLink } from './ProfileLink';
import { ProfileCard } from './ProfileCard';


export default function MyProfileScreen(props: any) {
  
  const currentUserId = useSelector((state: any) => state.user.userId);
  const userType = useSelector( (state: any) => state.user.userType);
  const isConsumer = () => { return userType === 'consumer' }
    
  const { user, loading, error, fullName, initials } = useProfile(currentUserId);

  return ( 
    <SafeAreaView>
      <View>
        <DefaultHeader title={'Profile'} navigation={props.navigation} isConsumer={isConsumer()}/>
      </View>
      
      {loading &&  <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
      
      <ScrollView>
        
        {user && <>

        <ProfileCard initials={initials} fullName={fullName} user={user} isMe={true} navigation={props.navigation}/>
        <View style={styles.sectionWrapper}>
          {isConsumer() ? 
            <View >
              <ProfileLink firstName={'My'} navigation={props.navigation} title={'reviews'} icon={'star-outline'} user={user}/>
              <ProfileLink firstName={'My'} navigation={props.navigation} title={'friends'} icon={'people'} user={user}/>
              <ProfileLink 
                firstName={'My'} 
                navigation={props.navigation} 
                title={'settings'} 
                icon={'settings'} 
                user={user} 
                initials={props.initials} 
                isConsumer={isConsumer()}
            />
          </View>
            :
            <View >
              <ProfileLink firstName={'My'} navigation={props.navigation} title={'reviews'} icon={'star-outline'} user={user}/>
              <ProfileLink firstName={'My'} navigation={props.navigation} title={'skills'} icon={'lightbulb'} user={user}/>
              <ProfileLink firstName={'My'} navigation={props.navigation} title={'friends'} icon={'people'} user={user}/>
              <ProfileLink 
                firstName={'My'} 
                navigation={props.navigation} 
                title={'settings'} 
                icon={'settings'} 
                user={user} 
                initials={props.initials} 
                isConsumer={isConsumer()}
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

  sectionWrapper: {
    marginBottom: 120
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
    marginVertical: 5,
  },
  overview: {
    alignItems: 'flex-start',
    // justifyContent: 'space-between',
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
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
    alignItems: 'center',
    justifyContent: 'space-between'
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

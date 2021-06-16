import React from 'react';
import { SafeAreaView, View, ScrollView, ActivityIndicator } from 'react-native';
import { GigColors } from '../constants/colors';
import useProfile from '../helpers/user';
import { DefaultHeader } from '../components/Header/DefaultHeader';;
import { ProfileLink } from './ProfileLink';
import { ProfileCard } from './ProfileCard';

export default function ProfileScreen(props: any) {

  const { userId, skillId, isConsumer } = props.route.params;

  const { user, loading, error, fullName, initials } = useProfile(userId, skillId);

  return ( 
    <SafeAreaView >
      
      <View>
        <DefaultHeader title={fullName} navigation={props.navigation} goBack={true} isConsumer={isConsumer}/>
      </View>

      {loading &&  <ActivityIndicator size="large" color={GigColors.Blue} style={{alignItems:'center', justifyContent:'center'}}/>}
      
      <ScrollView>
        {user && <>
          <ProfileCard 
            initials={initials} 
            fullName={fullName} 
            user={user} 
            isMe={false} 
            skillId={skillId} 
            navigation={props.navigation} 
            isConsumer={isConsumer}
          />

          <ProfileLink 
            firstName={user.firstName + "'s"} 
            navigation={props.navigation} 
            title={'reviews'} icon={'star-outline'} 
            user={user}
          />
      </>}
    </ScrollView>
  </SafeAreaView>
  );
}


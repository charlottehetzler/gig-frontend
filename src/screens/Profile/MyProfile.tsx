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
import { EditSkills } from '../../components/Overlay/EditSkills';
import { SeeAllButton } from '../../components/Button/SeeAllButton';
import { ProfileLink } from '../../components/Button/ProfileLink';


export default function MyProfileScreen(props: any) {
  
  const myUserId = useSelector((state: any) => state.user.userId);
  
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
  
  const { user, skills, lastReviews, loading, error, fullName, initials, skillRefetch } = useProfile(myUserId);

  const guestFirstName = useSelector( (state: any) => state.user.firstName);
  
  const guestLastName = useSelector( (state: any) => state.user.lastName);

  const guestFullName = guestFirstName + " " + guestLastName

  const guestInitials = guestFirstName.charAt(0).toUpperCase() + " " + guestLastName.charAt(0).toUpperCase();

  const [ isAddMode, setIsAddMode ] = useState(false);
  
  const closeModal = () => { setIsAddMode(false) }
  
  const userType = useSelector( (state: any) => state.user.userType);
  
  const isConsumer = () => { return userType === 'consumer' }
  
  const hasSkills = () => {
    return skills.length > 0;
  }


  return ( 
    <SafeAreaView>
      <View>
        <DefaultHeader title={'Profile'} navigation={props.navigation}/>
      </View>
      
      {loading &&  <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
      
      <ScrollView>
        {!isLoggedIn && <GuestProfile initials={guestInitials} fullName={guestFullName} firstName={guestFirstName}/>}
        {user && isLoggedIn && <>

        <Profile initials={initials} fullName={fullName} user={user} isMe={true} navigation={props.navigation}/>
        <ProfileLink firstName={'My'} navigation={props.navigation} title={'reviews'} icon={'star-outline'} user={user}/>
        <ProfileLink firstName={'My'} navigation={props.navigation} title={'skills'} icon={'lightbulb'} user={user}/>
        <ProfileLink firstName={'My'} navigation={props.navigation} title={'friends'} icon={'people'} user={user}/>
        <ProfileLink firstName={'My'} navigation={props.navigation} title={'settings'} icon={'settings'} user={user} initials={props.initials} />
      
        <View style={styles.sectionWrapper}>
          {isConsumer() ? 
            null
          :
            <View style={styles.profileSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.h4Style}>My skills</Text>
                {skills && 
                  <TouchableOpacity style={{marginLeft: 10}} onPress={() => setIsAddMode(true)}>
                    <Icon type='material' name='edit' />
                    <EditSkills visible={isAddMode} onCancel={closeModal} skills={skills} skillRefetch={skillRefetch} isPersonal={true}/>
                  </TouchableOpacity>
                }
              </View>
              {hasSkills() ? 
                <View style={styles.overview}>
                {skills.map((skill: { name: string; id: number }) => { return (
                  <Skill name={skill.name} editMode={false} darkMode={false} key={skill.id}/>
                )})}
                </View>
              : 
                <NoDataText text={'You haven\'t added any skills yet'}/>
              }
            </View>
          }
        </View>

        <View style={[styles.sectionHeader, {marginLeft: 10}]}>
          <Text style={styles.h4Style}>My reviews</Text>
          {lastReviews && lastReviews.length > 0 &&
            <SeeAllButton userId={myUserId} firstName={'My'} navigation={props.navigation} case={'reviews'}/>
          }
        </View>
        {lastReviews && lastReviews.length > 0 ? 
          <View style={{marginBottom: 100}}>
            {lastReviews.map((review : any) => { return (
              <View key={review.id}>
                <Review 
                  comment={review["comment"]} 
                  rating={review["rating"]} 
                  date={review["createdAt"]} 
                  firstName={review["fromUser"]["firstName"]} 
                  lastName={review["fromUser"]["lastName"]} 
                  key={review.id}
                />
              </View>
            )})}
          </View>
        : 
          <View style={{marginLeft: 10}}>
            <NoDataText text={'You haven\'t received any reviews yet'}/>
          </View>
        }
      </>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

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

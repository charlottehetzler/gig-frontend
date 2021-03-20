import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Review } from '../../components/Card/Review';
import { GigColors } from '../../constants/colors';
import useProfile from '../../helpers/user';
import { Profile } from '../../components/Card/Profile';
import { DefaultHeader } from '../../components/Header/DefaultHeader';
import { NoDataText } from '../../components/Placeholder/NoDataText';

export default function ProfileScreen(props: any) {

  const { isMe, userId } = props.route.params;

  const { user, lastReviews, loading, error, fullName, firstName, initials } = useProfile(userId);

  const hasLastReviews = () => {
    return lastReviews.length > 0 ? true : false;
  }
  
  return ( 
    <SafeAreaView >
      
      <View>
        <DefaultHeader title={fullName} navigation={props.navigation} goBack={true}/>
      </View>

      {loading &&  <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
      
      <ScrollView>
        {user && <>
        <Profile initials={initials} fullName={fullName} user={user} isMe={false} navigation={props.navigation}/>
        
        <View style={styles.profileSection}>
          <View style={[styles.sectionHeader, {marginLeft: 10}]}>
            <Text style={styles.h4Style}>{user.firstName}'s reviews</Text>
            {lastReviews && hasLastReviews() &&
              <TouchableOpacity style={styles.moreButton} onPress={() => props.navigation.navigate('Reviews', {userId: userId, firstName: 'My'})}>
                <Text>See all</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
        {lastReviews && hasLastReviews() ? 
          <View>
            {lastReviews.map((review : any) => { return (
              <View>
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
            <NoDataText text={`${user.firstName} hasn\'t received any reviews yet.`}/>
          </View>
        }
      </>}
    </ScrollView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'flex-start',
    marginVertical: 5,
    marginTop: 15,
  },
  h4Style: {
    marginTop: 15,
    fontSize: 24,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
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
});

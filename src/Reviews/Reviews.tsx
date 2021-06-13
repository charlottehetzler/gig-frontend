import React from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { DefaultHeader } from '../components/Header/DefaultHeader';
import { ScrollView } from 'react-native-gesture-handler';
import { useQuery } from '@apollo/client';
import { GET_REVIEWS_FOR_USER } from '../lib/review';
import { GigColors } from '../constants/colors';
import { Review } from './Review';

export default function ReviewsScreen(props: any) {
  
  const { userId, firstName, isConsumer } = props.route.params;

  const { data, loading, error } = useQuery(GET_REVIEWS_FOR_USER, {variables: {query: {userId: userId} } });
  
  const reviews = data?.getReviewsForUser || [];
  
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <DefaultHeader title={`${firstName} Reviews`} navigation={props.navigation} goBack={true} isConsumer={isConsumer}/>
      </View>
      {loading &&  <ActivityIndicator size="large" color={GigColors.Blue} style={{alignItems:'center', justifyContent:'center'}}/>}
      <ScrollView>
        {reviews.map((review : any) => { return (
          <View style={styles.gigWrapper}>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0
  },
  h4Style: {
    marginTop: 25,
    fontSize: 26,
    marginBottom: 10
  },
  header: {
    height: 75, 
    alignItems: 'center', 
    justifyContent:'center',
    backgroundColor: GigColors.DarkGrey
  },
  gigWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { GigColors } from '../../constants/colors';
import { Avatar, Icon, AirbnbRating } from 'react-native-elements';
import { GET_COMMON_CHAT_ROOM } from '../../lib/chat';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { EditProfile } from '../Overlay/EditProfile';
import { GET_SUBMITTED_REVIEW } from '../../lib/review';
import { ProfileActions } from '../Button/ProfileActions';


export function Profile (props: any) {
  
  const currentUserId = useSelector((state: any) => state.user.userId);

  const languages = props.user.languages;
    
  const userId = props.user.id

  const { data, loading, error } = useQuery(GET_COMMON_CHAT_ROOM, {variables: {currentUserId: currentUserId, userId: userId} });  
  
  const { data: reviewData, loading: reviewLoading, error: reviewError } = useQuery(GET_SUBMITTED_REVIEW, {variables: {query: { userId: userId, fromUserId: currentUserId, skillId: props.skillId}} });  
   
  const [ isEditMode, setIsEditMode ] = useState(false);
  
  const [ reviewDisabled, setReviewDisabled ] = useState(false);

  const [ chatRoomId, setChatRoomId ] = useState();
  
  const closeEditModal = () => setIsEditMode(false);


  useMemo(() => {
    if (data && data?.getCommonChatRoom) {
      setChatRoomId(data?.getCommonChatRoom.id);
    }
    if (reviewData && reviewData?.getSubmittedReview) {
      setReviewDisabled(reviewData?.getSubmittedReview);
    }
  }, [data]);

  return (
    <View style={{backgroundColor: GigColors.White, borderRadius: 30, marginBottom: 35}}>
      <View style={styles.icon}>
        {props.isMe ? 
          <TouchableWithoutFeedback onPress={() => setIsEditMode(true)}>
            <View>
              <Icon type='material' name='edit' color={GigColors.Mustard} size={24}/>
              <EditProfile visible={isEditMode} onCancel={closeEditModal} user={props.user} initials={props.initials} />
            </View>
          </TouchableWithoutFeedback>
        : 
          null
        }     
      </View>

      <View style={styles.profile}>

        <Avatar containerStyle={styles.avatar} size={100} title={props.initials}/>
        <Text style={styles.h4Style}>{props.fullName}</Text>
        <View style={styles.overview}> 
          <Text style={styles.underline}> {props.user.nativeLanguage} </Text> 
          {languages.length > 0 &&
            languages.map((language: any) => { return (
              <Text key={language.id}>{language.name} </Text>
            )})
          }
        </View>
        
        <View style={styles.rating}>
          <AirbnbRating
            count={5}
            selectedColor={GigColors.Blue}
            defaultRating={props.user.avgRating}
            size={25}
            showRating={false}
            isDisabled={true}
          />
        </View>

        {!props.isMe &&
          <ProfileActions 
            userId={userId}
            user={props.user}
            navigation={props.navigation}
            reviewDisabled={reviewDisabled}
          />
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  profile: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  infoText: {
    color: GigColors.Black,
    marginLeft: 10
  },
  underline: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    color: GigColors.Black,
    textDecorationColor: GigColors.Blue,
  },
  rating: {
    marginVertical: 15
  },
  h4Style: {
    marginTop: 15,
    fontSize: 24,
    textAlign: 'center',
  },
  avatar: {
    backgroundColor: GigColors.Taupe, 
    borderRadius: 50
  },
  icon: {
    alignItems: 'flex-end',
    marginRight: 20,
    marginTop: 15
  },
  overview: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
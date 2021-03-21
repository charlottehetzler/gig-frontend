import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Platform, Linking, Alert } from 'react-native';
import { GigColors } from '../../constants/colors';
import { Avatar, Icon, AirbnbRating } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NewReview } from '../Overlay/NewReview';
import { GET_COMMON_CHAT_ROOM } from '../../lib/chat';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import Communications from 'react-native-communications';
import { EditProfile } from '../Overlay/EditProfile';
import moment from 'moment';
import { GET_SUBMITTED_REVIEW } from '../../lib/review';


export function Profile (props: any) {
  
  const { navigate } = props.navigation;
  
  const currentUserId = useSelector((state: any) => state.user.userId);

  const languages = props.user.languages;
    
  const userId = props.user.id

  const { data, loading, error } = useQuery(GET_COMMON_CHAT_ROOM, {variables: {currentUserId: currentUserId, userId: userId} });  
  
  const { data: reviewData, loading: reviewLoading, error: reviewError } = useQuery(GET_SUBMITTED_REVIEW, {variables: {query: { userId: userId, fromUserId: currentUserId}} });  
 
  const [ isAddMode, setIsAddMode ] = useState(false);
  
  const [ isEditMode, setIsEditMode ] = useState(false);
  
  const [ reviewDisabled, setReviewDisabled ] = useState(false);

  const [ chatRoomId, setChatRoomId ] = useState();
  
  const closeModal = () => setIsAddMode(false);
  
  const closeEditModal = () => setIsEditMode(false);

  const disableReview = () => setReviewDisabled(true);

  useMemo(() => {
    if (data && data?.getCommonChatRoom) {
      setChatRoomId(data?.getCommonChatRoom.id);
    }
    if (reviewData && reviewData?.getSubmittedReview) {
      setReviewDisabled(reviewData?.getSubmittedReview);
    }
  }, [data]);

  return (
    <View style={{backgroundColor: GigColors.White}}>
      <View style={styles.icon}>
        {props.isMe ? 
          <TouchableWithoutFeedback onPress={() => setIsEditMode(true)}>
            <View>
              <Icon type='material' name='edit' color={GigColors.Black}/>
              <EditProfile visible={isEditMode} onCancel={closeEditModal} user={props.user} initials={props.initials} />
            </View>
          </TouchableWithoutFeedback>
        : 
          null
        }     
      </View>

      <View style={styles.profile}>

        <Avatar containerStyle={styles.avatar} size={75} title={props.initials}/>
        <Text style={styles.h4Style}>{props.fullName}</Text>
        <View style={styles.overview}> 
          <Text style={styles.nativeLanguage}> {props.user.nativeLanguage} </Text> 
          {languages.length > 0 &&
            languages.map((language: any) => { return (
              <Text key={language.id}>{language.name} </Text>
            )})
          }
        </View>
        
        <View style={styles.rating}>
          <AirbnbRating
            count={5}
            selectedColor={GigColors.Black}
            defaultRating={props.user.avgRating}
            size={25}
            showRating={false}
            isDisabled={true}
          />
        </View>

        <View style={[styles.infos, {marginBottom: 20}]}>
          {props.isMe ? 
            <View>
              <View style={styles.info}>
                <Icon name="calendar-today" color={GigColors.DarkGrey}/>
                <Text style={[styles.infoText, {color: GigColors.DarkGrey}]}>{moment(props.user.birthday).format('LL')}</Text>
              </View>

              <View style={styles.info}>
                <Icon name="call" color={GigColors.Black} />
                <Text style={styles.infoText}>{props.user.phoneNumber}</Text>
              </View>
              {props.user.email &&
                <View style={styles.info}>
                  <Icon name="email" color={GigColors.Black} />
                  <Text style={styles.infoText}>{props.user.email}</Text>
                </View>
              }

            </View>
          :
            <View>
              <View style={styles.profileActions}>
                {props.user.isCallable ?
                  <TouchableOpacity style={[styles.profileAction]} onPress={() => Communications.phonecall(props.user.phoneNumber, true)}>
                    <Icon type='material' name='call' color={GigColors.Black} style={{marginRight: 10}}/>
                    <Text>Call</Text>
                  </TouchableOpacity>
                :
                  <View style={[styles.profileAction, {borderColor: GigColors.DarkGrey}]}>
                    <Icon type='material' name='call' color={GigColors.DarkGrey} style={{marginRight: 10}}/>
                    <Text style={{color: GigColors.DarkGrey}}>Call</Text>
                  </View>
                }

                <TouchableOpacity style={[styles.profileAction]} onPress={() => navigate('Chat', {
                  chatRoomId: chatRoomId, userId: userId,
                  firstName: props.user.firstName, lastName: props.user.lastName
                })}>
                  <Icon type='material' name='mail-outline' color={GigColors.Black} style={{marginRight: 10}}/>
                  <Text>Message</Text>
                </TouchableOpacity>
              </View>
              {reviewDisabled ? 
                <View style={[styles.profileAction, {borderColor: GigColors.DarkGrey}]}>
                  <Icon type='material' name='star-outline' color={GigColors.DarkGrey} style={{marginRight: 10}}/>
                  <Text style={{color: GigColors.DarkGrey}}>Add review</Text>
                  <NewReview visible={isAddMode} onCancel={closeModal} userId={props.user.id} firstName={props.user.firstName} disable={disableReview}/>
                </View>
              : 
                <TouchableOpacity style={styles.profileAction} onPress={() => setIsAddMode(true)}>
                  <Icon type='material' name='star-outline' color={GigColors.Black} style={{marginRight: 10}}/>
                  <Text>Add review</Text>
                  <NewReview visible={isAddMode} onCancel={closeModal} userId={props.user.id} firstName={props.user.firstName} disable={disableReview} refetch={props.refetch}/>
                </TouchableOpacity>
            }
            </View>
          }

        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  profile: {
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: GigColors.White,
    borderBottomColor: GigColors.Grey,
    borderBottomWidth: 1
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
  language: {

  },
  nativeLanguage: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    color: GigColors.Black,
    textDecorationColor: '#000000',
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
    backgroundColor: GigColors.DarkGrey, 
    borderRadius: 50
  },
  infos: {
    marginTop: 10,
    width: '50%',

  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    alignItems: 'flex-end',
    marginRight: 20,
    marginTop: 15
  },
  profileActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  profileAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: GigColors.Black,
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
  },
  contactAction: {
    width: '70%'
  },
  overview: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
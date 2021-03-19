import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { GigColors } from '../../constants/colors';
import { Avatar, Icon, Rating } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NewReview } from '../Overlay/NewReview';


export function Profile (props: any) {
  
  const [ isAddMode, setIsAddMode ] = useState(false);
  const closeModal = () => { setIsAddMode(false) }

  return (
    <View style={{backgroundColor: GigColors.White}}>
      <View style={styles.icon}>
        {props.isMe ? 
        <TouchableWithoutFeedback >
          <Icon type='material' name='edit' />
        </TouchableWithoutFeedback>
        : null}     
      </View>

      <View style={styles.profile}>

        <Avatar containerStyle={styles.avatar} size={75} title={props.initials}/>
        <Text style={styles.h4Style}>{props.fullName}</Text>
        <Text style={styles.language}><Text style={styles.nativeLanguage}> {props.user.nativeLanguage}</Text> </Text>
        
        <View style={styles.rating}>
          <Rating type='custom' ratingColor={GigColors.Black} imageSize={30} readonly startingValue={props.user.avgRating}/>
        </View>
      
        <View style={[styles.infos, {marginBottom: 20}]}>
          
          <View style={styles.profileActions}>
            <TouchableOpacity style={[styles.profileAction]}>
            <Icon type='material' name='call' color={GigColors.Black} style={{marginRight: 10}}/>
              <Text>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.profileAction]}>
              <Icon type='material' name='mail-outline' color={GigColors.Black} style={{marginRight: 10}}/>
              <Text>Message</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.profileAction} onPress={() => setIsAddMode(true)}>
            <Icon type='material' name='star-outline' color={GigColors.Black} style={{marginRight: 10}}/>
            <Text>Add review</Text>
            <NewReview visible={isAddMode} onCancel={closeModal} userId={props.user.id} firstName={props.user.firstName}/>
          </TouchableOpacity>
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
    color: GigColors.DarkGrey,
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
  }
});
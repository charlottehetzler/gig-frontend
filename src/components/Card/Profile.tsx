import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { GigColors } from '../../constants/colors';
import moment from 'moment';
import { Avatar, Icon, Rating } from 'react-native-elements';

export function Profile (props: any) {
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
          <View style={styles.infos}>

            <View style={styles.info}>
              <Icon name="email" color="#7F7F7F"/>
              <Text style={styles.infoText}>{props.email}</Text>
            </View>

            <View style={styles.info}>
              <Icon name="calendar-today" color="#7F7F7F"/>
              <Text style={styles.infoText}>{moment(props.birthday).format('LL')}</Text>
            </View>
          </View>
        <View style={styles.rating}>
          <Rating imageSize={30} readonly startingValue={props.avgRating}/>
        </View>
      </View>
      </View>
    )
}

const styles = StyleSheet.create({
  profile: {
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: GigColors.Grey,
    borderBottomWidth: 1,
    backgroundColor: GigColors.White
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
    marginTop: 10
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    alignItems: 'flex-end',
    marginRight: 20,
    marginTop: 15
  }
});
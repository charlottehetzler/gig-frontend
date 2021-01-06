import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { GigColors } from '../../constants/colors';
import { AuthButtons } from '../Button/AuthButtons';

export default function GuestProfile(props: any) {

  return ( 
    <View>
      <View style={styles.profile}>
        <Avatar containerStyle={styles.avatar} size={75} title={props.initials}/>
        <Text style={styles.h4Style}>{props.fullName}</Text>
      </View>

      <View style={styles.sectionWrapper}>
        <View style={styles.profileSection}>
          <Text style={styles.h4Style}>My skills</Text>
          <Text style={styles.noItems}>Signup or Login to add your skills!</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.h4Style}>My portfolio</Text>
          </View>
          <Text style={styles.noItems}>Signup or Login to see your pictures!</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.h4Style}>My reviews</Text>
          </View>
          <Text style={styles.noItems}>Signup or Login to see your reviews!</Text> 
        </View>
          <AuthButtons/>
      </View>
    </View>
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
  profileSection: {
    alignItems: 'flex-start',
    marginVertical: 5
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  noItems: {
    marginTop: 10,
    color: GigColors.DarkGrey
  }
});
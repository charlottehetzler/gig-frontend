import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GigColors } from '../../constants/colors';


export function SeeAllButton (props: any) {
  const handlePress = () => {
    if (props.case === 'reviews') {
      props.navigation.navigate('Reviews', { userId: props.userId, firstName: props.firstName })
    } else if (props.case === 'categories') {
      props.navigation.navigate('Categories')
    }
  }

  return (
    <TouchableOpacity style={styles.moreButton} onPress={handlePress}>
      <Text>See all</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
    marginRight: 16
  },
  });
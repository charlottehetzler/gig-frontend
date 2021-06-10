import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Avatar, Icon } from 'react-native-elements'; 
import { GigColors } from '../constants/colors';

export default function ImagePicker(props: any) {

  return ( 
    <View>
      <Avatar containerStyle={styles.avatar} size={90} title={props.initials}/>
      <TouchableOpacity>
          <Icon type='material' name='edit' color={GigColors.Blue}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: GigColors.Taupe, 
    borderRadius: 50,
  },
});
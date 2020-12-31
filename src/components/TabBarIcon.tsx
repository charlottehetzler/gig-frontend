import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const tintColor = '#7F7F7F';

const Colors = {
  tintColor,
  tabIconDefault: '#C4C4C4',
  tabIconSelected: tintColor,
  tabBar: '#fefefe',
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: tintColor,
  noticeText: '#fff',
};

export default function TabBarIcon(props: any) {
  return (
    <Ionicons
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
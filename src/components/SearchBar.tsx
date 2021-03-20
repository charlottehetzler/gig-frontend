import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { GigColors } from '../constants/colors';


export default function SearchBar (props: any) {

  const skills = props.skills;
  
  const [filtered, setFiltered] = useState();

  const [searching, setSearching] = useState(false);
  
  const onSearch = (text: any) => {
    if (text) {
      setSearching(true);
      const temp = text.toLowerCase();
      let skillNames = [];
      for (const skill of skills) {
        const skillItem = [];
        skillItem.push(skill.id);
        skillItem.push(skill.name);
        skillNames.push(skillItem)
      }
      const tempList = skillNames.filter((item: any) => {
        if (item[1].toLowerCase().includes(temp)) {
          return item
        }
      })
      setFiltered(tempList);
    } else {
      setSearching(false)
      setFiltered(skills)
    }
  }

  return (
    <View>
      <TextInput 
        style={styles.textInput}
        placeholder="Search"
        placeholderTextColor={GigColors.Grey}
        onChangeText={onSearch}
      />
      {searching &&
        <View style={styles.subContainer}>
        {filtered.length ?
          filtered.map((item: any) => {
            return (
              <View style={styles.itemView} key={item.id}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Producers', {skillId: item[0]} )} >
                  <Text style={styles.itemText}>{item[1]}</Text>
                </TouchableOpacity>
              </View>
            )
          })
        :
          <View style={styles.noResultView}>
              <Text style={styles.noResultText}>No search items matched</Text>
          </View>
        }
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: GigColors.White,
    paddingTop: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  itemView: {
    backgroundColor: GigColors.White,
    height: 30,
    width: '90%',
    marginBottom: 10,
    justifyContent: 'center',
    borderRadius: 4,
  },
  noResultView: {
    alignSelf: 'center',
    height: 75,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  noResultText: {
    fontSize: 18,
    color: GigColors.Black
  },
  itemText: {
    color: GigColors.Black,
    paddingHorizontal: 10,
    fontSize: 16
  },
  textInput: {
    backgroundColor: GigColors.White,
    width: '100%',
    borderRadius: 5,
    height: 50,
    fontSize: 20,
    paddingHorizontal: 10,
  },
})
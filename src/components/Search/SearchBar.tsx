import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { GigColors } from '../../constants/colors';
import { NewSkill } from '../Overlay/NewSkill';
import { useQuery } from '@apollo/client';
import { GET_All_SKILLS, GET_AVAILABLE_SKILLS_FOR_PRODUCER } from '../../lib/skill';
import { Icon } from 'react-native-elements';


export default function SearchBar (props: any) {

  const { data: skillsData, error: skillsErros, loading: skillsLoading } = useQuery(GET_All_SKILLS);

  const { data, error, loading: availableSkillsLoading, refetch } = useQuery(GET_AVAILABLE_SKILLS_FOR_PRODUCER, {variables: {query: {userId: props.currentUserId} }});

  const [ skills, setSkills ] = useState()
  
  const [filtered, setFiltered] = useState();

  const [searching, setSearching] = useState(false);

  const [ isAddMode, setIsAddMode ] = useState(false);

  const [ addedSkill, setAddedSkill ] = useState();
  
  const [ iconVisible, setIconVisible ] = useState(false);
  
  const [ searchText, setSearchText ] = useState('');

  const closeModal = () => { setIsAddMode(false) }

  useMemo(() => {
    if (props.profileMode) {
      if (data && data?.getAvailableSkillsForProducer) {
        setSkills(data?.getAvailableSkillsForProducer);
      }
    } else {
      if (skillsData && skillsData?.getAllSkills) {
        setSkills(skillsData?.getAllSkills);
      }
    }
  },[skillsData, data]);
  
  const onSearch = (text: any) => {
    if (text) {
      setSearchText(text)
      setSearching(true);
      setIconVisible(true);
      const temp = text.toLowerCase();
      let skillNames = [];
      for (const skill of skills) {
        const skillItem = [];
        skillItem.push(skill.id);
        skillItem.push(skill.name);
        skillItem.push(skill.description);
        skillItem.push(skill.category.name)
        skillNames.push(skillItem);
      }
      const tempList = skillNames.filter((item: any) => {
        if (item[1].toLowerCase().includes(temp) || 
          item[2].toLowerCase().includes(temp) || item[3].toLowerCase().includes(temp)
        ) {
          return item
        }
      })
      setFiltered(tempList);
    } else {
      setIconVisible(false);
      setSearching(false);
      setFiltered(skills);
      setSearchText('')

    }
  }

  const handleAdd = (item: any) => {
    setAddedSkill(item);
    props.onSelect(item[1], item[0], true);
    setFiltered(false);
    setSearching(false);
  }

  const onCancel = () => {
    setFiltered(false);
    setSearching(false);
    setIconVisible(false);
    setSearchText('')
  }
  
  const loading = useMemo(() => {
    return availableSkillsLoading || skillsLoading;
  }, [ availableSkillsLoading, skillsLoading ]);

  return (
    <View>
      <View style={styles.input}>
        <TextInput 
          style={styles.textInput}
          placeholder="Search"
          placeholderTextColor={GigColors.Grey}
          onChangeText={onSearch}
          value={searchText}
        />
        <TouchableWithoutFeedback onPress={onCancel}>
          <Icon type='material' name='close' color={GigColors.Black} style={ iconVisible ? styles.visible : styles.nonVisible} size={25}/>
        </TouchableWithoutFeedback>

      </View>
      {loading && <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}

      {searching &&
        <View style={styles.subContainer}>
        {filtered.length > 0 ?
          filtered.map((item: any) => {
            return (
              <View style={styles.itemView} key={item.id}>
                {props.isPersonal ? 
                  <TouchableOpacity onPress={() => handleAdd(item)}>
                    <Text style={styles.itemText}>{item[1]}</Text>
                  </TouchableOpacity>
                :
                  <TouchableOpacity onPress={() => props.navigation.navigate('Producers', {skillId: item[0]} )} >
                    <Text style={styles.itemText}>{item[1]}</Text>
                  </TouchableOpacity>
                }
              </View>
            )
          })
        :
          <View style={styles.noResultView}>
            <Text style={styles.noResultText}>We couldn't find your skill.</Text>
            <Text style={styles.noResultText}>Add it to the platform!</Text>
            <TouchableOpacity style={{marginLeft: 10}} onPress={() => setIsAddMode(true)}>
              <Text>Add Skill</Text>
            </TouchableOpacity>
          </View>
        }
          <NewSkill visible={isAddMode} onCancel={closeModal} isPersonal={props.isPersonal} refetchSkills={props.refetchSkills}/>
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
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  visible: {
    alignItems:'flex-end',
    marginRight: 20
  },
  nonVisible: {
    display: 'none'
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
    alignSelf: 'flex-start',
    height: 75,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  noResultText: {
    fontSize: 18,
    color: GigColors.DarkGrey
  },
  itemText: {
    color: GigColors.Black,
    paddingHorizontal: 10,
    fontSize: 16
  },
  textInput: {
    backgroundColor: GigColors.White,
    borderRadius: 5,
    height: 50,
    fontSize: 20,
    paddingHorizontal: 10,
    // width: '100%',
    flex: 1,
  },
})
import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, Modal } from 'react-native';
import { GigColors } from '../../constants/colors';
import { NoDataText } from '../../components/Placeholder/NoDataText';
import DropDownPicker from 'react-native-dropdown-picker';
import { Skill } from '../../Gigs/Skill';
import { useQuery, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { DefaultButton, DisabledDefaultButton } from '../../components/Button/DefaultButton';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { GET_All_SKILLS_FOR_PRODUCER, ADD_OR_UPDATE_SKILL_FOR_USER, GET_AVAILABLE_SKILLS_FOR_PRODUCER } from '../../lib/skill';

let ADDED_SKILLS: any[] = [];

export function EditSkills (props: any) {

  const currentUserId = useSelector((state: any) => state.user.userId);

  const { data, loading: skillLoading, error, refetch } = useQuery(GET_All_SKILLS_FOR_PRODUCER , {variables: {query: {userId: currentUserId} }});
  const { data: skillData, loading: availSkillLoading, error: availSkillError, refetch: availSkillRefetch } = useQuery(GET_AVAILABLE_SKILLS_FOR_PRODUCER, {variables: {query: {userId: currentUserId} }});
  const [ doUpdateRelation, { loading: updateRelationLoading } ] = useMutation(ADD_OR_UPDATE_SKILL_FOR_USER);
  
  const [ addedSkills, setAddedSkills ] = useState<any>(ADDED_SKILLS);
  const [ changesMade, setChangesMade ] = useState(false);
  const [ skills, setSkills ] = useState();
  const [ currentSkills, setCurrentSkills ] = useState(skills);
    
  useEffect(() => {
    fetchCurrentSkills();
    fetchAvailableSkills();
  }, [ currentSkills, skills ]);

  useMemo(() => {
    if (data && data?.getAllSkillsForProducer) {
      setCurrentSkills(data?.getAllSkillsForProducer);
    }
    if (skillData && skillData?.getAvailableSkillsForProducer) {
      const availableSkills = (skillData.getAvailableSkillsForProducer as any[]).map(skill => {
        return {label: skill.name, value: skill.id};
      });
      setSkills(availableSkills);
    }
  }, [ data, skillData ]);

  const fetchCurrentSkills = async () => {
    try {
      const refetchData = await refetch();
      if (refetchData?.data && refetchData?.data?.getAllSkillsForProducer) {
        setCurrentSkills(refetchData?.data?.getAllSkillsForProducer);
      }
    } catch (e) {
      console.log(e)
    }
  }

  const fetchAvailableSkills = async () => {
    try {
      const refetchData = await availSkillRefetch();
      if (refetchData && refetchData?.getAvailableSkillsForProducer) {
        setSkills(refetchData?.getAvailableSkillsForProducer);
      }
    } catch (e) {
      console.log(e)
    }
  }

  const loading = useMemo(() => {
    return skillLoading || updateRelationLoading;
  }, [ skillLoading, updateRelationLoading ]);

  const handleDelete = async (skillId: number) => {
    try {
      let skillIds = [];
      skillIds.push(skillId)

      const { data, errors } = await doUpdateRelation({
        variables: { userId: currentUserId, skillIds: skillIds, isPersonal: false }
      });

      if (data && data?.addOrUpdateSkillForUser) {
        await fetchCurrentSkills();
      }
      setChangesMade(true);
    } catch (e) {
      console.log(e);
    }
  }
    
  const handleSubmit = async () => {
    try {
      if (addedSkills && addedSkills.length > 0) {
        await doUpdateRelation({
          variables: { userId: currentUserId, skillIds: addedSkills, isPersonal: true }
        });
        ADDED_SKILLS = [];
        setAddedSkills(ADDED_SKILLS);
      }
      closeModal();
    } catch (e) {
      console.log(e);
    }
  }

  const skillChange = async (item: any) => {
    setAddedSkills(item);
    setChangesMade(true);
  }

  const closeModal = () => {
    setChangesMade(false);
    props.onCancel();
  }
    
  return (
    <Modal visible={props.visible} animationType='slide'>
      <ScrollView style={styles.inputContainer}>
        <View style={styles.headerWrapper}>
          <View></View>
          <Text style={styles.title}>Edit Skills</Text>
          <TouchableWithoutFeedback onPress={closeModal}>
            <Icon type='material' name='close' style={styles.icon} color={GigColors.Mustard} size={25}/>
          </TouchableWithoutFeedback>
        </View> 

        <View  style={{marginHorizontal: 16}}>
          <View style={[styles.input, {marginTop: 20}]}>
            <Text style={styles.inputLabel}>your skills</Text>
            <View >
              {currentSkills && currentSkills.length > 0 ?
                <View style={styles.overview}>
                  {currentSkills.map((skill: any) => { return (
                    <TouchableOpacity key={skill.id}>
                      <Skill name={skill.name} id={skill.id} editMode={true} key={skill.id} darkMode={false} onDelete={handleDelete} addMode={false}/>
                    </TouchableOpacity>
                  )})}
                </View>
              :
                <NoDataText text={'You haven\'t added any other languages yet.'}/>
              }
              <DropDownPicker
                items={skills}
                multiple={true}
                multipleText="%d skills have been selected"
                defaultValue={'Select'}
                placeholder="Select more skills"
                onChangeItem={item => skillChange(item)}
                containerStyle={{height: 50}}
                dropDownStyle={{backgroundColor: GigColors.White}}
                itemStyle={{backgroundColor: GigColors.White, paddingVertical:20}}
                zIndex={5000}
                arrowColor={GigColors.Taupe}
                labelStyle={{color: GigColors.Blue, textTransform:'uppercase'}}
                activeLabelStyle={{color: GigColors.Blue}}
                dropDownMaxHeight={400}
                searchable={true}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{paddingBottom: 50, backgroundColor: GigColors.Greyish, paddingHorizontal: 16}}>
        {changesMade ?
          <DefaultButton title={'update skills'} onPress={handleSubmit}/>
        :
          <DisabledDefaultButton title={'update skills'}/>
        }             
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
  inputContainer: {
    flex: 1,
    marginTop: 60, 
    backgroundColor: GigColors.Greyish
  },
  input: {
    marginVertical: 10,        
  },
  inputLabel: {
    textTransform: 'uppercase',
    fontWeight: '500',
    marginBottom: 5,
    fontSize: 16, 
    color: GigColors.Blue
  },
  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    color: GigColors.Blue,
    backgroundColor: GigColors.White
  },
  overview: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 25
  },
  title: {
    fontWeight: '600',
    color: GigColors.Blue,
    fontSize: 24,
    textAlign: 'center'
  },
  icon: {
    alignItems:'flex-end',
    marginRight: 20
  }
});

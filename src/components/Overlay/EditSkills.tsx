import React, { useState, useMemo, useEffect } from 'react';
import { View, Modal, ActivityIndicator, TouchableWithoutFeedback, TouchableOpacity, TextInput } from 'react-native';
import { StyleSheet, Text } from "react-native";
import { GigColors } from '../../constants/colors';
import { useMutation, useQuery } from '@apollo/client';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { Skill } from '../Card/Skill';
import { DELETE_SKILL} from '../../lib/skill';
import { NoDataText } from '../Placeholder/NoDataText';
import SearchBar from '../SearchBar';

export function EditSkills ( props: any ) {

    const skills = props.skills;

    const refetch = props.skillRefetch;

    const currentUserId = useSelector((state: any) => state.user.userId);

    // const { data, error, loading: skillLoading, refetch } = useQuery(GET_All_SKILLS_FOR_PRODUCER, {variables: {query: {userId: currentUserId} }});

    const [ currentSkills, setCurrentSkills ] = useState<any>();
    
    const [ doDeleteSkill, { loading: deleteSkillLoading } ] = useMutation(DELETE_SKILL);

    const [changesMade, setChangesMade] = useState(false);

    const [filtered, setFiltered] = useState();

    const [searching, setSearching] = useState(false);

    useMemo(() => {
        setCurrentSkills(skills);
    }, []);

    const fetchCurrentSkills = async () => {
        try {
            const refetchData = await refetch();
            if (refetchData && refetchData?.getAllSkillsForProducer) {
                setCurrentSkills(refetchData?.getAllSkillsForProducer);
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleDelete = async (skillId: number) => {
        try {
            const { data, errors } = await doDeleteSkill({
                variables: { input: { userId: currentUserId, skillId: skillId }}
            });
            if (data && data?.deleteSkill) {
                await fetchCurrentSkills();
            }
        } catch (e) {
            console.log(e);
        }
    }

    const loading = useMemo(() => {
        return deleteSkillLoading;
    }, [deleteSkillLoading]);

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
        <Modal visible={props.visible} animationType='slide'>
        {loading &&  <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
            
            <View style={styles.inputContainer}>
                
                <View style={styles.headerWrapper}>
                    {changesMade ? 
                        <TouchableOpacity onPress={() => console.log("not there yet")}>
                            <Text style={styles.save}>save</Text>
                        </TouchableOpacity>
                    :
                        <Text style={styles.defaultSave}>save</Text>
                    }
                    <Text style={styles.title}>Edit Skills</Text>

                    <TouchableWithoutFeedback onPress={props.onCancel}>
                        <Icon type='material' name='close' style={styles.icon} size={25}/>
                    </TouchableWithoutFeedback>

                </View>

                <View style={styles.container}>
                    <SearchBar skills={skills} navigation={props.navigation}/>

                    <View style={styles.skillSection}>
                        <Text style={styles.smallSubheader}>Your current skills</Text>
                        {currentSkills && currentSkills.length > 0 ?
                            <View style={styles.overview}>
                                {currentSkills.map((skill: { name: string; id: number }) => { return (
                                    <TouchableOpacity >
                                        <Skill name={skill.name} editMode={true} key={skill.id} darkMode={false} />
                                    </TouchableOpacity>
                                )})}
                            </View>
                        :
                            <NoDataText text={'You haven\'t added any skills yet'}/>
                        }
                    </View>

                    <View style={styles.skillSection}>
                        <Text style={styles.smallSubheader}>Your added skills</Text>
                        <View style={styles.overview}>
                        </View>
                    </View>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        marginTop: 60
    },
    icon: {
        alignItems:'flex-end',
        marginRight: 20
    },
    save: {
        alignItems:'flex-start',
        marginLeft: 20,
    },
    defaultSave: {
        alignItems:'flex-start',
        marginLeft: 20,
        color: GigColors.DarkGrey
    },
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 25
    },
    title: {
        fontWeight: '600',
        color: GigColors.Black,
        fontSize: 24,
        textAlign: 'center'
    },
    container: {
        padding: 10,
    },
    input: {
        marginVertical: 10,
    },
    textInput: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: GigColors.Grey,
        borderRadius: 5,
        color: GigColors.Black
    },
    overview: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10,
        flexDirection: 'row'
    },
    smallSubheader: {
        color: GigColors.DarkGrey,
        fontSize: 14
    },
    skillSection: {
        marginTop: 25,
    },
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
    }
 });
import React, { useState, useMemo } from 'react';
import { View, Modal, ActivityIndicator, TouchableWithoutFeedback, TouchableOpacity, TextInput } from 'react-native';
import { StyleSheet, Text } from "react-native";
import { GigColors } from '../../constants/colors';
import { useMutation, useQuery } from '@apollo/client';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { Skill } from '../Card/Skill';
import { UPDATE_RELATION, GET_All_SKILLS_FOR_PRODUCER} from '../../lib/skill';
import { NoDataText } from '../Placeholder/NoDataText';
import SearchBar from '../Search/SearchBar';
import useProfile from '../../helpers/user';

let ADDED_SKILLS: any[] = [];

export function EditSkills ( props: any ) {

    const currentUserId = useSelector((state: any) => state.user.userId);
    
    const { data, loading: skillLoading, error, refetch } = useQuery(GET_All_SKILLS_FOR_PRODUCER , {variables: {query: {userId: currentUserId} }});

    const { skills, skillRefetch } = useProfile(currentUserId);

    const [ currentSkills, setCurrentSkills ] = useState(skills);
    
    const [ addedSkills, setAddedSkills ] = useState<any>(ADDED_SKILLS);
        
    const [ doUpdateRelation, { loading: updateRelationLoading } ] = useMutation(UPDATE_RELATION);

    const [ changesMade, setChangesMade ] = useState(false);

    useMemo(() => {
        if (data && data?.getAllSkillsForProducer) {
            setCurrentSkills(data?.getAllSkillsForProducer);
        }
    }, []);

    const fetchCurrentSkills = async () => {
        try {
            const refetchData = await skillRefetch();

            if (refetchData && refetchData?.getAllSkillsForProducer) {
                setCurrentSkills(refetchData?.getAllSkillsForProducer);
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleUpdate = async (name: string, id: number, isPersonal: boolean) => {
        try {
            const { data, errors } = await doUpdateRelation({
                variables: { input: { userId: currentUserId, skillId: id, isPersonal: isPersonal }}
            });

            if (data && data?.updateRelation) {
                const addedSkill = { id, name };
                ADDED_SKILLS.push(addedSkill)
                setAddedSkills(ADDED_SKILLS);
                setChangesMade(true);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleDelete = async (skillId: number, isPersonal: boolean, addMode: boolean) => {
        try {
            const { data, errors } = await doUpdateRelation({
                variables: { input: { userId: currentUserId, skillId: skillId, isPersonal: isPersonal }}
            });
            if (addMode) {
                const index = ADDED_SKILLS.findIndex(x => x.skillId === skillId);
                ADDED_SKILLS.splice(index, 1);
                setAddedSkills(ADDED_SKILLS);
            } else {
                await fetchCurrentSkills();
            }
            setChangesMade(true);
        } catch (e) {
            console.log(e);
        }
    }
    
    const onSave = () => {
        ADDED_SKILLS = [];
        setAddedSkills(ADDED_SKILLS);
        setChangesMade(false);
        fetchCurrentSkills();
        props.onCancel();
    }

    const loading = useMemo(() => {
        return updateRelationLoading || skillLoading;
    }, [updateRelationLoading, skillLoading]);


    return (
        <Modal visible={props.visible} animationType='slide'>
        {loading &&  <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
            
            <View style={styles.inputContainer}>
                
                <View style={styles.headerWrapper}>
                    {changesMade ? 
                        <TouchableOpacity onPress={() => onSave()}>
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
                    {/* <SearchBar navigation={props.navigation} isPersonal={props.isPersonal} onSelect={handleUpdate} currentUserId={currentUserId} profileMode={true}/> */}
                    {addedSkills && addedSkills.length > 0 &&
                        <View style={styles.skillSection}>
                            <Text style={styles.smallSubheader}>Your added skills</Text>
                            <View style={styles.overview}>
                                {addedSkills.map((skill: any) => { return (
                                    <TouchableOpacity >
                                        <Skill name={skill.name} id={skill.id} editMode={true} key={skill.id} darkMode={true} onDelete={handleDelete} addMode={true}/>
                                    </TouchableOpacity>
                                )})}
                            </View>
                        </View>
                    }
                    <View style={styles.skillSection}>
                        <Text style={styles.smallSubheader}>Your current skills</Text>
                        {skills && skills.length > 0 ?
                            <View style={styles.overview}>
                                {skills.map((skill: any) => { return (
                                    <TouchableOpacity key={skill.id}>
                                        <Skill name={skill.name} id={skill.id} editMode={true} key={skill.id} darkMode={false} onDelete={handleDelete} addMode={false}/>
                                    </TouchableOpacity>
                                )})}
                            </View>
                        :
                            <NoDataText text={'You haven\'t added any skills yet'}/>
                        }
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
        flexDirection: 'row',
        flexWrap: 'wrap'
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
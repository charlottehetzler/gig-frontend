import React, { useState, useMemo } from 'react';
import { View, Modal, TextInput, Platform, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { StyleSheet, Text } from "react-native";
import { GigColors } from '../../constants/colors';
import { DefaultButton, DisabledDefaultButton, WhiteDefaultButton } from '../Button/DefaultButton';
import { ADD_SKILL } from '../../lib/skill';
import { GET_All_CATEGORIES } from '../../lib/category';
import DropDownPicker from 'react-native-dropdown-picker';
import { useQuery, useMutation } from '@apollo/client';
import { Icon } from 'react-native-elements';

const currentUserId = 4

export function NewSkill ( props: any ) {

    const { data: catData, error: catError, loading: catLoading } = useQuery(GET_All_CATEGORIES);
            
    const [ doSaveSkill, { loading: saveSkillLoading } ] = useMutation(ADD_SKILL);
            
    const [ categories, setCategories] = useState()
    
    const [category, setCategory] = useState();
    const [categoryIsValid, setCategoryIsValid] = useState(false);
    
    const [skill, setSkill] = useState();
    const [skillIsValid, setSkillIsValid] = useState(false);
    
    const [description, setDescription] = useState();
    
    const [header, setHeader] = useState('Add a new skill');
    
    const [buttonText, setButtonText] = useState('Publish Skill');
    
    
    const skillChangeHandler = (skill: string) => {
        if (skill.trim().length < 5) {
            setSkillIsValid(false);
        } else {
            setSkillIsValid(true);
        }
        setSkill(skill);
    }

    useMemo(() => {
        if (catData && catData?.getAllCategories){
            const allCategories = (catData.getAllCategories as any[]).map(category => {
                return {label: category.name, value: category.id};
              });
            setCategories(allCategories);
        }
    }, [catData]);


    const categoryChange = (item: any) => {
        categories.map((cat: any) => {
            if (item.value === cat.value) {
                setCategory(cat);
                setCategoryIsValid(true);
            }
        });
    }

    const isValid = () => { return skillIsValid && categoryIsValid;}

    const handleSubmit = async () => {
        try {
            const { data, errors } = await doSaveSkill({
                variables: { input: {
                    gigId: props.gig.gigId, skillName: skill, userId: currentUserId, description: description
                }}
            });
        } catch (e) {
          console.log(e);
        }
    }

    const loading = useMemo(() => {
        return catLoading || saveSkillLoading;
    }, [catLoading, saveSkillLoading]);
      
    const error = useMemo(() => {
        return catError;
    }, [catError]);

    return (
        <Modal visible={props.visible} animationType='slide'>
        {loading &&  <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
            <View style={styles.inputContainer}>
                <View style={styles.headerWrapper}>
                    <TouchableWithoutFeedback onPress={props.onCancel}>
                        <Icon type='material' name='close' style={styles.icon} size={25}/>
                    </TouchableWithoutFeedback>
                    <Text style={styles.title}>{header}</Text>
                </View>
                <View style={styles.container}>
                    <View style={[styles.input, {zIndex: 9999}]}>
                        <Text style={styles.inputLabel}>select area of your job</Text>
                        <DropDownPicker
                            items={categories}
                            placeholder="Select a category"
                            onChangeItem={item => categoryChange(item)}
                            containerStyle={{height: 50}}
                            dropDownStyle={{backgroundColor: '#FFFFFF'}}
                            itemStyle={{backgroundColor: '#FFFFFF', borderBottomColor: '#C4C4C4', borderBottomWidth: 1, paddingVertical:20}}
                            zIndex={5000}
                            arrowColor={'#7F7F7F'}
                            labelStyle={{color: '#7F7F7F', textTransform:'uppercase'}}
                            activeLabelStyle={{color: '#000000'}}
                            dropDownMaxHeight={600}
                            searchable={true}
                        />
                    </View>
                    <View style={[styles.input, {zIndex: 9999}]}>
                        <Text style={styles.inputLabel}>add your skill title</Text>
                        <TextInput
                            placeholder={"Title of your skill"}
                            style={styles.textInputBig}
                            value={skill}
                            onChangeText={skillChangeHandler}
                            keyboardType={'default'}
                        />
                    </View>
           
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>add a short description</Text>
                        <TextInput
                            placeholder={"Type here..."}
                            style={styles.textInput}
                            value={description}
                            onChangeText={setDescription}
                            keyboardType={'default'}
                        />
                    </View>
                    <View style={styles.button}>
                        {isValid() ? 
                            <DefaultButton title={buttonText} onPress={handleSubmit} />
                        :
                            <DisabledDefaultButton title={buttonText}/>
                        }
                        {props.gig && <WhiteDefaultButton title={buttonText}/>}
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
    headerWrapper: {
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
    textInputBig: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: GigColors.DarkGrey,
        marginVertical: 15,
        fontSize: 18, 
        color: GigColors.Black
    },
    inputLabel:{
        textTransform: 'uppercase',
        fontWeight: '500',
        marginBottom: 5
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
    dateWrapper: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginVertical: 15,
    },
    date: {
        flex: 1
    }, 
    button: {
        marginTop: 15
    },
    dateInput: {
        color: GigColors.Black
    },
    datePicker:{
        paddingHorizontal: 10,
        paddingVertical: 15,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: GigColors.Grey,
        borderRadius: 5,
        color: GigColors.Black
    }
 });
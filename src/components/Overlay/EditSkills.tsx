import React, { useState, useMemo } from 'react';
import { View, Modal, ActivityIndicator, TouchableWithoutFeedback, TouchableOpacity, TextInput } from 'react-native';
import { StyleSheet, Text } from "react-native";
import { GigColors } from '../../constants/colors';
import { useMutation } from '@apollo/client';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { UPDATE_PROFILE } from '../../lib/user';

export function EditSkills ( props: any ) {

    const user  = props.user;

    const currentUserId = useSelector((state: any) => state.user.userId);

    const [ doSaveProfile, { loading: saveProfileLoading } ] = useMutation(UPDATE_PROFILE);

    const [changesMade, setChangesMade] = useState(false);

    const [filtered, setFiltered] = useState();

    const [searching, setSearching] = useState(false);

    const handleSubmit = async () => {
        try {
            const { data, errors } = await doSaveProfile({
                variables: { input: {
                    
                }}
            });
            console.log(errors)
            props.onCancel()
        } catch (e) {
          console.log(e);
        }
    }

    const loading = useMemo(() => {
        return saveProfileLoading;
    }, [saveProfileLoading]);

    const onSearch = (text: any) => {
        // if (text) {
        //   setSearching(true);
        //   const temp = text.toLowerCase();
        //   let skillNames = [];
        //   for (const skill of skills) {
        //     const skillItem = [];
        //     skillItem.push(skill.id);
        //     skillItem.push(skill.name);
        //     skillNames.push(skillItem)
        //   }
        //   const tempList = skillNames.filter((item: any) => {
        //     if (item[1].toLowerCase().includes(temp)) {
        //       return item
        //     }
        //   })
        //   setFiltered(tempList);
        // } else {
        //   setSearching(false)
        //   setFiltered(skills)
        // }
      }
      

    return (
        <Modal visible={props.visible} animationType='slide'>
        {loading &&  <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
            
            <View style={styles.inputContainer}>
                
                <View style={styles.headerWrapper}>
                    {changesMade ? 
                        <TouchableOpacity onPress={handleSubmit}>
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
                <TextInput 
                    style={styles.textInput}
                    placeholder="Searchh"
                    placeholderTextColor='#C4C4C4'
                    onChangeText={onSearch}
                />

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
    avatarWrapper: {
        alignItems: 'flex-start',
        marginBottom: 40,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    avatar: {
        backgroundColor: GigColors.DarkGrey, 
        borderRadius: 50,
    },
    inputLabel: {
        textTransform: 'uppercase',
        fontWeight: '500',
        marginBottom: 5,
        fontSize: 14
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

 });
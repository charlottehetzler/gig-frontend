import React, { useState, useMemo } from 'react';
import { View, Modal, TextInput, ActivityIndicator, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { StyleSheet, Text } from "react-native";
import { GigColors } from '../../constants/colors';
import { useMutation } from '@apollo/client';
import { Icon, Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { UPDATE_PROFILE } from '../../lib/user';

export function EditProfile ( props: any ) {

    const user  = props.user;

    const currentUserId = useSelector((state: any) => state.user.userId);

    const [ doSaveProfile, { loading: saveProfileLoading } ] = useMutation(UPDATE_PROFILE);
    
    const [firstName, setFirstName] = useState(user.firstName);
    
    const [lastName, setLastName] = useState(user.lastName);
    
    const [email, setEmail] = useState();
    
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    
    const [nativeLanguage, setNativeLanguage] = useState(user.nativeLanguage);
    
    const [changesMade, setChangesMade] = useState(false);

    const firstNameChangeHandler = (firstName: string) => {
        setFirstName(firstName);
        setChangesMade(true);
    }

    const lastNameChangeHandler = (lastName: string) => {
        setLastName(lastName);
        setChangesMade(true);
    }

    const phoneChangeHandler = (phoneNumber: string) => {
        setPhoneNumber(phoneNumber);
        setChangesMade(true);
    }

    const nativeLanguageChangeHandler = (nativeLanguage: string) => {
        setNativeLanguage(nativeLanguage);
        setChangesMade(true);
    }

    const handleSubmit = async () => {
        try {
            const { data, errors } = await doSaveProfile({
                variables: { input: {
                    userId: currentUserId, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, nativeLanguage: nativeLanguage
                }}
            });
            props.onCancel()
        } catch (e) {
          console.log(e);
        }
    }

    const loading = useMemo(() => {
        return saveProfileLoading;
    }, [saveProfileLoading]);
      

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
                    <Text style={styles.title}>Edit Profile</Text>

                    <TouchableWithoutFeedback onPress={props.onCancel}>
                        <Icon type='material' name='close' style={styles.icon} size={25}/>
                    </TouchableWithoutFeedback>

                </View>

                <View style={styles.container}>
                    <View style={styles.avatarWrapper} >
                        <Avatar containerStyle={styles.avatar} size={100} title={props.initials}/>
                        <TouchableOpacity>
                            <Icon type='material' name='edit' color={GigColors.DarkGrey}/>
                        </TouchableOpacity>
                    </View>
           
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>first name</Text>
                        <TextInput
                            placeholder={"Type here..."}
                            style={styles.textInput}
                            value={firstName}
                            onChangeText={firstNameChangeHandler}
                            keyboardType={'default'}
                        />
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>last name</Text>
                        <TextInput
                            placeholder={"Type here..."}
                            style={styles.textInput}
                            value={lastName}
                            onChangeText={lastNameChangeHandler}
                            keyboardType={'default'}
                        />
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>phone number</Text>
                        <TextInput
                            placeholder={"Type here..."}
                            style={styles.textInput}
                            value={phoneNumber}
                            onChangeText={phoneChangeHandler}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>native language</Text>
                        <TextInput
                            placeholder={"Type here..."}
                            style={styles.textInput}
                            value={nativeLanguage}
                            onChangeText={nativeLanguageChangeHandler}
                            keyboardType={'default'}
                        />
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
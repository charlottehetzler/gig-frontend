import React, { useState, useMemo } from 'react';
import { View, Modal, TextInput, ActivityIndicator, TouchableWithoutFeedback, TouchableOpacity, Switch } from 'react-native';
import { StyleSheet, Text } from "react-native";
import { GigColors } from '../../constants/colors';
import { useMutation, useQuery } from '@apollo/client';
import { Icon, Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { UPDATE_PROFILE } from '../../lib/user';
import { GET_ALL_AVAILABLE_LANGUAGES_FOR_USER, GET_ALL_LANGUAGES, GET_ALL_LANGUAGES_FOR_USER, ADD_OR_UPDATE_LANGUAGE_FOR_USER } from '../../lib/language';
import { NoDataText } from '../Placeholder/NoDataText';
import { Skill } from '../Card/Skill';
import LanguageSearch from '../Search/LanguageSearch';
import DropDownPicker from 'react-native-dropdown-picker';

let ADDED_LANGUAGES: any[] = [];

export function EditProfile ( props: any ) {

    const user  = props.user;

    const currentUserId = useSelector((state: any) => state.user.userId);

    const [ doSaveProfile, { loading: saveProfileLoading } ] = useMutation(UPDATE_PROFILE);
    
    const [ doUpdateRelation, { loading: updateRelationLoading } ] = useMutation(ADD_OR_UPDATE_LANGUAGE_FOR_USER);
    
    const { data, loading: languageLoading, error, refetch } = useQuery(GET_ALL_LANGUAGES_FOR_USER , {variables: {query: {userId: currentUserId} }});  
    
    const { data: languageData, loading: avilLanguageLoading, error: languageError, refetch: languageRefetch } = useQuery(GET_ALL_AVAILABLE_LANGUAGES_FOR_USER, {variables: {query: {currentUserId: currentUserId } }});

    const [ languages, setLanguages ] = useState();
    
    const [ firstName, setFirstName ] = useState(user.firstName);
    
    const [ lastName, setLastName ] = useState(user.lastName);
    
    const [ email, setEmail ] = useState();
    
    const [ phoneNumber, setPhoneNumber ] = useState(user.phoneNumber);
    
    const [ nativeLanguage, setNativeLanguage ] = useState(user.nativeLanguage);
    
    const [ currentLanguages, setCurrentLanguages ] = useState();
    
    const [ addedLanguages, setaddedLanguages ] = useState();
    
    const [ changesMade, setChangesMade ] = useState(false);

    const [ isEnabled, setIsEnabled ] = useState(user.isCallable);
    
    useMemo(() => {
        if (data && data?.getAllLanguagesForUser) {
            setCurrentLanguages(data?.getAllLanguagesForUser);
        }
        if (languageData && languageData?.getAllAvilableLanguagesForUser) {
            const availableLanguages = (languageData.getAllAvilableLanguagesForUser as any[]).map(language => {
                return {label: language.name, value: language.id};
            });
            setLanguages(availableLanguages);
        }
    }, [data, languageData]);

    const fetchCurrentLanguages = async () => {
        try {
            const refetchData = await refetch();
            if (refetchData && refetchData?.getAllLanguagesForUser) {
                setCurrentLanguages(refetchData?.getAllLanguagesForUser);
            }
        } catch (e) {
            console.log(e)
        }
    }

    const fetchAvailableLanguages = async () => {
        try {
            const refetchData = await languageRefetch();
            if (refetchData && refetchData?.getAllAvilableLanguagesForUser) {
                setLanguages(refetchData?.getAllAvilableLanguagesForUser);
            }
        } catch (e) {
            console.log(e)
        }
    }
    
    const toggleSwitch = () => {
        setIsEnabled((previousState: any) => !previousState);
        setChangesMade(true)
    }

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

    const languageChange = async (item: any) => {
        try {
            // TODO: check incoming item
            // for each selected language, push in added array
            // array as input for mutation --> change accordingly in backend
            
            // languages.map((lang: any) => {
            //     if (item.value === lang.value) {
            //         setCategory(lang);
            //         setCategoryIsValid(true);
            //     }
            // });
            const { data, errors } = await doUpdateRelation({
                variables: { input: { userId: currentUserId, languageId: id, isActive: isPersonal }}
            });

            if (data && data?.addOrUpdateLanguageForUser) {
                setChangesMade(true);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleDelete = async (languageId: number, isPersonal: boolean, addMode: boolean) => {
        try {
            const { data, errors } = await doUpdateRelation({
                variables: { input: { userId: currentUserId, languageId: languageId, isPersonal: isPersonal }}
            });
            await fetchCurrentLanguages();
            setChangesMade(true);
        } catch (e) {
            console.log(e);
        }
    }

    const handleSubmit = async () => {
        try {
            const { data, errors } = await doSaveProfile({
                variables: { input: {
                    userId: currentUserId, firstName: firstName, lastName: lastName, 
                    phoneNumber: phoneNumber, nativeLanguage: nativeLanguage, isCallable: isEnabled
                }}
            });

            setChangesMade(false);
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
                        <Text style={styles.inputLabel}>Receive Calls?</Text>
                        <Switch
                            trackColor={{ false: GigColors.White, true: GigColors.Black }}
                            thumbColor={isEnabled ? GigColors.White : GigColors.Black}
                            ios_backgroundColor={GigColors.White}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
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
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>more languages</Text>
                        <View style={styles.languageSection}>
                            {currentLanguages && currentLanguages.length > 0 ?
                                <View style={styles.overview}>
                                    {currentLanguages.map((lang: any) => { return (
                                        <TouchableOpacity >
                                            <Skill name={lang.name} id={lang.id} editMode={true} key={lang.id} darkMode={false} onDelete={handleDelete} addMode={false}/>
                                        </TouchableOpacity>
                                    )})}
                                </View>
                            :
                                <NoDataText text={'You haven\'t added any other languages yet.'}/>
                            }
                            <DropDownPicker
                                items={languages}
                                multiple={true}
                                placeholder="Select a category"
                                onChangeItem={item => handleUpdate(item)}
                                containerStyle={{height: 50}}
                                dropDownStyle={{backgroundColor: '#FFFFFF'}}
                                itemStyle={{backgroundColor: '#FFFFFF', borderBottomColor: '#C4C4C4', borderBottomWidth: 1, paddingVertical:20}}
                                zIndex={5000}
                                arrowColor={'#7F7F7F'}
                                labelStyle={{color: '#7F7F7F', textTransform:'uppercase'}}
                                activeLabelStyle={{color: GigColors.Black}}
                                dropDownMaxHeight={600}
                                searchable={true}
                            />
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
    languageSection: {
        marginTop: 25,
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
 });
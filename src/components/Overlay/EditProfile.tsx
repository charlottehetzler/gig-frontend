import React, { useState, useMemo, useEffect } from 'react';
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
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';

let ADDED_LANGUAGES: any[] = [];

export function EditProfile ( props: any ) {

    const user  = props.user;

    const currentUserId = useSelector((state: any) => state.user.userId);

    const [ doSaveProfile, { loading: saveProfileLoading } ] = useMutation(UPDATE_PROFILE);
    
    const [ doUpdateRelation, { loading: updateRelationLoading } ] = useMutation(ADD_OR_UPDATE_LANGUAGE_FOR_USER);
    
    const { data, loading: languageLoading, error, refetch } = useQuery(GET_ALL_LANGUAGES_FOR_USER , {variables: {query: {userId: currentUserId} }});  
    console.log(data)
    const { data: languageData, loading: availLanguageLoading, error: languageError, refetch: languageRefetch } = useQuery(GET_ALL_AVAILABLE_LANGUAGES_FOR_USER, {variables: {query: {userId: currentUserId } }});

    const [ languages, setLanguages ] = useState();
    
    const [ firstName, setFirstName ] = useState(user.firstName);
    
    const [ lastName, setLastName ] = useState(user.lastName);
    
    const [ email, setEmail ] = useState();
    
    const [ phoneNumber, setPhoneNumber ] = useState(user.phoneNumber);
    
    const [ nativeLanguage, setNativeLanguage ] = useState(user.nativeLanguage);
    
    const [ currentLanguages, setCurrentLanguages ] = useState();
    
    const [ addedLanguages, setAddedLanguages ] = useState();
    
    const [ changesMade, setChangesMade ] = useState(false);

    const [ isEnabled, setIsEnabled ] = useState(user.isCallable);
    
    useEffect(() => {
        fetchCurrentLanguages();
        fetchAvailableLanguages();
    }, [currentLanguages, languages])

    useMemo(() => {
        if (data && data?.getAllLanguagesForUser) {
            setCurrentLanguages(data?.getAllLanguagesForUser);
        }
        if (languageData && languageData?.getAllAvailableLanguagesForUser) {
            const availableLanguages = (languageData.getAllAvailableLanguagesForUser as any[]).map(language => {
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
        setAddedLanguages(item);
        setChangesMade(true);
    }

    const handleDelete = async (languageId: number) => {
        try {
            let languageIds = [];
            languageIds.push(languageId)
    
            const { data, errors } = await doUpdateRelation({
                variables: { userId: currentUserId, languageIds: languageIds, isActive: false }
            });

            if (data && data?.addOrUpdateLanguageForUser) {
                await fetchCurrentLanguages();
            }
            setChangesMade(true);
        } catch (e) {
            console.log(e);
        }
    }

    const handleSubmit = async () => {
        try {
            await doSaveProfile({
                variables: { input: {
                    userId: currentUserId, firstName: firstName, lastName: lastName, 
                    phoneNumber: phoneNumber, nativeLanguage: nativeLanguage, isCallable: isEnabled
                }}
            });

            if (addedLanguages.length > 0) {
                await doUpdateRelation({
                    variables: { userId: currentUserId, languageIds: addedLanguages, isActive: true }
                });
            }

            setChangesMade(false);
            closeModal();
        } catch (e) {
          console.log(e);
        }
    }

    const closeModal = () => {
        ADDED_LANGUAGES = [];
        setAddedLanguages(ADDED_LANGUAGES);
        setChangesMade(false);
        props.onCancel();
    }

    const loading = useMemo(() => {
        return saveProfileLoading;
    }, [saveProfileLoading]);
      

    return (
        <Modal visible={props.visible} animationType='slide'>
        {loading &&  <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
            
            <ScrollView style={styles.inputContainer}>
                
                <View style={styles.headerWrapper}>
                    {changesMade ? 
                        <TouchableOpacity onPress={handleSubmit}>
                            <Text style={styles.save}>save</Text>
                        </TouchableOpacity>
                    :
                        <Text style={styles.defaultSave}>save</Text>
                    }
                    <Text style={styles.title}>Edit Profile</Text>

                    <TouchableWithoutFeedback onPress={closeModal}>
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
                        <View >
                            {currentLanguages && currentLanguages.length > 0 ?
                                <View style={styles.overview}>
                                    {currentLanguages.map((lang: any) => { return (
                                        <TouchableOpacity key={lang.id}>
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
                                multipleText="%d languages have been selected"
                                defaultValue={'Select'}
                                placeholder="Select a language"
                                onChangeItem={item => languageChange(item)}
                                containerStyle={{height: 50, marginBottom: 350}}
                                dropDownStyle={{backgroundColor: '#FFFFFF'}}
                                itemStyle={{backgroundColor: '#FFFFFF', borderBottomColor: '#C4C4C4', borderBottomWidth: 1, paddingVertical:20}}
                                zIndex={5000}
                                arrowColor={'#7F7F7F'}
                                labelStyle={{color: '#7F7F7F', textTransform:'uppercase'}}
                                activeLabelStyle={{color: GigColors.Black}}
                                dropDownMaxHeight={600}
                                searchable={false}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
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
import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, TextInput, ActivityIndicator, Modal } from 'react-native';
import { GigColors } from '../../constants/colors';
import { NoDataText } from '../../components/Placeholder/NoDataText';
import DropDownPicker from 'react-native-dropdown-picker';
import { Skill } from '../../Gigs/Skill';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_LANGUAGES_FOR_USER, GET_ALL_AVAILABLE_LANGUAGES_FOR_USER, ADD_OR_UPDATE_LANGUAGE_FOR_USER } from '../../lib/language';
import { useSelector } from 'react-redux';
import { UPDATE_PROFILE } from '../../lib/user';
import { DefaultButton, DisabledDefaultButton } from '../../components/Button/DefaultButton';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

let ADDED_LANGUAGES: any[] = [];

export default function EditLanguages (props: any) {

    const currentUserId = useSelector((state: any) => state.user.userId);
    const user = props.user;

    const { data, loading: languageLoading, error, refetch } = useQuery(GET_ALL_LANGUAGES_FOR_USER , {variables: {query: {userId: user.id} }});  
    const { data: languageData, loading: availLanguageLoading, error: languageError, refetch: languageRefetch } = useQuery(GET_ALL_AVAILABLE_LANGUAGES_FOR_USER, {variables: {query: {userId: currentUserId } }});
    
    const [ nativeLanguage, setNativeLanguage ] = useState(user.nativeLanguage);
    const [ changesMade, setChangesMade ] = useState(false);
    const [ currentLanguages, setCurrentLanguages ] = useState();
    const [ addedLanguages, setAddedLanguages ] = useState();
    const [ languages, setLanguages ] = useState();
    const [ nativeLangChangeMade, setNativeLangChangeMade ] = useState(false);

    const [ doUpdateRelation, { loading: updateRelationLoading } ] = useMutation(ADD_OR_UPDATE_LANGUAGE_FOR_USER);
    const [ doSaveProfile, { loading: saveProfileLoading } ] = useMutation(UPDATE_PROFILE);

    useEffect(() => {
        fetchCurrentLanguages();
        fetchAvailableLanguages();
    }, [ currentLanguages, languages ])

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
    }, [ data, languageData ]);

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

    const loading = useMemo(() => {
        return saveProfileLoading || languageLoading || availLanguageLoading || updateRelationLoading;
    }, [ saveProfileLoading, languageLoading, availLanguageLoading,  updateRelationLoading ]);

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
            if (nativeLangChangeMade) {
                await doSaveProfile({
                    variables: { input: { nativeLanguage: nativeLanguage } }
                });
                setNativeLangChangeMade(false);
            }

            if (addedLanguages && addedLanguages.length > 0) {
                await doUpdateRelation({
                    variables: { userId: currentUserId, languageIds: addedLanguages, isActive: true }
                });
                ADDED_LANGUAGES = [];
                setAddedLanguages(ADDED_LANGUAGES);
            }
            closeModal();
        } catch (e) {
          console.log(e);
        }
    }

    const nativeLanguageChangeHandler = (nativeLanguage: string) => {
        setNativeLanguage(nativeLanguage);
        setNativeLangChangeMade(true);
        setChangesMade(true);
    }

    const languageChange = async (item: any) => {
        setAddedLanguages(item);
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
                    <Text style={styles.title}>Edit Languages</Text>
                    <TouchableWithoutFeedback onPress={closeModal}>
                        <Icon type='material' name='close' style={styles.icon} color={GigColors.Mustard} size={25}/>
                    </TouchableWithoutFeedback>
                </View> 

            <View  style={{marginHorizontal: 16}}>
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
                {loading && <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
                <View style={[styles.input, {marginTop: 20}]}>
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
                            containerStyle={{height: 50}}
                            dropDownStyle={{backgroundColor: GigColors.White}}
                            itemStyle={{backgroundColor: GigColors.White, paddingVertical:20}}
                            zIndex={5000}
                            arrowColor={GigColors.Taupe}
                            labelStyle={{color: GigColors.Blue, textTransform:'uppercase'}}
                            activeLabelStyle={{color: GigColors.Blue}}
                            dropDownMaxHeight={600}
                            searchable={false}
                        />
                    </View>
                </View>
            </View>
            </ScrollView>
            <View style={{paddingBottom: 50, backgroundColor: GigColors.Greyish, paddingHorizontal: 16}}>
                {changesMade ?
                    <DefaultButton title={'update languages'} onPress={handleSubmit} isConsumer={props.isConsumer}/>
                :
                    <DisabledDefaultButton title={'update languages'} isConsumer={props.isConsumer}/>
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
    },

});

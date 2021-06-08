import React, { useState, useMemo } from 'react';
import { View, Modal, TextInput, ActivityIndicator, TouchableWithoutFeedback, TouchableOpacity, Switch, Platform } from 'react-native';
import { StyleSheet, Text } from "react-native";
import { GigColors } from '../../constants/colors';
import { useMutation } from '@apollo/client';
import { Icon, Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { UPDATE_PROFILE } from '../../lib/user';
import { ScrollView } from 'react-native-gesture-handler';
import { DefaultButton, DisabledDefaultButton } from '../../components/Button/DefaultButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';


export function EditProfile (props: any) {

    const user  = props.user;

    const currentUserId = useSelector((state: any) => state.user.userId);

    const [ doSaveProfile, { loading: saveProfileLoading } ] = useMutation(UPDATE_PROFILE);
        
    const [ firstName, setFirstName ] = useState(user.firstName);
    
    const [ lastName, setLastName ] = useState(user.lastName);
    
    const [ email, setEmail ] = useState(user.email);
    
    const [ birthday, setBirthday ] = useState(user.birthday);
    
    const [ phoneNumber, setPhoneNumber ] = useState(user.phoneNumber);
    
    const [ changesMade, setChangesMade ] = useState(false);

    const [ isEnabled, setIsEnabled ] = useState(user.isCallable);

    const [mode, setMode] = useState();
    
    const [show, setShow] = useState(false);
    
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

    const emailChangeHandler = (email: string) => {
        setEmail(email);
        setChangesMade(true);
    }

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || birthday;
        setShow(Platform.OS === 'ios');
        setBirthday(currentDate);
        setShow(false)
    };
    
    const showMode = (currentMode: string ) => {
        setShow(true);
        setMode(currentMode);
    };
    
    const showDatepicker = () => {
        showMode('date');
    };

    const handleSubmit = async () => {
        try {
            await doSaveProfile({
                variables: { input: {
                    userId: currentUserId, firstName: firstName, lastName: lastName, 
                    phoneNumber: phoneNumber, isCallable: isEnabled
                }}
            });
            setChangesMade(false);
            closeModal();
        } catch (e) {
          console.log(e);
        }
    }

    const closeModal = () => {
        setChangesMade(false);
        props.onCancel();
    }

    const loading = useMemo(() => {
        return saveProfileLoading;
    }, [ saveProfileLoading ]);
      

    return (
        <Modal visible={props.visible} animationType='slide'>
        {loading &&  <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
            
            <ScrollView style={styles.inputContainer}>
                
                <View style={styles.headerWrapper}>
                    <View></View>
                    <Text style={styles.title}>Edit Profile</Text>

                    <TouchableWithoutFeedback onPress={closeModal}>
                        <Icon type='material' name='close' style={styles.icon} color={GigColors.Mustard} size={25}/>
                    </TouchableWithoutFeedback>

                </View>

                <View style={styles.container}>
                    <View style={styles.avatarWrapper} >
                        <Avatar containerStyle={styles.avatar} size={90} title={props.initials}/>
                        <TouchableOpacity>
                            <Icon type='material' name='edit' color={GigColors.Blue}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'space-around',}}>
                        <View style={[styles.input, {width: '48%'}]}>
                            <Text style={styles.inputLabel}>first name</Text>
                            <TextInput
                                placeholder={"Type here..."}
                                style={styles.textInput}
                                value={firstName}
                                onChangeText={firstNameChangeHandler}
                                keyboardType={'default'}
                            />
                        </View>
                        <View style={[styles.input, {width: '48%'}]}>
                            <Text style={styles.inputLabel}>last name</Text>
                            <TextInput
                                placeholder={"Type here..."}
                                style={styles.textInput}
                                value={lastName}
                                onChangeText={lastNameChangeHandler}
                                keyboardType={'default'}
                            />
                        </View>

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
                        <Text style={styles.inputLabel}>email</Text>
                        <TextInput
                            placeholder={"Type here..."}
                            style={styles.textInput}
                            value={email}
                            onChangeText={emailChangeHandler}
                            keyboardType={'default'}
                        />
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>birthday</Text>
                        <TouchableWithoutFeedback onPress={showDatepicker} >
                            <Text style={styles.datePicker}>{moment(birthday).format('LL')}</Text>
                        </TouchableWithoutFeedback >
                    </View>
                    {show && (
                        <DateTimePicker
                            value={birthday}
                            testID="dateTimePicker"
                            onChange={onChange}
                            mode={mode}
                            display={'spinner'}
                        /> 
                    )}
                    <View style={[styles.input, {marginBottom: 150}]}>
                        <Text style={styles.inputLabel}>Receive Calls?</Text>
                        <Switch
                            trackColor={{ false: GigColors.White, true: GigColors.Mustard }}
                            thumbColor={isEnabled ? GigColors.White : GigColors.Mustard}
                            ios_backgroundColor={GigColors.White}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                    
                    {changesMade ?
                        <DefaultButton title={'update profile'} onPress={handleSubmit} isConsumer={props.isConsumer}/>
                    :
                        <DisabledDefaultButton title={'update profile'} isConsumer={props.isConsumer}/>
                    }
                    
                </View>
            </ScrollView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        marginTop: 60, 
        backgroundColor: GigColors.Greyish
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
        marginVertical: 25
    },
    title: {
        fontWeight: '600',
        color: GigColors.Blue,
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
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    avatar: {
        backgroundColor: GigColors.Taupe, 
        borderRadius: 50,
    },
    inputLabel: {
        textTransform: 'uppercase',
        fontWeight: '500',
        marginBottom: 5,
        fontSize: 12, 
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
    smallSubheader: {
        color: GigColors.DarkGrey,
        fontSize: 14
    },
    datePicker:{
        paddingHorizontal: 10,
        paddingVertical: 15,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 10,
        color: GigColors.Blue,
        backgroundColor: GigColors.White
    }
 });
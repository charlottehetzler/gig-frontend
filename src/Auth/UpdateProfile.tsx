import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { UserSignUp } from '../redux/middlewares/user';
import { Text, Icon } from 'react-native-elements';
import { StyleSheet, View, TouchableOpacity, StatusBar, ScrollView, TextInput, Platform, ActivityIndicator, TouchableWithoutFeedback, ViewPropTypes, Dimensions, Pressable } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { GigColors } from '../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';


function UpdateProfileScreen(props: any) {
    const [firstName, setFirstName] = useState('');

    const [lastName, setLastName] = useState('');



    const [nativeLanguage, setNativeLanguage] = useState('');

    const [isFirstValid, setIsFirstValid] = useState(false);

    const [isLastValid, setIsLastValid] = useState(false);

    const [isBirthdayValid, setIsBirthdayValid] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');

    const [mode, setMode] = useState<any>('');

    const [show, setShow] = useState(false);


    const { email, password } = props.route.params;


    let year = new Date().setFullYear(new Date().getFullYear() - 18);
    let month = new Date(year).setMonth(11);
    let date = new Date(month).setDate(31);
    const [birthday, setBirthday] = useState<any>(date);

    const signUpLoader = useSelector((state: any) => state.user.signUpLoader);
    const selectedUserRole = useSelector((state: any) => state.user.selected_user_role);

    const showMode = (currentMode: string) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const firstNameChange = (val: string) => {
        if (val.trim().length > 2) {
            setFirstName(val);
            setIsFirstValid(true);
        } else {
            setFirstName(val);
            setIsFirstValid(false);
        }
    }

    const lastNameChange = (val: string) => {
        if (val.trim().length > 2) {
            setLastName(val);
            setIsLastValid(true);
        } else {
            setLastName(val);
            setIsLastValid(false);
        }
    }
    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || birthday;
        setShow(Platform.OS === 'ios');
        setBirthday(currentDate);
        setShow(false)
    };

    const phoneChangeHandler = (phoneNumber: string) => {
        setPhoneNumber(phoneNumber);
    }

    const nativeLanguageChangeHandler = (nativeLanguage: string) => {
        setNativeLanguage(nativeLanguage);
    }

    const handleSignup = async () => {
        const user = {
            firstName,
            lastName,
            birthday,
            nativeLanguage,
            phoneNumber,
            role: selectedUserRole
        }
        props.UserSignUpAction(email, password, user)

    }
    const isValid = () => {
        return firstName && lastName && birthday && phoneNumber && nativeLanguage && selectedUserRole;
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={GigColors.White} barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.textHeader}>Create Profile</Text>
            </View>

            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <ScrollView>
                    <Text style={styles.textFooter}>First Name</Text>
                    <View style={styles.action}>
                        <Icon name="person" color={GigColors.Blue} size={20} />
                        <TextInput
                            placeholder="Your first name"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => firstNameChange(val)}
                        />
                        {isFirstValid ?
                            <Animatable.View animation="bounceIn">
                                <Feather name="check-circle" color="green" size={20} />
                            </Animatable.View>
                            : null}
                    </View>
                    <Text style={[styles.textFooter, { marginTop: 20 }]}>Last Name</Text>
                    <View style={styles.action}>
                        <Icon name="person" color={GigColors.Blue} size={20} />
                        <TextInput
                            placeholder="Your last name"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => lastNameChange(val)}
                        />
                        {isLastValid ?
                            <Animatable.View animation="bounceIn">
                                <Feather name="check-circle" color="green" size={20} />
                            </Animatable.View>
                            : null}
                    </View>

                    <Text style={[styles.textFooter, { marginTop: 20 }]}>Birthday</Text>
                    <View >
                        <TouchableWithoutFeedback onPress={showDatepicker}>
                            <View style={styles.action}>
                                <Icon name="event" color={GigColors.Blue} size={20} />
                                <Text style={styles.textInput}>{moment(birthday).format('LL')}</Text>
                            </View>
                        </TouchableWithoutFeedback >
                    </View>
                    {show && (
                        <DateTimePicker
                            value={birthday}
                            testID="dateTimePicker"
                            onChange={onChange}
                            mode={mode}
                            display={'spinner'}
                            maximumDate={new Date(date)}
                        />
                    )}
                    <Text style={[styles.textFooter, { marginTop: 20 }]}>phone number</Text>
                    <View style={styles.action}>
                        <Icon name="call" color={GigColors.Blue} size={20} />
                        <TextInput
                            placeholder={"Type here..."}
                            style={styles.textInput}
                            value={phoneNumber}
                            onChangeText={phoneChangeHandler}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <Text style={[styles.textFooter, { marginTop: 20 }]}>native language</Text>
                    <View style={styles.action}>
                        <Icon name="language" color={GigColors.Blue} size={20} />
                        <TextInput
                            placeholder={"Type here..."}
                            style={styles.textInput}
                            value={nativeLanguage}
                            onChangeText={nativeLanguageChangeHandler}
                            keyboardType={'default'}
                        />
                    </View>

                    <Text style={[styles.textFooter, { marginTop: 20 }]}>select role</Text>
                    <View style={styles.action}>
                        <Icon name="users" type="feather" color={GigColors.Blue} size={20} />
                        <Pressable style={styles.textInput} onPress={() => props.navigation.navigate('Decision', { isSignUp: true })}>
                            <Text style={{ textTransform: 'capitalize' }}>{selectedUserRole || 'Please select'}</Text>
                        </Pressable>
                    </View>

                    <View style={styles.button}>
                        {isValid() ?
                            signUpLoader === true ?
                                <ActivityIndicator size={35} color={GigColors.Blue} />
                                :
                                <TouchableOpacity
                                    style={[styles.signIn, { backgroundColor: GigColors.Blue }]} onPress={handleSignup}
                                >
                                    <Text style={[styles.textSign, { color: GigColors.White }]}>Sign Up</Text>
                                </TouchableOpacity>
                            :
                            <View style={[styles.signIn, { backgroundColor: GigColors.Taupe }]} >
                                <Text style={[styles.textSign, { color: GigColors.White }]}>Sign Up</Text>
                            </View>
                        }
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GigColors.White
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 40
    },
    footer: {
        flex: 5,
        backgroundColor: GigColors.Greyish,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    textHeader: {
        color: GigColors.Blue,
        fontWeight: 'bold',
        fontSize: 30
    },
    textFooter: {
        textTransform: 'uppercase',
        fontWeight: '500',
        marginBottom: 5,
        fontSize: 12,
        color: GigColors.Blue
    },
    action: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height / 16
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#05375a',

    },
    button: {
        alignItems: 'center',
        marginTop: 25
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 40
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    icon: {
        alignItems: 'flex-end',
        marginRight: 20
    },
    datePicker: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 10,
        color: GigColors.Blue,
        backgroundColor: GigColors.White
    }
});

function mapDispatchToProps(dispatch: any) {
    return ({
        UserSignUpAction: (email: any, password: any, user: any) => { dispatch(UserSignUp(email, password, user)) },

    })
}
export default connect(null, mapDispatchToProps)(UpdateProfileScreen);
import React, { useState, useEffect } from 'react';
import { Text, Icon } from 'react-native-elements';
import { StyleSheet, View, TouchableOpacity, StatusBar, ScrollView, TextInput, Platform, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { GigColors } from '../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../lib/user';
import { useDispatch } from 'react-redux';
import { saveUserDataToStorage, AUTHENTICATE } from '../redux/actions/user'


export default function SignupScreen ( props  : any ) {
    const [firstName, setFirstName] = useState('');

    const [lastName, setLastName] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [isFirstValid, setIsFirstValid] = useState(false);
    
    const [isLastValid, setIsLastValid] = useState(false);
    
    const [isEmailValid, setIsEmailValid] = useState(false);
    
    const [isValidPassword, setIsValidPassword] = useState(true);

    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);
    
    const [ doUserSignup, { loading: userSignupLoading } ] = useMutation(SIGNUP_USER);

    const dispatch = useDispatch();

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

    const EmailChange = (val: string) => {
        if (val.trim().length) {
            setEmail(val);
            setIsEmailValid(true);
        } else {
            setEmail(val);
            setIsEmailValid(false);
        }
    }

    const handlePasswordChange = (val: string) => {
        if (val.trim().length > 6) {
            setPassword(val);
        } else {
            setPassword(val);
        }
    }

    const handleConfirmPasswordChange = (val: string) => {
        if (val === password) {
            setPasswordConfirm(val)
            setIsValidPassword(true)
        } else {
            setPasswordConfirm(val)
            setIsValidPassword(false)
        }
    }

    const handleValidEmail = (val: string) => {
        if (validateEmail(val)) {
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
        }
    }

    const validateEmail = (val: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const updateSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry)
    }

    const updateConfirmSecureTextEntry = () => {
        setConfirmSecureTextEntry(confirmSecureTextEntry)
    }
    
    const handleSignup = async () => {
        try {
            const { data, errors } = await doUserSignup({
                variables: { input: {
                    firstName: firstName, lastName: lastName, email: email, password: password
                }}
            });
            if (data.userSignup) {
                dispatch({
                    type: AUTHENTICATE, 
                    token: data.userSignup.token, 
                    userId: data.userSignup.userId, 
                    isLoggedIn: true,
                    firstName: data.userSignup.firstName, 
                    lastName: data.userSignup.lastName,
                    userType: ''
                });
                saveUserDataToStorage(data.userSignup.userId,data.userSignup.token)
                props.navigation.navigate('Decision');
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#FF6347' barStyle="light-content"/>
            <View style={{marginTop: 60}}>
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('HomeScreen')}>
                    <Icon type='material' name='close' style={styles.icon} size={35} color={GigColors.White}/>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.header}>
                <Text style={styles.text_header}>Register Now for Gig!</Text>
            </View>
            {userSignupLoading && <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <ScrollView>
                <Text style={styles.text_footer}>First Name</Text>
                <View style={styles.action}>
                    <Icon name="person" color={GigColors.Black} size={20}/>
                    <TextInput 
                        placeholder="Your first name"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => firstNameChange(val)}
                    />
                    {isFirstValid ? 
                        <Animatable.View animation="bounceIn">
                            <Feather name="check-circle" color="green" size={20}/>
                        </Animatable.View>
                    : null}
                </View>
                <Text style={[styles.text_footer, {marginTop: 35}]}>Last Name</Text>
                <View style={styles.action}>
                    <Icon name="person" color={GigColors.Black} size={20}/>
                    <TextInput 
                        placeholder="Your last name"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => lastNameChange(val)}
                    />
                    {isLastValid ? 
                        <Animatable.View animation="bounceIn">
                            <Feather name="check-circle" color="green" size={20}/>
                        </Animatable.View>
                    : null}
                </View>
                <Text style={[styles.text_footer, {marginTop: 35}]}>Email</Text>
                <View style={styles.action}>
                    <Icon name="person" color={GigColors.Black} size={20}/>
                    <TextInput 
                        placeholder="Your Email"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => EmailChange(val)}
                        onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
                    />
                    {isEmailValid ? 
                        <Animatable.View animation="bounceIn">
                            <Feather name="check-circle" color="green" size={20}/>
                        </Animatable.View>
                    : 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Not a valid email.</Text>
                    </Animatable.View>
                    }
                </View>

                <Text style={[styles.text_footer, {marginTop: 35}]}>Password</Text>
                <View style={styles.action}>
                    <Feather name="lock" color="#05375a" size={20}/>
                    <TextInput 
                        placeholder="Your Password"
                        secureTextEntry={secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) =>  handlePasswordChange(val)}
                    />
                    <TouchableOpacity onPress={() => updateSecureTextEntry}>
                    {secureTextEntry ? 
                        <Feather  name="eye-off" color="grey" size={20}/>
                    :
                        <Feather name="eye" color="grey" size={20}/>
                    }
                    </TouchableOpacity>
                </View>

                <Text style={[styles.text_footer, {marginTop: 35}]}>Confirm Password</Text>
                <View style={styles.action}>
                    <Feather name="lock" color="#05375a" size={20}/>
                    <TextInput 
                        placeholder="Confirm Your Password"
                        secureTextEntry={confirmSecureTextEntry}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handleConfirmPasswordChange(val)}
                    />
                    <TouchableOpacity onPress={() => updateConfirmSecureTextEntry}>
                    {confirmSecureTextEntry ? 
                        <Feather name="eye-off"color="grey"size={20}/>
                    :
                        <Feather name="eye"color="grey"size={20}/>
                    }
                    </TouchableOpacity>
                </View>
                <View style={styles.textPrivate}>
                    <Text style={styles.color_textPrivate}>By signing up you agree to our</Text>
                    <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                    <Text style={styles.color_textPrivate}>{" "}and</Text>
                    <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={handleSignup}>
                        <Text style={[styles.textSign, {color: GigColors.Black}]}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Login')} >
                        <Text style={[{color: '#FF6347'}]}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Animatable.View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: GigColors.DarkGrey
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
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
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }, 
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    icon: {
        alignItems:'flex-end',
        marginRight: 20
    },
  });
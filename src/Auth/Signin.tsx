import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, StyleSheet, StatusBar, Alert, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { GigColors } from '../constants/colors';
import { Icon } from 'react-native-elements';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../lib/user';
import { useAuthCookies } from '../lib/cookies';
import { saveUserDataToStorage, AUTHENTICATE } from '../redux/actions/user';
import { useDispatch } from 'react-redux';

export default function SigninScreen (props: any ) {

    const [ doUserLogin, { loading: userLoginLoading } ] = useMutation(LOGIN_USER);

    const { setAuthCookies } = useAuthCookies();
    
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [isEmailValid, setIsEmailValid] = useState(true);

    const [secureTextEntry, setSecureTextEntry] = useState(true);
        
    const [isValidPassword, setIsValidPassword] = useState(true);
    
    const [loginError, setLoginError] = useState();
    
    const [errorMessage, setErrorMessage] = useState();

    const dispatch = useDispatch();

    const updateSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry)
    }

    const validateEmail = (val: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    
    const emailChange = (val: string) => {
        if (val.trim().length > 4) {
            setEmail(val);
            setIsEmailValid(true);
        } else {
            setEmail(val);
            setIsEmailValid(false);
        }
    }
    
    const handleValidEmail = (val: string) => {
        if (validateEmail(val)) {
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
        }
    }
    
    const handleLogin = async () => {
        try {
            const { data, errors } = await doUserLogin({
                variables: { input: { email: email, password: password}}
            });

            if (data.userLogin) {
                dispatch({
                    type: AUTHENTICATE, 
                    token: data.userLogin.token, 
                    userId: data.userLogin.userId, 
                    isLoggedIn: true,
                    firstName: data.userLogin.firstName, 
                    lastName: data.userLogin.lastName,
                    userType: data.userLogin.isConsumer ? "consumer" : "producer"
                });
                saveUserDataToStorage(data.userLogin.userId,data.userLogin.token, data.userLogin.userType)
                props.navigation.navigate('HomeScreen');
            }
        } catch (error) {
            setLoginError(error)
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={GigColors.White} barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Welcome back!</Text>
            </View>

            {userLoginLoading && <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
            
            <Animatable.View animation="fadeInUpBig" style={[styles.footer, {backgroundColor: GigColors.Greyish}]}>
                <Text style={styles.textFooter}>Email</Text>
                <View style={styles.action}>
                    <Icon 
                        name="person"
                        type='material'
                        color={GigColors.Blue}
                        size={24}
                    />
                    <TextInput 
                        placeholder="Your Email"
                        placeholderTextColor={GigColors.Taupe}
                        style={[styles.textInput, {color: GigColors.Blue}]}
                        autoCapitalize="none"
                        onChangeText={(val) => emailChange(val)}
                        onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
                    />

                {/* { isEmailValid ? null : 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Not a valid email.</Text>
                    </Animatable.View>
                } */}
                </View>
            
                <Text style={styles.textFooter}>Password</Text>
                <View style={styles.action}>
                    <Icon name="lock" color={GigColors.Blue} size={24} type='material'/>
                    <TextInput 
                        placeholder="Your Password"
                        placeholderTextColor={GigColors.Taupe}
                        secureTextEntry={secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => setPassword(val)}
                    />

                    <TouchableOpacity onPress={() => updateSecureTextEntry()}>
                    {secureTextEntry ? 
                        <Feather name="eye-off" color={GigColors.Taupe} size={20}/>
                    :
                        <Feather name="eye" color={GigColors.Taupe} size={20}/>
                    }
                    </TouchableOpacity>
                </View>
                    {loginError &&
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Invalid email or password.</Text>
                        </Animatable.View>
                    }
                
                <TouchableOpacity>
                    <Text style={{color: GigColors.DarkGrey, marginTop:15 }}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity 
                        style={[styles.signIn, {backgroundColor: GigColors.Blue}]} 
                        onPress={handleLogin}
                    >
                        <Text style={[styles.textSign, { color: GigColors.White}]}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Signup')}
                        style={[styles.signIn, { backgroundColor: GigColors.White, borderWidth: 1, borderColor: GigColors.Blue, marginTop: 15}]}>
                        <Text style={[styles.textSign, { color: GigColors.Blue}]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};


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
        flex: 3,
        backgroundColor: GigColors.White,
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
        color: GigColors.Blue,
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: GigColors.Greyish,
        paddingBottom: 25
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: GigColors.Blue,
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
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
    icon: {
        alignItems:'flex-end',
        marginRight: 20
    },
  });
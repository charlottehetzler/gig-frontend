import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, StyleSheet, StatusBar, Alert, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';
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
    
    const handlePasswordChange = (val: string) => {
        if (val.trim().length > 6) {
            setPassword(val);
            setIsValidPassword(true)
        } else {
            setPassword(val);
            setIsValidPassword(false)
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
                    userType: ''
                });
                saveUserDataToStorage(data.userLogin.userId,data.userLogin.token)
                props.navigation.navigate('Home');
            }
            if (errors) {
                setLoginError(errors)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#FF6347' barStyle="light-content"/>
            <View style={{marginTop: 60}}>
                <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
                    <Icon type='material' name='close' style={styles.icon} size={35} color={GigColors.White}/>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome to Gig!</Text>
            </View>
            {userLoginLoading && <ActivityIndicator size="small" color="#0000ff" style={{alignItems:'center', justifyContent:'center'}}/>}
            <Animatable.View animation="fadeInUpBig" style={[styles.footer, {backgroundColor: colors.background}]}>
                <Text style={[styles.text_footer, { color: colors.text}]}>Email</Text>
                <View style={styles.action}>
                    <Icon 
                        name="person"
                        type='material'
                        color={GigColors.Black}
                        size={24}
                    />
                    <TextInput 
                        placeholder="Your Email"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {color: GigColors.Black}]}
                        autoCapitalize="none"
                        onChangeText={(val) => emailChange(val)}
                        onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
                    />
                    {emailChange ? 
                        <Animatable.View animation="bounceIn">
                            <Feather name="check-circle" color="green" size={20} />
                        </Animatable.View>
                    : null}
                </View>
                { isEmailValid ? null : 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Not a valid email.</Text>
                    </Animatable.View>
                }
            
                <Text style={[styles.text_footer, { color: GigColors.Black, marginTop: 35}]}>Password</Text>
                <View style={styles.action}>
                    <Icon name="lock" color={GigColors.Black} size={24} type='material'/>
                    <TextInput 
                        placeholder="Your Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={secureTextEntry ? true : false}
                        style={[styles.textInput, { color: GigColors.Black}]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity>
                    {secureTextEntry ? 
                        <Feather name="eye-off" color="grey" size={20}/>
                    :
                    <Feather name="eye" color="grey" size={20}/>
                    }
                    </TouchableOpacity>
                </View>
                {isValidPassword ? null : 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                    </Animatable.View>
                }
                
                <TouchableOpacity>
                    <Text style={{color: GigColors.DarkGrey, marginTop:15 }}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={handleLogin}>
                        <Text style={[styles.textSign, {color: GigColors.Black}]}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Signup')}
                        style={[styles.signIn, { borderColor: '#FF6347', borderWidth: 1, marginTop: 15}]}>
                        <Text style={[styles.textSign, { color: '#FF6347'}]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};


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
        flex: 3,
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
        color: '#05375a',
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
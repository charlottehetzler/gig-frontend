import React, { useState, useEffect } from 'react';
import { Text, Icon } from 'react-native-elements';
import { StyleSheet, View, TouchableOpacity, StatusBar, ScrollView, TextInput, Platform, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { GigColors } from '../constants/colors';
import Feather from 'react-native-vector-icons/Feather';

export default function SignupScreen ( props  : any ) {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [passwordConfirm, setPasswordConfirm] = useState('');
    
    const [isEmailValid, setIsEmailValid] = useState(false);
    
    const [isValidPassword, setIsValidPassword] = useState(false);

    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);
    

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

    const isValid = () => {
        return isEmailValid && isValidPassword;
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={GigColors.White} barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Signup now!</Text>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <ScrollView>
                    <Text style={[styles.textFooter, {marginTop: 20}]}>Email</Text>
                    <View style={styles.action}>
                        <Icon name="person" color={GigColors.Black} size={20}/>
                        <TextInput 
                            placeholder="Your Email"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => EmailChange(val)}
                            onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
                        />
                        {isEmailValid ? null : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Not a valid email.</Text>
                        </Animatable.View>
                        }
                    </View>

                    <Text style={[styles.textFooter, {marginTop: 20}]}>Password</Text>
                    <View style={styles.action}>
                        <Feather name="lock" color="#05375a" size={20}/>
                        <TextInput 
                            placeholder="Your Password"
                            secureTextEntry={secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)}
                        />
                        <TouchableOpacity onPress={() => updateSecureTextEntry}>
                        {secureTextEntry ? 
                            <Feather  name="eye-off" color="grey" size={20}/>
                        :
                            <Feather name="eye" color="grey" size={20}/>
                        }
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.textFooter, {marginTop: 20}]}>Confirm Password</Text>
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
                        {isValid() ? 
                            <TouchableOpacity 
                                style={[styles.signIn, {backgroundColor: GigColors.Blue}]} 
                                onPress={() => props.navigation.navigate('ProfileCreation', {email: email, password: password})}
                            >
                                <Text style={[styles.textSign, {color: GigColors.White}]}>Sign Up</Text>
                            </TouchableOpacity>
                        : 
                            <View style={[styles.signIn, {backgroundColor: GigColors.Taupe}]} >
                                <Text style={[styles.textSign, {color: GigColors.White}]}>Sign Up</Text>
                            </View>
                        }

                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('Login')}
                            style={[styles.signIn, { backgroundColor: GigColors.White, borderWidth: 1, borderColor: GigColors.Blue, marginTop: 15}]}>
                            <Text style={[styles.textSign, { color: GigColors.Blue}]}>Sign In</Text>
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
        alignItems:'flex-end',
        marginRight: 20
    },
  });
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, StyleSheet, StatusBar, ActivityIndicator, Dimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';

import { GigColors } from '../constants/colors';
import { Icon } from 'react-native-elements';
import { connect, useSelector } from 'react-redux';
import { UserSignIn } from '../redux/middlewares/user';

function SigninScreen(props: any) {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [isEmailValid, setIsEmailValid] = useState(false);

    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const [isValidPassword, setIsValidPassword] = useState(false);

    const [loginError, setLoginError] = useState();

    const [errorMessage, setErrorMessage] = useState();
    const signInLoader = useSelector((state: any) => state.user.signInLoader);

    const updateSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry)
    }

    const validateEmail = (val: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const emailChange = (val: string) => {
        if (val.trim().length) {
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
        if (val.length >= 6) {
            setPassword(val)
            setIsValidPassword(true)
        } else {
            setPassword(val)
            setIsValidPassword(false)
        }
    }
    const handleLogin = () => {
        props.UserSignInAction(email, password)
    }
    const isValid = () => {
        return isEmailValid && isValidPassword;
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={GigColors.White} barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.textHeader}>Welcome back!</Text>
            </View>

            <Animatable.View animation="fadeInUpBig" style={[styles.footer, { backgroundColor: GigColors.Greyish }]}>
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
                        style={[styles.textInput, { color: GigColors.Blue }]}
                        autoCapitalize="none"
                        onChangeText={(val) => emailChange(val)}
                        onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
                    />

                    {isEmailValid ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Not a valid email.</Text>
                        </Animatable.View>
                    }
                </View>

                <Text style={styles.textFooter}>Password</Text>
                <View style={styles.action}>
                    <Icon name="lock" color={GigColors.Blue} size={24} type='material' />
                    <TextInput
                        placeholder="Your Password"
                        placeholderTextColor={GigColors.Taupe}
                        secureTextEntry={secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />

                    <TouchableOpacity onPress={() => updateSecureTextEntry()}>
                        {secureTextEntry ?
                            <Feather name="eye-off" color={GigColors.Taupe} size={20} />
                            :
                            <Feather name="eye" color={GigColors.Taupe} size={20} />
                        }
                    </TouchableOpacity>
                </View>
                {loginError &&
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Invalid email or password.</Text>
                    </Animatable.View>
                }

                <TouchableOpacity>
                    <Text style={{ color: GigColors.DarkGrey, marginTop: 15 }}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={styles.button}>


                    {isValid() ?
                        signInLoader === true ?
                            <ActivityIndicator size={35} color={GigColors.Blue} />
                            :
                            <TouchableOpacity
                                style={[styles.signIn, { backgroundColor: GigColors.Blue }]}
                                onPress={handleLogin}
                            >
                                <Text style={[styles.textSign, { color: GigColors.White }]}>Sign In</Text>
                            </TouchableOpacity>
                        :
                        <View style={[styles.signIn, { backgroundColor: GigColors.Taupe }]} >
                            <Text style={[styles.textSign, { color: GigColors.White }]}>Sign In</Text>
                        </View>
                    }

                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Signup')}
                        style={[styles.signIn, { backgroundColor: GigColors.White, borderWidth: 1, borderColor: GigColors.Blue, marginTop: 15 }]}>
                        <Text style={[styles.textSign, { color: GigColors.Blue }]}>Sign Up</Text>
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
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
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
        alignItems: 'flex-end',
        marginRight: 20
    },
});
function mapDispatchToProps(dispatch: any) {
    return ({
        UserSignInAction: (email: string, password: string) => { dispatch(UserSignIn(email, password)) },

    })
}
export default connect(null, mapDispatchToProps)(SigninScreen);
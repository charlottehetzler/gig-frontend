import {AsyncStorage} from 'react-native'

export const USER = '[USER]'
export const AUTHENTICATE = 'AUTHENTICATE';
export const USER_SIGNUP = 'USER_SIGNUP';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_UPDATE = 'USER_UPDATE';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

export const setDidTryAL = () => {
    return { type: SET_DID_TRY_AL };
  };

export const authenticate = (userId: number, isLoggedIn: boolean, userType: any) => ({
    type: AUTHENTICATE,
    payload: {
        userId,
        isLoggedIn,
        // firstName, 
        // lastName,
        userType
    },
});

export const userUpdate = (userId: number, isLoggedIn: boolean, userType: any) => ({
    type: USER_UPDATE,
    payload: {
        userId,
        isLoggedIn,
        // firstName,
        // lastName,
        userType
    },
});

export const userLogout = () => {
    AsyncStorage.removeItem('userData');
    return { type: USER_LOGOUT };
};

export const saveUserDataToStorage = (userId: number, token: string, userType: string) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        userType: userType
    }));
} 
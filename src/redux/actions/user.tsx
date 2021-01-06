import {AsyncStorage} from 'react-native'

export const USER = '[USER]'
export const AUTHENTICATE = 'AUTHENTICATE'
export const USER_SIGNUP = 'USER_SIGNUP'
export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_UPDATE = 'USER_UPDATE'

export const authenticate = (userId: number, isLoggedIn: boolean, firstName: string, lastName: string, userType: any) => ({
    type: AUTHENTICATE,
    payload: {
        userId,
        isLoggedIn,
        firstName, 
        lastName,
        userType
    },
});

export const userUpdate = (userId: number, isLoggedIn: boolean, firstName: string, lastName: string, userType: any) => ({
    type: USER_UPDATE,
    payload: {
        userId,
        isLoggedIn,
        firstName,
        lastName,
        userType
    },
});

export const userLogout = () => ({
    type: USER_LOGOUT,
    payload: {},
})

export const saveUserDataToStorage = (userId:number, token:string) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId
    }));
} 
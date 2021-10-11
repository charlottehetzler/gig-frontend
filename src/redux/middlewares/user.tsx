import firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActionTypes } from '../actions/user';
let auth = firebase.auth();
let database = firebase.firestore();

async function StoreData(data: any) {
    try {
        await AsyncStorage.setItem('store',
            JSON.stringify({
                'data': {
                    store: data,
                    isLoggedIn: true
                }
            })
        );
    } catch (error) {
        // Error saving data
        console.log('Cant store data in AsyncStorage: ', error)
    }
};

export const RetrieveDataAssyncStorage = () => async (dispatch: any) => {
    const response = await AsyncStorage.getItem('store');
    if (response !== null) {

        setTimeout(() => {
            dispatch({ type: ActionTypes.GET_DATA_FROM_ASYNCSTORAGE, payload: JSON.parse(response) })
        });

    }
}
export function ResetStoredData() {
    return (dispatch: any) => {
        dispatch({
            type: ActionTypes.USER_LOGOUT, payload: {
                'data': {
                    store: {},
                    isLoggedIn: false
                }
            }
        })

    }
}

export function UserSignUp(email: string, password: string, userDetails: any) {
    return (dispatch: any) => {
        dispatch({ type: ActionTypes.USER_SIGN_UP, payload: { signupLoader: true, userUID: '' } })
        auth.createUserWithEmailAndPassword(email, password).then((userCredential: any) => {
            const user = userCredential.user;
            dispatch(SetUserDetails(user.uid, userDetails))
        }).catch((error: any) => {
            dispatch({ type: ActionTypes.USER_SIGN_UP, payload: { signupLoader: false, userUID: '' } })

            alert(error.message)
        })


    }
}
export function SetUserDetails(userUID: string, userDetails: any) {
    return (dispatch: any) => {
        const user = Object.assign({}, userDetails, { uid: userUID })
        database.collection('users').doc(userUID).set(user)
            .then(() => {
                dispatch(GetUserDetails(userUID))
                dispatch({ type: ActionTypes.USER_SIGN_UP, payload: { signupLoader: false, userUID: userUID } })
            })
            .catch((error) => {
                console.log(error);
            });

    }
}

export function SetUserRole(role: string, userUID: string) {
    return (dispatch: any) => {
        database.collection('users').doc(userUID).update({
            role
        }).then(() => {
            dispatch({ type: ActionTypes.SET_USER_ROLE, payload: role })
            dispatch(GetUserDetails(userUID));
        }).catch(error => {
            console.log(error);

        })
    }
}

export function GetUserDetails(userUID: string) {
    return (dispatch: any) => {
        const userRef = database.collection('users').doc(userUID);
        userRef.get().then((doc) => {
            if (doc.exists) {
                StoreData(doc.data())
            }
        }).catch((error) => {
            console.log(error);
        });

    }
}


export function LogOut() {
    return (dispatch: any) => {
        auth.signOut().then(() => {
            AsyncStorage.clear().then(() => {
                dispatch(ResetStoredData());
            })
        })

    }
}

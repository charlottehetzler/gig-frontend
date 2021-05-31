import {USER_SIGNUP, USER_LOGOUT, USER_UPDATE, AUTHENTICATE } from '../actions/user'

export const initialState = {
  token: '',
  userId: 4,
  isLoggedIn: true,
  firstName: 'Guest',
  lastName: 'User',
  userType: 'consumer'
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE: {
      return {
        ...state,
        isLoggedIn: true, 
        token: action.token,
        userId: action.userId,
        firstName: action.firstName, 
        lastName: action.lastName,
        userType: action.userType
      }
    }
    case USER_UPDATE: {
      return {
        ...state,
        isLoggedIn: true, 
        token: action.token,
        userId: action.userId,
        firstName: action.firstName, 
        lastName: action.lastName, 
        userType: action.userType
      }
    }
    case USER_LOGOUT: {
      return {
        ...state,
        isLoggedIn: false
      }
    }
    default: { return state }
  }
} 
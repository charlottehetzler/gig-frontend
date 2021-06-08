import {USER_SIGNUP, USER_LOGOUT, USER_UPDATE, AUTHENTICATE, SET_DID_TRY_AL } from '../actions/user'

export const initialState = {
  token: null,
  userId: null,
  isLoggedIn: false,
  // firstName: 'Guest',
  // lastName: 'User',
  userType: 'consumer',
  didTryAutoLogin: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE: {
      return {
        ...state,
        isLoggedIn: true, 
        token: action.token,
        userId: action.userId,
        // firstName: action.firstName, 
        // lastName: action.lastName,
        userType: action.userType,
        didTryAutoLogin: true
      }
    }
    case USER_UPDATE: {
      return {
        ...state,
        isLoggedIn: true, 
        token: action.token,
        userId: action.userId,
        // firstName: action.firstName, 
        // lastName: action.lastName, 
        userType: action.userType,
        didTryAutoLogin: true
      }
    }
    case SET_DID_TRY_AL:
      return {
        ...state,
        userType: action.userType,
        didTryAutoLogin: true
      };
    case USER_LOGOUT: {
      return {
        ...initialState,
        didTryAutoLogin: true
      }
    }
    default: { return state }
  }
} 
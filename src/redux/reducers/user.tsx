import { ActionTypes } from '../actions/user';

export const InitialState = {
  userType: '',
  uid: '',
  signUpLoader: false,
  selected_user_role: '',
  async_storage_data: {
    'data': {
      store: {},
      isLoggedIn: false
    }
  },
};
export default (state = InitialState, action: any) => {
  switch (action.type) {
    case ActionTypes.USER_SIGN_UP:
      return {
        ...state,
        signUpLoader: action.payload.signupLoader,
        uid: action.payload.userUID
      };

    case ActionTypes.GET_DATA_FROM_ASYNCSTORAGE:
      const { role } = action.payload?.data?.store;
      return {
        ...state,
        async_storage_data: action.payload,
        userType: role
      };
    case ActionTypes.SET_USER_ROLE:
      return {
        ...state,
        userType: action.payload
      };

    case ActionTypes.SELECT_USER_ROLE:
      return {
        ...state,
        selected_user_role: action.payload
      };

    case ActionTypes.USER_LOGOUT:
      return {
        ...state,
        async_storage_data: action.payload,
        userType: ''
      };


    default:
      { return state };
  }
}
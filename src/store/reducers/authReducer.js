const initialState = {
  authError: null,
  isAdmin: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_USER_SUCCES':
      console.log('REGISTER_USER_SUCCES');
      return {
        ...state,
        authError: null,
      };
    case 'REGISTER_USER_ERROR':
      console.log('REGISTER_USER_ERROR', action.err);
      return {
        ...state,
        authError: action.err,
      };

    case 'LOGIN_SUCCES':
      console.log('LOGIN_SUCCES');
      return {
        ...state,
        authError: null,
      };

    case 'LOGIN_ERROR':
      console.log('LOGIN_ERROR', action.err);
      return {
        ...state,
        authError: action.err,
      };

    case 'SIGNOUT':
      return {
        ...state,
        isAdmin: false,
      };

    case 'SIGNOUT_ERROR':
      return {
        ...state,
      };

    case 'GET_CUSTOM_CLAIMS_SUCCESS':
      console.log('GET_CUSTOM_CLAIMS_SUCCESS');
      return {
        ...state,
        isAdmin: action.token.claims.admin,
      };

    case 'GET_CUSTOM_CLAIMS_ERROR':
      console.log('GET_CUSTOM_CLAIMS_ERROR', action.err.message);
      return {
        ...state,
        isAdmin: false,
      };

    default:
      return state;
  }
};

export default authReducer;

const initialState = {
  authError: null,
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
      };

    case 'SIGNOUT_ERROR':
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default authReducer;

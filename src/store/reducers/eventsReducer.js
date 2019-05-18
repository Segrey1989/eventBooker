const initState = {
  eventError: null,
};

const eventReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      console.log('ADD_EVENT success');
      return {
        ...state,
        eventError: null,
      };

    case 'ADD_EVENT_ERROR':
      console.log('ADD_EVENT error', action.err.message);
      return {
        ...state,
        eventError: action.err.message,
      };

    case 'BOOK_EVENT_SUCCES':
      console.log('BOOK_EVENT_SUCCES');
      return {
        ...state,
        eventError: null,
      };

    case 'BOOK_EVENT_ERROR':
      console.log('BOOK_EVENT_ERROR');
      return {
        ...state,
        eventError: action.err.message,
      };

    default:
      return state;
  }
};

export default eventReducer;

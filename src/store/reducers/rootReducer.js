import { combineReducers } from 'redux';
import eventReducer from './eventsReducer';
import authReducer from './authReducer';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReduser = combineReducers({
  eventsReducer: eventReducer,
  authReducer: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReduser;

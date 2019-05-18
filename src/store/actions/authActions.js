export const registerUser = (user, firebase) => {
  return dispatch => {
    const { firestore } = firebase;
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(data => {
        const { uid } = data.user;
        firestore()
          .collection('users')
          .doc(uid)
          .set({
            name: user.username,
            visitedEvents: [],
          });
      })
      .then(() => {
        dispatch({ type: 'REGISTER_USER_SUCCES' });
      })
      .catch(err => {
        dispatch({ type: 'REGISTER_USER_ERROR', err });
      });
  };
};

export const logIn = (user, firebase) => {
  return dispatch => {
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        dispatch({ type: 'LOGIN_SUCCES' });
      })
      .catch(err => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
  };
};

export const signOut = firebase => {
  return dispatch => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: 'SIGNOUT' });
      })
      .catch(err => {
        dispatch({ type: 'SIGNOUT_ERROR', err });
      });
  };
};

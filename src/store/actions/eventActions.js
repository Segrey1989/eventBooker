export const addEvent = (event, firebase) => {
  return dispatch => {
    const { firestore } = firebase;

    const {
      eventName,
      seatsNumber,
      eventDate,
      eventDescription,
      eventImageFile,
    } = event;

    const storageRef = firebase.storage().ref('eventImages/' + eventName);
    storageRef
      .put(eventImageFile)
      .then(() => {
        return storageRef.getDownloadURL();
      })
      .then(url => {
        return firestore()
          .collection('events')
          .add({
            eventName,
            seatsNumber,
            eventDate,
            eventDescription,
            createdAt: new Date(),
            registeredUsers: [],
            eventImage: url,
          });
      })
      .then(() => {
        dispatch({ type: 'ADD_EVENT', event });
      })
      .catch(err => {
        dispatch({ type: 'ADD_EVENT_ERROR', err });
      });
  };
};

export const bookEvent = (event, user, firebase) => {
  return dispatch => {
    const { firestore } = firebase;
    firestore()
      .collection('users')
      .doc(user.id)
      .update({
        visitedEvents: [...user.visitedEvents, event.id],
      })
      .then(() => {
        firestore()
          .collection('events')
          .doc(event.id)
          .update({
            registeredUsers: [...event.registeredUsers, user.id],
            seatsNumber: event.seatsNumber - 1,
          });
      })
      .then(() => {
        dispatch({ type: 'BOOK_EVENT_SUCCES' });
      })
      .catch(err => {
        dispatch({ type: 'BOOK_EVENT_ERROR', err });
      });
  };
};

export const cancelEvent = data => {
  return dispatch => {
    const { event, user, firebase } = data;
    const { firestore } = firebase;
    const visitedEvents = user.visitedEvents.filter(ev => ev !== event.id);
    const registeredUsers = event.registeredUsers.filter(us => us !== user.id);

    firestore()
      .collection('users')
      .doc(user.id)
      .update({
        ...user,
        visitedEvents,
      })
      .then(() => {
        firestore()
          .collection('events')
          .doc(event.id)
          .update({
            ...event,
            seatsNumber: event.seatsNumber + 1,
            registeredUsers,
          });
      })
      .then(() => {
        dispatch({ type: 'CANCEL_EVENT_SUCCES' });
      })
      .catch(err => {
        dispatch({ type: 'CANCEL_EVENT_ERROR', err });
      });
  };
};

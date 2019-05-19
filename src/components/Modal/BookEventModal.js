import React from 'react';
import { Image, Header, Modal, Button, Message } from 'semantic-ui-react';

const BookEventModal = props => {
  const { event, user, firebase, eventError, auth } = props.data;
  const visitedEvents = user ? user.visitedEvents : null;
  const checkMultipleBooking = visitedEvents
    ? visitedEvents.find(ev => ev === event.id)
    : null;

  return (
    <Modal trigger={<Button fluid> See Details</Button>}>
      (<Modal.Header>Book {event.eventName}</Modal.Header>)
      <Modal.Content image>
        <Image wrapped size='medium' src={event.eventImage} />
        <Modal.Description>
          <Header>{event.eventName}</Header>
          <p>{event.eventDescription}</p>
        </Modal.Description>
      </Modal.Content>
      {!checkMultipleBooking && (
        <Modal.Actions>
          <Button
            attached='bottom'
            size='big'
            onClick={e => {
              if (!checkMultipleBooking) {
                props.data.bookEvent(
                  event,
                  { ...user, id: auth.uid },
                  firebase,
                );
              }
            }}
          >
            Book
          </Button>
        </Modal.Actions>
      )}
      <Modal.Content>
        {checkMultipleBooking && (
          <Message info>
            <p>You have booked this event</p>
          </Message>
        )}

        {eventError && (
          <Message error>
            <p>{eventError}</p>
          </Message>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default BookEventModal;

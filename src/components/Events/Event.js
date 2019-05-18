import React from 'react';
import {
  Grid,
  Container,
  Image,
  Header,
  Segment,
  Modal,
  Button,
  Message,
} from 'semantic-ui-react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { bookEvent } from '../../store/actions/eventActions';
import { withFirebase } from 'react-redux-firebase';

const ModalModalExample = props => {
  const { event, user, firebase, eventError, auth } = props.data;
  const visitedEvents = user ? user.visitedEvents : null;
  const checkMultipleBooking = visitedEvents
    ? visitedEvents.find(ev => ev === event.id)
    : null;

  return (
    <Modal trigger={<Button fluid> See Details</Button>}>
      <Modal.Header>Book {event.eventName}</Modal.Header>
      <Modal.Content image>
        <Image wrapped size='medium' src={event.eventImage} />
        <Modal.Description>
          <Header>{event.eventName}</Header>
          <p>{event.eventDescription}</p>
        </Modal.Description>
      </Modal.Content>

      <Modal.Actions>
        <Button
          attached='bottom'
          size='big'
          onClick={e => {
            if (!checkMultipleBooking) {
              props.data.bookEvent(event, { ...user, id: auth.uid }, firebase);
            }
          }}
        >
          Book
        </Button>
      </Modal.Actions>
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

const Event = props => {
  const { event } = props;
  return (
    <Grid.Column>
      <Container style={{ marginBottom: '30px' }}>
        <Image src={event.eventImage} fluid style={{ maxHeight: '350px' }} />
        <Segment textAlign='center' id='eventBookTrigger'>
          <Header as='h3'>{event.eventName}</Header>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <p>Date: {event.eventDate}</p>
              </Grid.Column>
              <Grid.Column>
                <p>Places: {event.seatsNumber}</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <ModalModalExample data={props} />
        </Segment>
      </Container>
    </Grid.Column>
  );
};

const mapStateToProps = state => {
  return {
    eventError: state.eventsReducer.eventError,
    auth: state.firebase.auth,
  };
};

const dispatchStateToProps = dispatch => {
  return {
    bookEvent: (event, user, firebase) =>
      dispatch(bookEvent(event, user, firebase)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    dispatchStateToProps,
  ),
  withFirebase,
)(Event);

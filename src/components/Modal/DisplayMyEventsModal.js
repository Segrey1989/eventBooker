import React from 'react';
import { connect } from 'react-redux';

import BookEventModal from '../Modal/BookEventModal';
import CancellEventModal from '../Modal/CancellEventModal';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';

import {
  Image,
  Header,
  Modal,
  Button,
  Menu,
  Segment,
  Grid,
  Icon,
} from 'semantic-ui-react';

class DisplayMyEventsModal extends React.Component {
  createEventList = eventsArray => {
    const seeDetailsTrigger = (
      <Button icon attached='top'>
        <Icon name='eye' size='large' />
      </Button>
    );

    const cancellEventTrigger = (
      <Button icon attached='bottom'>
        <Icon name='cancel' size='large' color='red' />
      </Button>
    );
    const eventList = eventsArray
      ? eventsArray.map((ev, i) => {
          return (
            <Segment key={i}>
              <Grid>
                <Grid.Row columns={3}>
                  <Grid.Column width={5}>
                    <Image src={ev.eventImage} size='tiny' />
                  </Grid.Column>
                  <Grid.Column width={9}>
                    <Header> {ev.eventName}</Header>
                    <Header> {ev.eventDate}</Header>
                  </Grid.Column>
                  <Grid.Column width={2}>
                    <BookEventModal
                      data={{ ...this.props, event: ev }}
                      trigger={seeDetailsTrigger}
                    />
                    <CancellEventModal
                      data={{ ...this.props, event: ev }}
                      trigger={cancellEventTrigger}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          );
        })
      : null;
    return eventList;
  };

  render() {
    const { currentUserEvents } = this.props;
    const currentDate = new Date();

    const completedEvents = currentUserEvents
      ? currentUserEvents.filter(ev => new Date(ev.eventDate) < currentDate)
      : null;

    const currentEvents = currentUserEvents
      ? currentUserEvents.filter(ev => new Date(ev.eventDate) >= currentDate)
      : null;

    const completedEventsJSX = this.createEventList(completedEvents);
    const currentEventsJSX = this.createEventList(currentEvents);

    return (
      <Modal trigger={<Menu.Item> My Events</Menu.Item>}>
        <Modal.Header> My Events</Modal.Header>
        <Modal.Content>
          <Header as='h3'>
            {(currentEvents && `Current Events - (${currentEvents.length})`) ||
              'Loading current events...'}
          </Header>
          {currentEventsJSX}

          <Header as='h3'>
            {(completedEvents &&
              `Completed Events - (${completedEvents.length})`) ||
              'Loading completed events...'}
          </Header>
          {completedEventsJSX}
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  const { uid } = state.firebase.auth;
  const { users } = state.firestore.data;
  const user = users ? users[uid] : null;
  const visitedEvents = user ? user.visitedEvents : null;
  const { events } = state.firestore.data;
  const currentUserEvents =
    visitedEvents && events
      ? visitedEvents.map(ev => {
          return { ...events[ev], id: ev };
        })
      : null;

  return {
    currentUserEvents,
    user,
    auth: state.firebase.auth,
    eventError: state.eventsReducer.eventError,
  };
};

export default compose(
  connect(mapStateToProps),
  withFirebase,
)(DisplayMyEventsModal);

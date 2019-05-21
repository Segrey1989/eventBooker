import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import EventList from './EventList';
import { Grid, Container, Header } from 'semantic-ui-react';

class Dashboard extends Component {
  render() {
    const currentDate = new Date();
    const { events } = this.props;
    const upcomingEvents = events
      ? events.filter(ev => new Date(ev.eventDate) >= currentDate)
      : null;
    return (
      <Container>
        <Header as='h2' textAlign='center'>
          Upcoming Events
        </Header>
        <Grid>
          <EventList events={upcomingEvents} user={this.props.user} />
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { events } = state.firestore.ordered;
  const { users } = state.firestore.data;
  const { uid } = state.firebase.auth;
  const user = users ? users[uid] : null;
  return {
    events,
    user,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'events' }, { collection: 'users' }]),
)(Dashboard);

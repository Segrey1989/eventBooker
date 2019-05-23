import React from 'react';
import {
  Grid,
  Container,
  Image,
  Header,
  Segment,
  Button,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { bookEvent } from '../../store/actions/eventActions';
import { withFirebase } from 'react-redux-firebase';
import BookEventModal from '../Modal/BookEventModal';

const Event = props => {
  const { event } = props;
  const trigger = <Button fluid> See Details</Button>;

  return (
    <Grid.Column>
      <Container style={{ marginBottom: '30px' }}>
        <Image src={event.eventImage} fluid style={{ maxHeight: '350px' }} />
        <Segment textAlign='center'>
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
          {!props.auth.isEmpty && (
            <BookEventModal data={props} trigger={trigger} />
          )}
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

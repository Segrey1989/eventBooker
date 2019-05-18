import React from 'react';
import Event from './Event';
import { Grid } from 'semantic-ui-react';

const EventList = props => {
  const { events, user } = props;

  const eventList = events
    ? events.map((event, i = 1) => {
        return <Event event={event} user={user} key={i} />;
      })
    : null;

  return <Grid.Row columns={3}>{eventList}</Grid.Row>;
};

export default EventList;

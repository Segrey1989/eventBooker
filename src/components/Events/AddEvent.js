import React, { Component } from 'react';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { addEvent } from '../../store/actions/eventActions';

class AddEvent extends Component {
  state = {
    eventName: '',
    seatsNumber: '',
    eventDate: '',
    eventDescription: '',
    validationErrors: [],
    eventImageFile: null,
  };

  handleInputChange = (e, { name }) => {
    this.setState({ [name]: e.target.value, validationErrors: [] });
  };

  handleInputChoseFile = e => {
    if (e.target.files) {
      const file = e.target.files[0];
      this.setState({ eventImageFile: file });
    }
    this.setState({ validationErrors: [] });
  };

  generateErrorMessage = (message, validationErrors) => {
    const error = {
      message: message,
    };
    return [...validationErrors, error];
  };

  validateForm = () => {
    const {
      eventName,
      seatsNumber,
      eventDate,
      eventDescription,
      eventImageFile,
    } = this.state;

    const checkImageExtencion = /\.(jpeg|jpg|gif|png)$/;
    let validationErrors = [];

    if (!eventName || !seatsNumber || !eventDate || !eventDescription) {
      validationErrors = this.generateErrorMessage(
        'All form fields should be filled in',
        validationErrors,
      );
    }

    if (typeof +seatsNumber !== 'number' || seatsNumber < 0) {
      validationErrors = this.generateErrorMessage(
        'Seats number should be a number greater then 0',
        validationErrors,
      );
    }

    if (!eventImageFile) {
      validationErrors = this.generateErrorMessage(
        'Upload event image file',
        validationErrors,
      );
    } else if (!checkImageExtencion.test(eventImageFile.name)) {
      validationErrors = this.generateErrorMessage(
        'Image extencion should be jpeg|jpg|gif|png',
        validationErrors,
      );
    }
    this.setState({ validationErrors });
    return validationErrors.length > 0 ? false : true;
  };

  displayErrors = validationErrors => {
    return validationErrors.map((error, i) => (
      <p key={i} color='red'>
        {i + 1}. {error.message}
      </p>
    ));
  };

  handleSubmitForm = e => {
    e.preventDefault();
    const { firebase } = this.props;
    if (this.validateForm()) {
      this.props.addEvent(this.state, firebase);
    }
  };

  render() {
    const {
      eventName,
      seatsNumber,
      eventDate,
      eventDescription,
      validationErrors,
    } = this.state;
    if (!this.props.isAdmin) {
      this.props.history.push('/');
    }
    return (
      <Grid
        textAlign='center'
        verticalAlign='middle'
        className='registrationForm'
      >
        <Grid.Column width={10}>
          <Form onSubmit={this.handleSubmitForm} id='addEventForm'>
            <Segment>
              <Header as='h2'>Add event</Header>
              <Form.Input
                type='text'
                name='eventName'
                value={eventName}
                placeholder='event name'
                onChange={this.handleInputChange}
              />
              <Form.Input
                type='text'
                name='seatsNumber'
                value={seatsNumber}
                placeholder='avaliable seats number'
                onChange={this.handleInputChange}
              />

              <Form.TextArea
                name='eventDescription'
                value={eventDescription}
                placeholder='description'
                onChange={this.handleInputChange}
              />

              <Form.Input
                type='date'
                name='eventDate'
                value={eventDate}
                label='Date of event'
                onChange={this.handleInputChange}
              />

              <Form.Input
                type='file'
                name='eventImage'
                label='Event image'
                placeholder='event image'
                onChange={this.handleInputChoseFile}
              />

              <Button>Add Event</Button>
              {validationErrors.length > 0 && (
                <Message>{this.displayErrors(validationErrors)}</Message>
              )}
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAdmin: state.authReducer.isAdmin,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addEvent: (eventData, firebase) => dispatch(addEvent(eventData, firebase)),
  };
};
export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(AddEvent);

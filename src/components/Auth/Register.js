import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirebase } from 'react-redux-firebase';
import { registerUser } from '../../store/actions/authActions';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    validationErrors: [],
  };

  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  generateErrorMessage = (message, validationErrors) => {
    const error = {
      message: message,
    };
    return [...validationErrors, error];
  };

  validateForm = () => {
    const { username, email, password, passwordConfirmation } = this.state;
    let validationErrors = [];

    if (!username || !email || !password || !passwordConfirmation) {
      validationErrors = this.generateErrorMessage(
        'All form fields should be filled in',
        validationErrors,
      );
    }
    if (!password || password.length < 6) {
      validationErrors = this.generateErrorMessage(
        'Password length should be greater then 6 symbols',
        validationErrors,
      );
    } else if (password !== passwordConfirmation) {
      validationErrors = this.generateErrorMessage(
        "Password and password confirmation don't much",
        validationErrors,
      );
    }

    this.setState({ validationErrors });
    return validationErrors.length > 0 ? false : true;
  };

  handleSubmitForm = e => {
    const { firebase } = this.props;
    e.preventDefault();
    if (this.validateForm()) {
      this.props.registerUser(this.state, firebase);
      this.props.history.push('/');
    }
  };

  displayErrors = validationErrors => {
    return validationErrors.map((error, i) => (
      <p key={i}>
        {i + 1}. {error.message}
      </p>
    ));
  };

  render() {
    const { validationErrors } = this.state;
    const { authError, auth } = this.props;
    if (!auth.isEmpty) return <Redirect to='/' />;
    return (
      <Grid
        textAlign='center'
        verticalAlign='middle'
        className='registrationForm'
      >
        <Grid.Column color='pink' width={10}>
          <Form onSubmit={this.handleSubmitForm}>
            <Header as='h2'>Register</Header>
            <Segment>
              <Form.Input
                type='text'
                name='username'
                placeholder='username'
                icon='user'
                iconPosition='left'
                onChange={this.handleChangeInput}
              />
              <Form.Input
                type='email'
                name='email'
                placeholder='email'
                icon='mail'
                iconPosition='left'
                onChange={this.handleChangeInput}
              />
              <Form.Input
                type='password'
                name='password'
                placeholder='password'
                icon='lock'
                iconPosition='left'
                onChange={this.handleChangeInput}
              />
              <Form.Input
                type='password'
                name='passwordConfirmation'
                placeholder='confirm password'
                icon='repeat'
                iconPosition='left'
                onChange={this.handleChangeInput}
              />
              <Button animated>
                <Button.Content visible> Register</Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right' />
                </Button.Content>
              </Button>
            </Segment>
          </Form>
          <Message>
            Already a user? <Link to='/login'>Login</Link>
          </Message>
          {validationErrors.length > 0 && (
            <Message warning>{this.displayErrors(validationErrors)}</Message>
          )}
          {authError && (
            <Message negative>
              <p>{authError.message}</p>
            </Message>
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.authReducer.authError,
    auth: state.firebase.auth,
  };
};

const dispatchStateToProps = dispatch => {
  return {
    registerUser: (user, firebase) => dispatch(registerUser(user, firebase)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    dispatchStateToProps,
  ),
  withFirebase,
)(Register);

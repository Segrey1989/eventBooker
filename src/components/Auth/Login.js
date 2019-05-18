import React, { Component } from 'react';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from 'semantic-ui-react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirebase } from 'react-redux-firebase';
import { logIn } from '../../store/actions/authActions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    validationError: null,
  };

  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value, validationError: null });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { firebase } = this.props;
    if (this.state.email && this.state.password) {
      this.props.logIn(this.state, firebase);
    } else {
      const error = { message: 'All fields should be filled in' };
      this.setState({ validationError: error });
    }
  };
  render() {
    const { validationError } = this.state;
    const { authError } = this.props;

    return (
      <Grid
        textAlign='center'
        verticalAlign='middle'
        className='registrationForm'
      >
        <Grid.Column color='pink' width={10}>
          <Form onSubmit={this.handleSubmit}>
            <Header as='h2'>Login</Header>
            <Segment>
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

              <Button animated>
                <Button.Content visible> Register</Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right' />
                </Button.Content>
              </Button>
            </Segment>
          </Form>
          {validationError && (
            <Message warning>{validationError.message}</Message>
          )}
          {authError && <Message negative>{authError.message}</Message>}
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.authReducer.authError,
  };
};

const dispatchStateToProps = dispatch => {
  return {
    logIn: (user, firebase) => dispatch(logIn(user, firebase)),
  };
};
export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    dispatchStateToProps,
  ),
)(Login);
